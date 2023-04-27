import MorePosts from "@/components/blocks/more-posts";
import PostBody from "@/components/blocks/post-body";
import PostHeader from "@/components/blocks/post-header";
import ShareSocial from "@/components/social/RssUsage";
import { getAllPostWithSlug, getPostAndMorePosts } from "@/lib/api";
import { ArrowUpward } from "@mui/icons-material";
import { Alert, Divider, Fab, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";

export default function Post({ post, morePosts, preview }: any) {
  const router = useRouter();
  const [currentUrl, setCurrentURl] = useState("");

  const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
  };

  useEffect(() => {
    setCurrentURl(`${location.origin}/blog/post/${post.slug}`);
  });

  if (!router.isFallback && !post) {
    return (
      <>
        <Typography>Oops... não foi possivel encontrar esse artigo</Typography>
      </>
    );
  }

  return (
    <>
      {router.isFallback ? (
        <div>...loading</div>
      ) : (
        <>
          <Head>
            <title>{`${post.title} | Luiz - Blog`}</title>
            <meta property="og:image" content={post.featureImage.url} />
          </Head>
          <Grid
            container
            justifyContent={"center"}
            sx={{
              paddingX: {
                xs: 1,
              },
              position: "relative",
            }}
          >
            <Grid item xs={12}>
              {preview ? (
                <div className="content-center">
                  <Alert>
                    This is page is a preview.{" "}
                    <Link
                      href="/api/exit-preview"
                      className="underline hover:text-cyan duration-200 transition-colors"
                    >
                      Click here
                    </Link>{" "}
                    to exit preview mode.
                  </Alert>
                </div>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12}>
              <div className="content-center">
                <PostHeader
                  title={post.title}
                  coverImage={post.featureImage}
                  date={post.sys.publishedAt}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <PostBody content={post.content} />
            </Grid>
            <Grid item xs={12}>
              <div className="content-center">
                <ShareSocial
                  socialTypes={[
                    "facebook",
                    "twitter",
                    "reddit",
                    "linkedin",
                    "whatsapp",
                    "telegram",
                    "workspace",
                  ]}
                  title="Compartilhe nas suas redes sociais."
                  url={currentUrl}
                />
              </div>
            </Grid>
            <Divider />
            <Grid item xs={12}>
              {morePosts && morePosts.length > 0 && (
                <MorePosts posts={morePosts} />
              )}
            </Grid>
            <Fab
              sx={fabStyle}
              className="hidden lg:hidden"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
              }}
            >
              <ArrowUpward />
            </Fab>
          </Grid>
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
  const data = await getPostAndMorePosts(params.slug, preview);

  return {
    props: {
      preview,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostWithSlug();
  return {
    paths: allPosts?.map(({ slug }: any) => `/blog/post/${slug}`) ?? [],
    fallback: true,
  };
}
