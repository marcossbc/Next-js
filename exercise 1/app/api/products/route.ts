import { NextRequest, NextResponse } from "next/server";

const products = [
  { id: 1, name: "laptop" },
  { id: 2, name: "mobile" },
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = products.find(
    (p) => p.id === Number(params.id)
  );

  return NextResponse.json(product);
}

export async function POST(request: NextRequest) {
  const { name , price } = await request.json();
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(newProduct
  );
   return NextResponse.json({
    message: "Product added successfully",
    data: newProduct,
  });
}