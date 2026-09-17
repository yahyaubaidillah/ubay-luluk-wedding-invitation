"use client"

import {
useEffect,
useMemo,
useState
} from "react"

import {
supabase
} from "@/lib/supabase"

import RSVPAnalytics from "./RSVPAnalytics"



interface RSVPRow {
attendance:string
guests:number
}

interface GuestRow {
id:string
name:string
slug:string
rsvps?:RSVPRow[] | RSVPRow | null
}

interface DashboardSummary {
totalUndangan:number
sudahRSVP:number
hadir:number
tidakHadir:number
belumRSVP:number
totalOrangHadir:number
}



export default function WeddingDashboard(){


const [loading,setLoading]=useState(true)

const [summary,setSummary]=useState<DashboardSummary>({
totalUndangan:0,
sudahRSVP:0,
hadir:0,
tidakHadir:0,
belumRSVP:0,
totalOrangHadir:0
})



function getRSVPValue(
rsvps:GuestRow["rsvps"]
):RSVPRow | null{

if(!rsvps){
return null
}

if(Array.isArray(rsvps)){
return rsvps[0] ?? null
}

return rsvps
}




async function loadDashboard(){


setLoading(true)



const {
data,
error
}=await supabase

.from("guests")

.select(`
id,
name,
slug,
rsvps(
attendance,
guests
)
`)



if(error){

console.log("DASHBOARD ERROR:",error)

setLoading(false)
return

}



const guestData=(data ?? []) as GuestRow[]



const totalUndangan=guestData.length
let sudahRSVP=0
let hadir=0
let tidakHadir=0
let belumRSVP=0
let totalOrangHadir=0



guestData.forEach((guest)=>{

const rsvp=getRSVPValue(guest.rsvps)

if(rsvp){

sudahRSVP++

if(rsvp.attendance==="Hadir"){
hadir++
totalOrangHadir += Number(rsvp.guests || 0)
}else if(rsvp.attendance==="Tidak Hadir"){
tidakHadir++
}

}else{
belumRSVP++
}

})



setSummary({
totalUndangan,
sudahRSVP,
hadir,
tidakHadir,
belumRSVP,
totalOrangHadir
})

setLoading(false)

}



useEffect(()=>{


const initDashboard = async()=>{

await loadDashboard()

}


initDashboard()



const channel = supabase
.channel("dashboard-rsvp-realtime")


.on(
"postgres_changes",
{
event:"*",
schema:"public",
table:"rsvps"
},
()=>{
loadDashboard()
}
)


.subscribe()



return()=>{

supabase.removeChannel(channel)

}


},[])



const stats=useMemo(()=>[
{
title:"Total Undangan",
value:summary.totalUndangan,
description:"Seluruh daftar tamu",
accent:"from-[#fffaf1] to-[#f6eee0]"
},
{
title:"Sudah RSVP",
value:summary.sudahRSVP,
description:"Konfirmasi telah masuk",
accent:"from-[#fffaf4] to-[#efe5d3]"
},
{
title:"Hadir",
value:summary.hadir,
description:"Tamu akan datang",
accent:"from-[#fbf7ef] to-[#efe8db]"
},
{
title:"Tidak Hadir",
value:summary.tidakHadir,
description:"Berhalangan hadir",
accent:"from-[#fffaf4] to-[#f3e8dc]"
},
{
title:"Belum RSVP",
value:summary.belumRSVP,
description:"Menunggu konfirmasi",
accent:"from-[#fffdf8] to-[#f3ede4]"
}
],[
summary.totalUndangan,
summary.sudahRSVP,
summary.hadir,
summary.tidakHadir,
summary.belumRSVP
])



return(


<section

className="
min-h-screen
bg-[#f7f3ec]
px-4
py-8
sm:px-6
lg:px-8
"

>


<div

className="
mx-auto
max-w-7xl
"

>


<div

className="
rounded-[2rem]
border
border-[#e3d4bb]
bg-gradient-to-br
from-[#fffdf9]
via-[#fbf7f0]
to-[#f4ecdf]
px-5
py-8
shadow-[0_20px_60px_rgba(120,93,52,0.08)]
sm:px-8
sm:py-10
"

>


<div className="text-center">


<div

className="
inline-flex
items-center
gap-2
rounded-full
border
border-[#dbc6a3]
bg-white/70
px-4
py-2
text-[11px]
font-medium
uppercase
tracking-[0.28em]
text-[#9b8c73]
backdrop-blur
"

>

Dashboard Admin

</div>



<h1

className="
mt-5
font-serif
text-4xl
leading-tight
text-[#1f1720]
sm:text-5xl
lg:text-6xl
"

>

Wedding Dashboard

</h1>



<p

className="
mx-auto
mt-3
max-w-2xl
text-sm
leading-relaxed
text-[#8e8a86]
sm:text-base
"

>

Ringkasan data undangan, status RSVP, dan kehadiran tamu
dalam tampilan yang rapi, elegan, dan mudah dipantau.

</p>


</div>





<div

className="
mt-8
grid
grid-cols-2
gap-4
lg:grid-cols-5
"

>

{stats.map((item,index)=>(

<div

key={index}

className={`
relative
overflow-hidden
rounded-[1.75rem]
border
border-[#e2cfb0]
bg-gradient-to-br
${item.accent}
px-4
py-5
shadow-[0_14px_30px_rgba(90,69,39,0.07)]
transition-all
duration-300
hover:-translate-y-1
hover:shadow-[0_18px_38px_rgba(90,69,39,0.12)]
sm:px-5
sm:py-6
`}

>

<div

className="
absolute
left-4
top-4
h-4
w-4
border-l
border-t
border-[#ceb386]
"

 />

<div

className="
absolute
bottom-4
right-4
h-4
w-4
border-b
border-r
border-[#ceb386]
"

 />

<p

className="
text-[11px]
font-semibold
uppercase
tracking-[0.22em]
text-[#98a0ba]
sm:text-xs
"

>

{item.title}

</p>



<p

className="
mt-4
font-serif
text-3xl
text-[#10152b]
sm:text-4xl
"

>

{String(item.value).padStart(2,"0")}

</p>



<p

className="
mt-2
text-xs
leading-relaxed
text-[#8e8a86]
sm:text-sm
"

>

{item.description}

</p>


</div>

))}

</div>





<div className="mt-8">

<RSVPAnalytics
totalUndangan={summary.totalUndangan}
sudahRSVP={summary.sudahRSVP}
hadir={summary.hadir}
tidakHadir={summary.tidakHadir}
belumRSVP={summary.belumRSVP}
totalOrangHadir={summary.totalOrangHadir}
loading={loading}
/>

</div>



</div>


</div>


</section>


)

}