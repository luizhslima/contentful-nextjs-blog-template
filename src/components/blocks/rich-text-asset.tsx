import Image from "next/image";

export default function RichTextAsset({ id, assets }: any) {
  const asset = assets?.find((asset: any) => asset.sys.id === id);

  if (asset?.url) {
    return (
        <div className="relative h-[300px] lg:h-[500px]">
            <Image src={asset.url} fill alt={asset.description} />
        </div>
    )
  }

  return null;
}
