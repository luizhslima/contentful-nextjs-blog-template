import { DocumentNode } from "graphql";
import queryHomeBlogPost from "@/graphql/queryHomeBlogPost.graphql";
import queryPostBySlug from "@/graphql/queryPostBySlug.graphql";
import queryAllPostWithSlug from "@/graphql/queryAllPostWithSlug.graphql";
import queryMorePosts from "@/graphql/queryMorePosts.graphql";
import queryGetPostWithPagination from "@/graphql/queryGetPostWithPagination.graphql";
import { PostOrder } from "@/types/enums";

type FetchApiParams = {
  variables?: any;
};

async function fetchGraphQL(
  doc: DocumentNode,
  { variables }: FetchApiParams = {}
) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          variables?.preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({
        query: doc.loc?.source.body,
        variables,
      }),
    }
  ).then((response) => response.json());
}

function extractPostEntries(fetchResponse: any) {
  return fetchResponse?.data?.postCollection?.items;
}

function extractProjetosEntries(fetchResponse: any) {
  return fetchResponse?.data?.projetoCollection?.items;
}

function extractCategoriasEntries(fetchResponse: any) {
  return fetchResponse?.data?.categoriaCollection.items;
}

function extractPost(fetchResponse:any) {
  return fetchResponse?.data?.postCollection?.items?.[0]
}

export async function getAllPostsForHome(preview = false) {
  const entries = await fetchGraphQL(queryHomeBlogPost, {
    variables: { preview },
  });
  return [
    extractPostEntries(entries),
    extractProjetosEntries(entries),
    extractCategoriasEntries(entries),
  ];
}

export async function getPostAndMorePosts(slug: string, preview = false) {
  const entry = await fetchGraphQL(queryPostBySlug, {
    variables: { slug, preview },
  });
  
  const entries = await fetchGraphQL(queryMorePosts, {
    variables: { slug, preview }
  });

  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries)
  }
}

export async function getAllPostWithSlug() {
  const entries = await fetchGraphQL(queryAllPostWithSlug);
  return extractPostEntries(entries);
}

export async function getPostsWithPagination(page: number, size: number, order: PostOrder, preview = false){
  return fetchGraphQL(queryGetPostWithPagination,{
    variables: {page, size, order, preview}
  });
}