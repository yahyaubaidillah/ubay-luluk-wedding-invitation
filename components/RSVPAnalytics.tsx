"use client"

import {
ResponsiveContainer,
PieChart,
Pie,
Cell,
Tooltip
} from "recharts"



interface RSVPAnalyticsProps {
totalUndangan:number
sudahRSVP:number
hadir:number
tidakHadir:number
belumRSVP:number
totalOrangHadir:number
loading:boolean
}



interface TooltipPayloadItem {
name:string
value:number
payload:{
name:string
value:number
color:string
}
}



function CustomTooltip({
active,
payload
}:{
active?:boolean
payload?:TooltipPayloadItem[]
}){

if(!active || !payload || payload.length===0){
return null
}

const item=payload[0]

return(
<div
className="
rounded-2xl
border
border-[#dfcfb6]
bg-[#fffdf9]
px-4
py-3
shadow-[0_12px_30px_rgba(86,64,31,0.12)]
"
>
<p
className="
text-sm
font-semibold
text-[#2a2030]
"
>
{item.name}
</p>

<p
className="
mt-1
text-sm
text-[#8a867f]
"
>
Jumlah: {item.value}
</p>
</div>
)

}



export default function RSVPAnalytics({
totalUndangan,
sudahRSVP,
hadir,
tidakHadir,
belumRSVP,
totalOrangHadir,
loading
}:RSVPAnalyticsProps){



const chartData=[
{
name:"Hadir",
value:hadir,
color:"#111a33"
},
{
name:"Tidak Hadir",
value:tidakHadir,
color:"#c9b28d"
},
{
name:"Belum RSVP",
value:belumRSVP,
color:"#e7e3dc"
}
]



const confirmPercent=
totalUndangan > 0
?
Math.round((sudahRSVP / totalUndangan) * 100)
:
0



const hadirPercent=
totalUndangan > 0
?
Math.round((hadir / totalUndangan) * 100)
:
0



const attendanceCards=[
{
label:"Persentase Konfirmasi",
value:`${confirmPercent}%`,
desc:"Dari seluruh tamu undangan"
},
{
label:"Total Orang Hadir",
value:String(totalOrangHadir).padStart(2,"0"),
desc:"Akumulasi jumlah tamu"
},
{
label:"Persentase Hadir",
value:`${hadirPercent}%`,
desc:"Dibanding total undangan"
},
{
label:"Belum RSVP",
value:String(belumRSVP).padStart(2,"0"),
desc:"Masih menunggu jawaban"
}
]



return(


<div

className="
grid
grid-cols-1
gap-6
xl:grid-cols-[1.05fr_0.95fr]
"

>


<div

className="
rounded-[2rem]
border
border-[#e3d4bb]
bg-[#fffdf9]
p-5
shadow-[0_18px_40px_rgba(113,84,43,0.08)]
sm:p-7
"

>


<div

className="
flex
flex-col
gap-3
sm:flex-row
sm:items-center
sm:justify-between
"

>

<div>
<h2
className="
font-serif
text-2xl
text-[#1e1623]
sm:text-3xl
"
>
Status RSVP
</h2>

<p
className="
mt-1
text-sm
text-[#8b877f]
"
>
Distribusi kehadiran tamu secara keseluruhan.
</p>
</div>



<div

className="
inline-flex
items-center
gap-2
rounded-full
border
border-[#e1d0b5]
bg-[#faf5ec]
px-4
py-2
text-xs
font-medium
text-[#8f7b5d]
"
>

Live Summary

</div>


</div>





<div

className="
mt-6
grid
grid-cols-1
items-center
gap-6
lg:grid-cols-[280px_1fr]
"

>


<div className="mx-auto h-[260px] w-full max-w-[280px]">

<ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie
data={chartData}
dataKey="value"
nameKey="name"
cx="50%"
cy="50%"
innerRadius={62}
outerRadius={92}
paddingAngle={2}
stroke="none"
>

{chartData.map((item,index)=>(

<Cell
key={index}
fill={item.color}
/>

))}

</Pie>

<Tooltip content={<CustomTooltip />} />

</PieChart>

</ResponsiveContainer>

</div>





<div className="space-y-4">

{chartData.map((item,index)=>(

<div

key={index}

className="
flex
items-center
justify-between
rounded-2xl
border
border-[#eee5d6]
bg-[#fbf8f2]
px-4
py-4
"

>

<div className="flex items-center gap-3">

<span
className="h-3 w-3 rounded-full"
style={{
backgroundColor:item.color
}}
/>

<div>
<p
className="
text-sm
font-semibold
text-[#2b2230]
"
>
{item.name}
</p>

<p
className="
text-xs
text-[#928f87]
"
>
Status undangan
</p>
</div>

</div>



<p
className="
font-serif
text-2xl
text-[#10152b]
"
>
{String(item.value).padStart(2,"0")}
</p>


</div>

))}



<div

className="
rounded-2xl
border
border-dashed
border-[#dbc7a8]
bg-gradient-to-r
from-[#fffaf1]
to-[#f7efe2]
px-4
py-4
"

>

<p
className="
text-sm
font-semibold
text-[#7d6a4b]
"
>
Catatan
</p>

<p
className="
mt-1
text-sm
leading-relaxed
text-[#8c867e]
"
>
{loading
? "Sedang memuat data RSVP terbaru..."
: "Data ini membantu memantau progres konfirmasi dan kesiapan acara secara cepat."
}
</p>

</div>


</div>



</div>



</div>








<div

className="
rounded-[2rem]
border
border-[#e3d4bb]
bg-[#fffdf9]
p-5
shadow-[0_18px_40px_rgba(113,84,43,0.08)]
sm:p-7
"

>


<div>
<h2
className="
font-serif
text-2xl
text-[#1e1623]
sm:text-3xl
"
>
Ringkasan Kehadiran
</h2>

<p
className="
mt-1
text-sm
text-[#8b877f]
"
>
Angka inti yang paling sering dibutuhkan saat monitoring.
</p>
</div>




<div

className="
mt-6
grid
grid-cols-1
gap-4
sm:grid-cols-2
"

>

{attendanceCards.map((item,index)=>(

<div

key={index}

className="
relative
overflow-hidden
rounded-[1.5rem]
border
border-[#eadcc5]
bg-gradient-to-br
from-[#fffdf8]
to-[#f5eee1]
px-5
py-5
shadow-[0_10px_24px_rgba(100,76,43,0.06)]
"

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
text-xs
font-semibold
uppercase
tracking-[0.18em]
text-[#98a0ba]
"
>
{item.label}
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
{item.value}
</p>

<p
className="
mt-2
text-sm
text-[#8e8a86]
"
>
{item.desc}
</p>

</div>

))}

</div>





<div

className="
mt-6
rounded-[1.5rem]
border
border-[#ead8bc]
bg-[#faf6ee]
px-5
py-5
"

>

<div

className="
flex
flex-col
gap-4
sm:flex-row
sm:items-center
sm:justify-between
"

>

<div>
<p
className="
text-xs
font-semibold
uppercase
tracking-[0.18em]
text-[#9aa2bc]
"
>
Overview
</p>

<h3
className="
mt-2
font-serif
text-2xl
text-[#231a26]
"
>
Progress RSVP
</h3>
</div>



<div
className="
flex
items-center
gap-3
"
>
<div
className="
h-3
w-3
rounded-full
bg-[#111a33]
"
/>
<p
className="
text-sm
text-[#847f78]
"
>
{sudahRSVP} dari {totalUndangan} tamu sudah memberi konfirmasi
</p>
</div>


</div>




<div

className="
mt-5
h-3
w-full
overflow-hidden
rounded-full
bg-[#ebe4d7]
"

>

<div
className="
h-full
rounded-full
bg-gradient-to-r
from-[#1a213c]
via-[#4f5978]
to-[#cbb48d]
transition-all
duration-700
"
style={{
width:`${confirmPercent}%`
}}
/>

</div>



<div

className="
mt-3
flex
items-center
justify-between
text-xs
text-[#908b84]
"

>

<span>0%</span>
<span>{confirmPercent}% selesai</span>
<span>100%</span>

</div>



</div>



</div>



</div>


)

}