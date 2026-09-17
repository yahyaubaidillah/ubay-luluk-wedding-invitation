import { createServerClient } from "@supabase/ssr"

import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"



export async function proxy(
request:NextRequest
){


let response =
NextResponse.next({
request
})



const supabase =
createServerClient(

process.env.NEXT_PUBLIC_SUPABASE_URL!,

process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,

{

cookies:{

getAll(){

return request.cookies.getAll()

},


setAll(cookies){

cookies.forEach(
({
name,
value
})=>{

request.cookies.set(
name,
value
)

}
)



response =
NextResponse.next({
request
})



cookies.forEach(
({
name,
value,
options
})=>{


response.cookies.set(
name,
value,
options
)


}

)


}


}


}

)




const {
data:{
user
}

}=await supabase.auth.getUser()



// console.log(
// "PROXY USER:",
// user?.email
// )





const pathname =
request.nextUrl.pathname





if(

pathname.startsWith("/admin")

&&

pathname !== "/admin/login"

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