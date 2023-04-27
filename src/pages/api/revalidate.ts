import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let inboundRevalToken = req.headers["x-vercel-reval-key"];
  if (!inboundRevalToken) {
    return res
      .status(401)
      .json({ message: "x-vercel-reval-key header not defined" });
  } else if (inboundRevalToken !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    let postSlug = req.body.fields.slug["pt-BR"];
    console.log(postSlug);
    await res.revalidate(`/blog/post/${postSlug}`);
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}