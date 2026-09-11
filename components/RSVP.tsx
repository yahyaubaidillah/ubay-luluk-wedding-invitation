"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"


export default function RSVP(){

const [honeypot,setHoneypot]=useState("")


const [form,setForm] = useState({

    name:"",
    attendance:"Hadir",
    guests:1,
    message:""

})


const [loading,setLoading] = useState(false)



async function submitRSVP(){


    if(loading)
    return

    if(!form.name){

        alert("Nama wajib diisi")
        return

    }

    if(form.name.trim().length < 3){

    alert(
    "Nama minimal 3 karakter"
    )

    return

    }


    if(form.name.length > 50){

    alert(
    "Nama terlalu panjang"
    )

    return

    }


    if(form.message.length > 300){

    alert(
    "Ucapan maksimal 300 karakter"
    )

    return

    }


    setLoading(true)



    // cek session user
    // const session = await supabase.auth.getSession()

    // console.log(
    //     "CURRENT SESSION:",
    //     session.data.session
    // )

    if(honeypot){

    return

    }

    // insert RSVP

    
    const result = await supabase
    .from("rsvps")
    .insert({

        name:form.name,
        attendance:form.attendance,
        guests:form.guests,
        message:form.message

    })
    .select()



    console.log(
        "INSERT RESULT:",
        result
    )



    setLoading(false)



    if(result.error){


        console.log(
            "SUPABASE INSERT ERROR:",
            result.error
        )


        alert(result.error.message)

        return

    }



    alert(
        "Terima kasih, RSVP berhasil dikirim"
    )



    setForm({

        name:"",
        attendance:"Hadir",
        guests:1,
        message:""

    })



}



return(


<section

id="rsvp"

className="
min-h-screen
py-32
bg-[#faf8f5]
"

>


<div

className="
max-w-xl
mx-auto
px-6
"

>


<h2

className="
text-center
font-serif
text-5xl
"

>

RSVP

</h2>




<div

className="
mt-10
space-y-5
"

>



<input

className="
w-full
border
rounded-xl
p-4
"

placeholder="Nama"

value={form.name}

onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}

/>




<select

className="
w-full
border
rounded-xl
p-4
"

value={form.attendance}

onChange={(e)=>

setForm({

...form,

attendance:e.target.value

})

}

>


<option value="Hadir">

Hadir

</option>


<option value="Tidak Hadir">

Tidak Hadir

</option>


</select>





<input

type="number"

min="1"

className="
w-full
border
rounded-xl
p-4
"

value={form.guests}

onChange={(e)=>

setForm({

...form,

guests:Number(e.target.value)

})

}

/>





<textarea

className="
w-full
border
rounded-xl
p-4
"

placeholder="Ucapan"

value={form.message}

onChange={(e)=>

setForm({

...form,

message:e.target.value

})

}

/>





<button

onClick={submitRSVP}

disabled={loading}

className="
w-full
bg-black
text-white
rounded-full
py-4
disabled:opacity-50
"

>

{

loading

?

"Mengirim..."

:

"Kirim RSVP"

}


</button>




</div>


</div>


</section>


)

}