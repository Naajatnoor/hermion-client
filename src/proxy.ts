import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {
   const session = await auth.api.getSession({
    headers: await headers()
   })

   const user = session?.user
   if(!user) {
     return NextResponse.redirect(new URL('/log-in', request.url))
   }
}



export const config = {
  matcher: ['/createEvent', '/join-event', '/event-details/:path','/manage-event'],
}