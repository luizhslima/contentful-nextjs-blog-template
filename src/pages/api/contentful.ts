import { getPostsWithPagination } from "@/lib/api";
import { PostOrder } from "@/types/enums";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("_page");
  const size = searchParams.get("_size");
  const order = searchParams.get("_order");
  const response = await getPostsWithPagination(
    Number(page),
    Number(size),
    PostOrder[order as keyof typeof PostOrder]
  );
  return NextResponse.json(response);
}
