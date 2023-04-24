import MorePosts from "@/components/blocks/more-posts";
import { PostOrder } from "@/types/enums";
import { Alert, Box, Button, CircularProgress, Grid, useTheme } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";

const PAGE_SIZE = 10;

const fetchPosts = (page = 0) =>
  fetch(
    `/api/contentful?_page=${page}&_size=${PAGE_SIZE}&_order=${PostOrder.sys_publishedAt_DESC}`
  ).then((res) => res.json());

export default function Posts() {
  const theme = useTheme();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${index}`,
    fetchPosts,
    { initialSize: 1 }
  );

  const postsCollection = data ? data.flat()?.[0].data?.postCollection : [];
  
  const loadMore = () => {
    setIsLoadingMore(true);
    setSize(size + 1);
  };

  if (!data) return (
    <Box
        sx={{
          [theme.breakpoints.between("xs", "sm")]: {
            paddingX: 1,
          },
          width: {
            xs: "100%",
            md: "820px",
            lg: "920px",
          },
          margin: "0 auto",
        }}
      >
        <CircularProgress />
      </Box>
  );

  return (
    <>
      <Head>
        <title>Luiz Henrique - Outros artigos</title>
      </Head>
      <Box
        sx={{
          [theme.breakpoints.between("xs", "sm")]: {
            paddingX: 1,
          },
          width: {
            xs: "100%",
            md: "820px",
            lg: "920px",
          },
          margin: "0 auto",
        }}
      >
        <Grid container direction="row" alignItems={"center"}>
          <Grid item xs={12}>
            <MorePosts posts={postsCollection?.items} title="Ultimos artigos" />
          </Grid>
          <Grid item xs={12}>
            {isLoadingMore ? (
              <p>loading...</p>
            ) : (
              <div className="flex items-center justify-center py-3">
                <Button
                  onClick={loadMore}
                  className={`${
                    postsCollection?.total > 10 ? "block" : "hidden"
                  }`}
                >
                  carregar mais
                </Button>
              </div>
            )}
            {error && (
              <Alert variant="filled" severity="error">
                Falhou ao carregar mais artigos.
              </Alert>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
