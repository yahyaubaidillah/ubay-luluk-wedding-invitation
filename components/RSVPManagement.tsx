"use client"

import {
useEffect,
useState
} from "react"

import * as XLSX from "xlsx"

import {
supabase
} from "@/lib/supabase"

import Toast from "./Toast"



interface GuestData{

name:string
slug:string

}



interface RSVP{

id:string

attendance:string

guests:number

message:string | null

created_at:string

guest?:GuestData | GuestData[] | null

}




export default function RSVPManagement(){


const [rsvps,setRsvps]=useState<RSVP[]>([])

const [loading,setLoading]=useState(true)

const [search,setSearch]=useState("")

const [filter,setFilter]=useState("Semua")


const [selectedRSVP,setSelectedRSVP]=
useState<RSVP | null>(null)



const [
showToast,
setShowToast
]=useState(false)


const [
toastMessage,
setToastMessage
]=useState("")





function notify(message:string){

setToastMessage(message)

setShowToast(true)


setTimeout(()=>{

setShowToast(false)

},3000)


}






function getGuest(
guest:RSVP["guest"]
){


if(Array.isArray(guest)){

return guest[0]

}


return guest

}





async function loadRSVP(){



const {

data,

error

}=await supabase

.from("rsvps")

.select(`

id,

attendance,

guests,

message,

created_at,

guest:guests(

name,

slug

)

`)

.order(

"created_at",

{

ascending:false

}

)




if(error){

console.log(
"LOAD RSVP ERROR",
error
)

return

}



setRsvps(
(data ?? []) as unknown as RSVP[]
)


setLoading(false)


}






useEffect(()=>{


const init=async()=>{

await loadRSVP()

}


init()



const channel =
supabase

.channel(
"rsvp-realtime"
)


.on(

"postgres_changes",

{

event:"*",

schema:"public",

table:"rsvps"

},

()=>{


loadRSVP()


}

)


.subscribe()



return()=>{


supabase

.removeChannel(channel)


}


},[])








async function deleteRSVP(id:string){



const confirmDelete =
confirm(
"Hapus data RSVP ini?"
)



if(!confirmDelete)
return



const {

data,

error

}=await supabase

.from("rsvps")

.delete()

.eq(
"id",
id
)

.select()



if(error){

notify(
"Gagal menghapus RSVP"
)

console.log(error)

return

}



if(!data || data.length===0){

notify(
"Data RSVP tidak ditemukan"
)

return

}



setRsvps(prev=>

prev.filter(
(item)=>
item.id!==id
)

)


notify(
"RSVP berhasil dihapus"
)


}








const totalRSVP =
rsvps.length



const totalHadir =
rsvps.filter(

item=>
item.attendance==="Hadir"

).length



const totalTidakHadir =
rsvps.filter(

item=>
item.attendance==="Tidak Hadir"

).length



const totalTamu =
rsvps.reduce(

(sum,item)=>

sum + Number(item.guests || 0),

0

)








const filteredRSVP =
rsvps.filter((item)=>{


const guest=getGuest(item.guest)



const name =
guest?.name
?.toLowerCase()
||
""



const matchSearch =
name.includes(
search.toLowerCase()
)



const matchFilter =
filter==="Semua"

?

true

:

item.attendance===filter




return (

matchSearch &&
matchFilter

)


})








function exportExcel(){



const data =
rsvps.map(item=>{


const guest=getGuest(
item.guest
)


return{


Nama:
guest?.name || "-",


Status:
item.attendance,


Jumlah:
item.guests,


Ucapan:
item.message || "-",


Tanggal:
new Date(
item.created_at
)
.toLocaleDateString(
"id-ID"
)

}


})



const sheet =
XLSX.utils.json_to_sheet(
data
)


const book =
XLSX.utils.book_new()


XLSX.utils.book_append_sheet(

book,

sheet,

"RSVP"

)


XLSX.writeFile(

book,

"RSVP-Wedding.xlsx"

)


notify(
"Excel berhasil dibuat"
)


}







function exportHadir(){



const data =
rsvps

.filter(

item=>
item.attendance==="Hadir"

)

.map(item=>{


const guest=getGuest(item.guest)


return{


Nama:
guest?.name || "-",


Jumlah:
item.guests

}


})



const sheet =
XLSX.utils.json_to_sheet(
data
)


const book =
XLSX.utils.book_new()



XLSX.utils.book_append_sheet(

book,

sheet,

"Hadir"

)



XLSX.writeFile(

book,

"Daftar-Hadir.xlsx"

)


notify(
"Daftar hadir berhasil dibuat"
)


}






if(loading){

return(

<div

className="
min-h-screen
flex
items-center
justify-center
bg-[#faf8f5]
"

>

Loading RSVP...

</div>

)

}






return(

<>


<Toast

show={showToast}

title="RSVP Management"

message={toastMessage}

/>





<section

className="
min-h-screen
bg-[#faf8f5]
px-6
py-20
"

>



<div

className="
max-w-7xl
mx-auto
"

>



<h1

className="
text-center
font-serif
text-5xl
mb-12
"

>

RSVP Management

</h1>






<div

className="
grid
grid-cols-2
md:grid-cols-4
gap-5
mb-10
"

>


{

[

["Total RSVP",totalRSVP],

["Hadir",totalHadir],

["Tidak Hadir",totalTidakHadir],

["Total Orang",totalTamu]

]

.map(
(item,index)=>(


<div

key={index}

className="
bg-white
rounded-3xl
shadow
p-6
"

>


<p
className="
text-gray-400
text-sm
"
>

{item[0]}

</p>


<h2
className="
text-4xl
font-serif
mt-3
"
>

{item[1]}

</h2>



</div>


)

)

}


</div>








<div

className="
flex
gap-4
mb-8
flex-wrap
"

>


<button

onClick={exportExcel}

className="
bg-black
text-white
px-6
py-3
rounded-full
"

>

Export Excel

</button>



<button

onClick={exportHadir}

className="
bg-green-700
text-white
px-6
py-3
rounded-full
"

>

Daftar Hadir

</button>



</div>








<div

className="
bg-white
rounded-3xl
shadow
p-6
mb-8
"

>


<div

className="
flex
gap-4
flex-col
md:flex-row
"

>


<input

className="
border
rounded-xl
p-4
flex-1
"

placeholder="Cari nama tamu..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>




<select

className="
border
rounded-xl
p-4
"

value={filter}

onChange={(e)=>
setFilter(e.target.value)
}

>


<option>
Semua
</option>

<option>
Hadir
</option>

<option>
Tidak Hadir
</option>


</select>



</div>


</div>







<div

className="
bg-white
rounded-3xl
shadow
overflow-hidden
"

>


<table

className="
w-full
"

>

<thead>

<tr
className="
border-b
"
>


<th className="p-4 text-left">
Nama
</th>


<th className="p-4 text-left">
Status
</th>


<th className="p-4 text-left">
Jumlah
</th>


<th className="p-4 text-left">
Ucapan
</th>


<th className="p-4 text-left">
Action
</th>


</tr>


</thead>




<tbody>


{

filteredRSVP.map(item=>{


const guest=getGuest(item.guest)



return(


<tr
key={item.id}
className="
border-b
"
>


<td className="p-4">

{guest?.name || "-"}

</td>


<td className="p-4">

{item.attendance}

</td>


<td className="p-4">

{item.guests} orang

</td>


<td className="p-4">

{item.message || "-"}

</td>


<td className="p-4">


<button

onClick={()=>
setSelectedRSVP(item)
}

className="
bg-black
text-white
px-4
py-2
rounded-full
mr-2
"

>

Detail

</button>



<button

onClick={()=>
deleteRSVP(item.id)
}

className="
bg-red-600
text-white
px-4
py-2
rounded-full
"

>

Hapus

</button>



</td>


</tr>


)


})


}



</tbody>


</table>



</div>




</div>


</section>





{

selectedRSVP && (

<div

className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
px-6
"

>


<div

className="
bg-white
rounded-3xl
p-8
max-w-md
w-full
"

>


<h2
className="
font-serif
text-3xl
mb-6
text-center
"
>

Detail RSVP

</h2>


<p>
Nama:
<b>
{
getGuest(selectedRSVP.guest)?.name
}
</b>
</p>


<p>
Status:
<b>
{selectedRSVP.attendance}
</b>
</p>


<p>
Jumlah:
<b>
{selectedRSVP.guests}
</b>
</p>


<p className="mt-3">

Ucapan:

<br/>

<i>
{selectedRSVP.message || "-"}
</i>

</p>



<button

onClick={()=>
setSelectedRSVP(null)
}

className="
mt-6
w-full
bg-black
text-white
rounded-full
py-3
"

>

Tutup

</button>


</div>


</div>

)

}


</>

)

}