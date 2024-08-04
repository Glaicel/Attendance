// app/_middleware.ts or pages/_middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import supabase from './supabase';

export async function middleware(req: NextRequest) {
  // Get the session from Supabase
  const { data: { session }, error } = await supabase.auth.getSession();

  // Check if there's an error retrieving the session
  if (error) {
    console.error('Error getting session:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const { pathname } = req.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/', '/protected-route'];

  if (!session && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}
