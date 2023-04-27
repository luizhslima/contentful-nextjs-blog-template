import AbsoluteFooter from "@/components/layout/AbsoluteFooter";
import SocialMedia from "@/components/menu/SocialMedia";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import path from "path";
import matter from "gray-matter";
import fs from "fs";
import dynamic from "next/dynamic";

const components = {
  Button: dynamic(() => import("@mui/material/Button")),
  h2: (props: any) => (
    <div className="py-5">
      <Typography variant="h2" {...props}></Typography>
      <Divider />
    </div>
  ),
  p: (props: any) => (
    <div className="py-1">
      <Typography variant="body1" {...props}></Typography>
    </div>
  ),
};

export default function Eu({ source, frontMatter }: any) {
  return (
    <>
      <Box className="content-center">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">{frontMatter.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <MDXRemote {...source} components={components} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

//example https://github.com/vercel/next.js/blob/canary/examples/with-mdx-remote/pages/posts/%5Bslug%5D.js
export async function getStaticProps() {
  const POSTS_PATH = path.join(process.cwd(), "markdown");
  const markdown = path.join(POSTS_PATH, "sobre.md");
  const source = fs.readFileSync(markdown);
  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}
