import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

console.log(
"SUPABASE URL:",
process.env.NEXT_PUBLIC_SUPABASE_URL
)


export async function middleware(request:NextRequest){


let response = NextResponse.next({
request
})


const supabase = createServerClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

{

cookies:{

getAll(){

return request.cookies.getAll()

},


setAll(cookiesToSet){

cookiesToSet.forEach(({name,value})=>{

request.cookies.set(
name,
value
)

})


response = NextResponse.next({
request
})


cookiesToSet.forEach(({name,value,options})=>{

response.cookies.set(
name,
value,
options
)

})

}

}

}

)


const {
  data,
  error
}=await supabase.auth.getSession()


console.log(
"SESSION:",
data.session
)

console.log(
"SESSION ERROR:",
error
)


const user=data.session?.user


console.log(
"Middleware User:",
user?.email
)

// const {
//   data,
//   error
// }=await supabase.auth.getUser()


// console.log(
// "Middleware session:",
// data.user,
// error
// )


// const user = data.user


// console.log(
// "Middleware User:",
// user?.email
// )



if(

request.nextUrl.pathname.startsWith("/admin")

&&

request.nextUrl.pathname !== "/admin/login"

&&

!user

){

return NextResponse.redirect(

new URL(
"/admin/login",
request.url
)

)

}


return response


}



export const config={

matcher:[
"/admin/:path*"
]

}