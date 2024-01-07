export async function middleware(request: NextRequest) {
  const authorized = await isAuthorized(request);
  if (!authorized) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|static|public|favicon.ico)[^.]*)",
};
