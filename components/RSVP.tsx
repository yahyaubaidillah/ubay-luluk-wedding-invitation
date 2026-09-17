"use client"

import {
  useState,
  useEffect
} from "react"

import {
  supabase
} from "@/lib/supabase"

import Toast from "./Toast"



interface RSVPProps {

  guestId:string

}



interface GuestInfo {

  attendance:string | null

  guests:number | null

  message:string | null


  guest?: {

    name:string

  }[]

}





export default function RSVP({

guestId

}:RSVPProps){



const [loading,setLoading]=useState(false)


const [alreadyRSVP,setAlreadyRSVP]=useState(false)



const [guestInfo,setGuestInfo]=useState<GuestInfo | null>(null)



const [showToast,setShowToast]=useState(false)



const [form,setForm]=useState({

attendance:"Hadir",

guests:1,

message:""

})



const [honeypot,setHoneypot]=useState("")







function showSuccessToast(){


setShowToast(true)


setTimeout(()=>{

setShowToast(false)

},3000)


}








async function checkExistingRSVP(){



const {

data,

error

}=await supabase


.from("rsvps")


.select(`

attendance,

guests,

message,

guest:guests(

name

)

`)


.eq(

"guest_id",

guestId

)


.maybeSingle()





console.log(

"CHECK RSVP:",

data

)





if(error){

console.log(error)

return

}




if(data){


setAlreadyRSVP(true)


setGuestInfo(data as GuestInfo)


}



}







useEffect(()=>{



const init=async()=>{

await checkExistingRSVP()

}



init()



},[guestId])









async function submitRSVP(){



if(loading)

return





if(honeypot)

return





if(form.message.length > 300){


showSuccessToast()


return

}







const {

data:existing

}=await supabase


.from("rsvps")


.select("id")


.eq(

"guest_id",

guestId

)


.maybeSingle()







if(existing){


setAlreadyRSVP(true)


showSuccessToast()


return

}







setLoading(true)







const {

error

}=await supabase


.from("rsvps")


.insert({


guest_id:guestId,


attendance:form.attendance,


guests:form.guests,


message:form.message


})









setLoading(false)







if(error){


console.log(error)


return

}







showSuccessToast()


setAlreadyRSVP(true)



await checkExistingRSVP()



}









return(


<>


<Toast

show={showToast}

title="Terima Kasih"

message="Konfirmasi kehadiran berhasil dikirim."

/>








<section

id="rsvp"

className="
min-h-screen
py-32
bg-[#f8f5ef]
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









{

!alreadyRSVP && (



<div

className="
mt-10
space-y-5
"

>





<input

className="hidden"

value={honeypot}

onChange={(e)=>

setHoneypot(

e.target.value

)

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

guests:Number(

e.target.value

)

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



)

}









{

alreadyRSVP && (





<div

className="
mt-10
bg-[#fffdf8]
border
border-[#d8c8ad]
rounded-2xl
shadow-lg
p-8
text-center
"

>





<div

className="
text-5xl
"

>

✓

</div>







<h3

className="
font-serif
text-3xl
mt-4
"

>

Konfirmasi Berhasil

</h3>








<p

className="
mt-5
text-gray-500
"

>

{

guestInfo?.guest?.[0]?.name

||

"Tamu Undangan"

}

</p>









<p

className="
mt-6
text-gray-600
"

>

Status

<br/>

<b>

{

guestInfo?.attendance

}

</b>

</p>









<p

className="
mt-4
text-gray-600
"

>

Jumlah Tamu

<br/>

<b>

{

guestInfo?.guests

}

Orang

</b>

</p>









<p

className="
mt-6
italic
text-gray-500
"

>

Terima kasih telah memberikan konfirmasi kehadiran.

</p>







</div>





)

}







</div>






</section>





</>


)


}