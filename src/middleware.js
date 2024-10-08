import { NextResponse } from 'next/server';

// Middleware function to check authentication
export function middleware(request) {
    // Example: Check for an authentication cookie or token
    debugger;

    console.log('Middleware is running for:', request.url);
    const token = request.cookies.get('authToken');

    if (!token) {
        // Redirect to the login page if the token is missing
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Continue with the original request if authenticated
    return NextResponse.next();
}

// Specify the route paths where middleware should run
export const config = {
    matcher: ['/admin'], // Apply middleware to the /admin route
};
