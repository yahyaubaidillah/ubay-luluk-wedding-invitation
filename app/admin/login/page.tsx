"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"



export default function LoginPage(){

const router = useRouter()

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [loading,setLoading]=useState(false)


async function handleLogin(){

setLoading(true)

console.log("LOGIN CLICK")


const {data,error}=await supabase.auth.signInWithPassword({

email,
password

})

console.log(data)
console.log(error)
console.log("SESSION:", data.session)

setLoading(false) 


if(error){

alert(error.message)

return

}

// console.log("REDIRECT")

// window.location.href="/admin"
console.log("LOGIN SUCCESS")


router.replace("/admin")

router.refresh()

}



return(

<section

className="
min-h-screen
flex
items-center
justify-center
bg-[#faf8f5]
"

>


<div

className="
bg-white
rounded-3xl
shadow-xl
p-10
w-full
max-w-md
"

>


<h1

className="
font-serif
text-4xl
text-center
mb-8
"

>

Admin Login

</h1>



<input

className="
border
rounded-xl
w-full
p-3
mb-4
"

placeholder="Email"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

/>



<input

type="password"

className="
border
rounded-xl
w-full
p-3
mb-6
"

placeholder="Password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

/>



<button

onClick={handleLogin}

className="
bg-black
text-white
rounded-full
w-full
py-3
"

>

{

loading
?
"Loading..."
:
"Login"

}


</button>




</div>


</section>


)

}