import { NextRequest, NextResponse } from "next/server";

interface ProductProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: ProductProps
) {
  const { id } = await params;

  return NextResponse.json({
    message: "products fetching successfully",
    data: {
      id,
      name: `product ${id}`,
      price: `${id}000`,
    },
  });
}