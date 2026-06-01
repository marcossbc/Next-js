import { NextResponse } from "next/server";

interface RouteProps {
  params: {
    username: string;
  };
}

export async function GET(
  request: Request,
  { params }: RouteProps
) {
  return NextResponse.json({
    username: params.username,
  });
}