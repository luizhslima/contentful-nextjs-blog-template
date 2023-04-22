import Image from "next/image";

const ContentfulLoader = ({ src, width, quality }: any) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ContentFulImage = (props: any) => {
  return <Image loader={ContentfulLoader} {...props} />;
};


export default ContentFulImage;