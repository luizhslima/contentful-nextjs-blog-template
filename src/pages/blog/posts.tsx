import { Box, Grid, useTheme } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { PostOrder } from "@/types/enums";

interface QueryPostProperties{
    page: number;
    order: PostOrder
}

export default function Posts() {
  const theme = useTheme();
  const [queryPostProps, setQueryPostProps] = useState<QueryPostProperties>({
    order: PostOrder.sys_publishedAt_DESC,
    page:0
  });

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
          <Grid item xs={12} md={6} lg={6}>
            
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
