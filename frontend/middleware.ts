// import { NextResponse } from 'next/server';
// import { getSession } from './lib/auth';

// interface Session {
//   user: {
//     role: string;
//     // add other user properties if needed
//   };
//   // add other session properties if needed
// }

// export async function middleware(req: any) {
//   const session: Session | null = await getSession(req);

//   const { pathname } = req.nextUrl;

//   // Public routes
//   if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
//     return NextResponse.next();
//   }

//   // Protected routes
//   if (!session) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // Role-based access control
//   const userRole = session?.user?.role;

//   if (pathname.startsWith('/seekers') && userRole !== 'seeker') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

//   if (pathname.startsWith('/recruiters') && userRole !== 'recruiter') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

//   if (pathname.startsWith('/admins') && userRole !== 'admin') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

//   if (pathname.startsWith('/techs') && userRole !== 'tech') {
//     return NextResponse.redirect(new URL('/unauthorized', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/seekers/:path*', '/recruiters/:path*', '/admins/:path*', '/techs/:path*'],
// };

export function middleware() {
  // No-op for development
  return;
}