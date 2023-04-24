import { Typography } from "@mui/material";
import PostPreview from "./post-preview";

export default function MorePosts({
  posts,
  title = "Mais artigos",
}: {
  posts: any[];
  title?: string;
}) {
  return (
    <section className="content-center mt-4">
      <Typography variant="h2">{title}</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.featureImage.url}
            date={post.sys.publishedAt}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  );
}
