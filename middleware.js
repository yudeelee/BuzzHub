import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.clone();

  // перевіряємо сесію
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const authPages = ["/auth/signin", "/auth/signup"];
  const protectedPages = ["/dashboard", "/profile"];

  // закрити логін/реєстрацію для залогінених
  if (authPages.some((path) => url.pathname.startsWith(path)) && token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // захистити сторінки для незалогінених
  if (protectedPages.some((path) => url.pathname.startsWith(path)) && !token) {
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/signin",
    "/auth/signup",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};
