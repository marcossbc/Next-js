import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    { id: 1, name: "laptop" },
    { id: 2, name: "mobile" },
  ];

  return NextResponse.json(products);
}