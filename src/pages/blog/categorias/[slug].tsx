import MorePosts from "@/components/blocks/more-posts";
import PostPreview from "@/components/blocks/post-preview";
import { getAllCategories, getPostsByCategoriaSlug } from "@/lib/api";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Categorias({ slug, posts, preview }: any) {
  const router = useRouter();
  if (!router.isFallback && !posts) {
    return (
      <>
        <Typography variant="h2">
          Oops... não foi possivel encontrar esse artigo
        </Typography>
      </>
    );
  }
  return (
    <>
      {router.isFallback ? (
        <CircularProgress />
      ) : (
        <>
          <Head>
            <title>{`Posts por categoria ${slug} | Luiz - Blog`}</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <Box>
            <Grid container>
              <Grid item xs={12}>
                <MorePosts
                  posts={posts}
                  title={`Ultimos artigos por categoria - "${slug}"`}
                />
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
}

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: any;
  preview: boolean;
}) {
  const { slug } = params;
  const posts = await getPostsByCategoriaSlug(slug, preview);
  return {
    props: {
      slug,
      preview,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const allCategories = await getAllCategories();

  return {
    paths:
      allCategories?.map(({ slug }: any) => `/blog/categorias/${slug}`) ?? [],
    fallback: true,
  };
}
