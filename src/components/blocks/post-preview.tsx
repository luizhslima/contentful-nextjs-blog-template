import Link from "next/link";
import CoverImage from "./cover-image";
import DateComponent from "./date";

interface PostPreviewProps {
  title: string;
  coverImage: string;
  date?: string;
  excerpt?: string;
  author?: string;
  slug?: string;
}

export default function PostPreview(props: PostPreviewProps) {
  return (
    <div className="mt-10">
      <div className="mb-5">
        <CoverImage
          title={props.title}
          slug={props.slug}
          url={props.coverImage}
          miniatura={true}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/blog/post/${props.slug}`} className="hover:underline">
          {props.title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateComponent dateString={props.date} />
      </div>
    </div>
  );
}
