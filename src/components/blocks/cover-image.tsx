import Link from "next/link";
import ContentFulImage from "./contentful-image";
import cn from "classnames";

type CoverImage = {
  title: string;
  url: string;
  slug?: string;
  miniatura?: boolean;
};

export default function CoverImage({
  title,
  url,
  slug,
  miniatura,
}: CoverImage) {
  const image = (
    <ContentFulImage
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
      src={url}
      fill
      priority
      sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
    />
  );

  return (
    <div
      className={`sm:mx-0 relative h-[300px] lg:h-[500px] ${
        miniatura ? "img-miniatura" : ""
      }`}
    >
      {slug ? (
        <Link href={`/blog/post/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
