"use client"


import {
useEffect,
useState
} from "react"


import {
PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Legend
} from "recharts"


import Papa from "papaparse"


import {
supabase
} from "@/lib/supabase"



interface RSVP{

id:string
name:string
attendance:string
guests:number
message:string
created_at:string

}





export default function AdminDashboard(){


const [data,setData]=useState<RSVP[]>([])

const [loading,setLoading]=useState(true)

const [error,setError]=useState("")

const [editing,setEditing]=useState<RSVP | null>(null)

const [search,setSearch]=useState("")

const [filter,setFilter]=useState("Semua")



async function loadData(){


setLoading(true)


const {

data,

error

}=await supabase

.from("rsvps")

.select("*")

.order(
"created_at",
{
ascending:false
}
)



if(error){

console.log(error)

setError(error.message)

setLoading(false)

return

}



if(data){

setData(data)

}


setLoading(false)


}







function exportCSV(){


if(data.length===0){

alert("Tidak ada data RSVP")

return

}



const exportData = data.map((guest)=>(


{

Nama:
guest.name,


Status:
guest.attendance,


Jumlah_Tamu:
guest.guests,


Ucapan:
guest.message,


Waktu_RSVP:
new Date(
guest.created_at
)
.toLocaleString(
"id-ID"
)


}


))



const csv = Papa.unparse(exportData)



const blob = new Blob(

[csv],

{
type:"text/csv;charset=utf-8;"
}

)



const url = URL.createObjectURL(blob)



const link=document.createElement("a")


link.href=url


link.download="wedding-rsvp.csv"


document.body.appendChild(link)


link.click()


document.body.removeChild(link)


URL.revokeObjectURL(url)



}


useEffect(()=>{

supabase.auth.getUser()
.then(({data})=>{

console.log(
"ADMIN USER:",
data.user
)

})


},[])





useEffect(()=>{


loadData()




const channel = supabase

.channel(
"admin-rsvp"
)


.on(

"postgres_changes",

{

event:"*",

schema:"public",

table:"rsvps"

},

()=>{


console.log(
"Realtime update"
)


loadData()


}

)


.subscribe()



return()=>{


supabase.removeChannel(channel)


}



},[])









const total =
data.length





const hadir =
data.filter(

(item)=>
item.attendance==="Hadir"

).length






const tidakHadir =
data.filter(

(item)=>
item.attendance==="Tidak Hadir"

).length






const totalTamu =
data.reduce(

(sum,item)=>
sum + item.guests,

0

)


const attendanceChart = [

{
name:"Hadir",
value:hadir
},

{
name:"Tidak Hadir",
value:tidakHadir
}

]




const guestChart = data.slice(0,10).map((item)=>({

name:item.name,

tamu:item.guests

}))

const filteredData = data.filter((item)=>{


const matchSearch =
item.name
.toLowerCase()
.includes(
search.toLowerCase()
)



const matchFilter =

filter==="Semua"

?

true

:

item.attendance===filter



return matchSearch && matchFilter


})


async function deleteRSVP(id:string){


console.log(
"DELETE ID:",
id
)



const confirmDelete =
confirm(
"Apakah yakin ingin menghapus RSVP ini?"
)



if(!confirmDelete){

return

}



const {

error

}=await supabase

.from("rsvps")

.delete()

.eq(
"id",
id
)




if(error){

console.log(
"DELETE ERROR:",
error
)

alert(error.message)

return

}



alert(
"RSVP berhasil dihapus"
)


loadData()


}

async function updateRSVP(){


if(!editing){

return

}



const {

error

}=await supabase

.from("rsvps")

.update({

name:editing.name,

attendance:editing.attendance,

guests:editing.guests,

message:editing.message

})

.eq(

"id",

editing.id

)



if(error){

alert(error.message)

return

}



setEditing(null)


loadData()


}

return(


<section

className="
min-h-screen
bg-[#faf8f5]
py-20
px-6
"

>



<h1

className="
text-5xl
font-serif
text-center
mb-12
"

>

Wedding Admin Dashboard

</h1>







<div

className="
flex
justify-end
gap-3
max-w-6xl
mx-auto
mb-5
"

>



<button

onClick={loadData}

className="
bg-gray-700
text-white
rounded-full
px-6
py-2
"

>

Refresh

</button>





<button

onClick={exportCSV}

className="
bg-black
text-white
rounded-full
px-6
py-2
"

>

Export CSV

</button>



</div>








{

error &&


<div

className="
max-w-6xl
mx-auto
bg-red-100
text-red-700
p-4
rounded-xl
mb-5
"

>

{error}

</div>


}









<div

className="
grid
md:grid-cols-4
gap-6
max-w-6xl
mx-auto
"

>



<Card

title="Total RSVP"

value={total}

/>



<Card

title="Hadir"

value={hadir}

/>



<Card

title="Tidak Hadir"

value={tidakHadir}

/>



<Card

title="Jumlah Tamu"

value={totalTamu}

/>



</div>

<div

className="
max-w-6xl
mx-auto
mt-12
grid
md:grid-cols-2
gap-8
"

>


<div

className="
bg-white
rounded-3xl
shadow
p-8
"

>


<h2

className="
text-2xl
font-serif
mb-6
"

>

Status Kehadiran

</h2>



<div

className="
h-72
"

>

<ResponsiveContainer
width="100%"
height="100%"
>


<PieChart width={300} height={330}>

<Pie

data={attendanceChart}

dataKey="value"

cx="50%"

cy="45%"

outerRadius={100}

label

animationDuration={800}

>

{
attendanceChart.map((entry,index)=>(

<Cell

key={index}

fill={
index === 0
?
"#86efac"
:
"#fda4af"
}

/>

))
}

</Pie>


<Tooltip

formatter={(value,name)=>[

`${Number(value ?? 0)} orang`,

String(name)

]}

/>


<Legend

verticalAlign="bottom"

align="center"

height={36}

/>


</PieChart>


</ResponsiveContainer>


</div>


</div>







<div

className="
bg-white
rounded-3xl
shadow
p-8
"

>


<h2

className="
text-2xl
font-serif
mb-6
"

>

Jumlah Tamu

</h2>




<div

className="
h-72
"

>


<ResponsiveContainer

width="100%"

height="100%"

>


<BarChart

data={guestChart}

>


<XAxis

dataKey="name"

/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="tamu"

/>


</BarChart>


</ResponsiveContainer>


</div>


</div>



</div>









<div

className="
max-w-6xl
mx-auto
mt-12
bg-white
rounded-3xl
shadow
p-8
overflow-x-auto
"

>



<h2

className="
text-3xl
font-serif
mb-6
"

>

Guest List

</h2>



<div

className="
flex
gap-4
mb-6
"

>


<input

className="
border
rounded-xl
p-3
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
p-3
"

value={filter}

onChange={(e)=>
setFilter(e.target.value)
}

>

<option value="Semua">

Semua

</option>


<option value="Hadir">

Hadir

</option>


<option value="Tidak Hadir">

Tidak Hadir

</option>


</select>



</div>



{

loading ?

(

<p>

Loading data...

</p>

)

:

(



<table

className="
w-full
"

>



<thead>

<tr className="border-b">


<th className="text-left p-3">
Nama
</th>


<th className="text-left p-3">
Status
</th>


<th className="text-left p-3">
Jumlah
</th>


<th className="text-left p-3">
Ucapan
</th>


<th className="text-left p-3">
Waktu
</th>


<th className="text-left p-3">
Aksi
</th>


</tr>

</thead>






<tbody>



{

filteredData.map((guest)=>(



<tr

key={guest.id}

className="
border-b
"

>



<td className="p-3">

{guest.name}

</td>




<td className="p-3">

{guest.attendance}

</td>




<td className="p-3">

{guest.guests}

</td>




<td className="p-3">

{guest.message}

</td>


<td className="p-3 text-sm text-gray-500">


{

new Date(
guest.created_at
)

.toLocaleString(
"id-ID"
)


}


</td>

<td className="p-3 space-x-2">


<button

onClick={()=>setEditing(guest)}

className="
bg-blue-600
text-white
rounded-full
px-4
py-2
"

>

Edit

</button>




<button

onClick={()=>deleteRSVP(guest.id)}

className="
bg-red-600
text-white
rounded-full
px-4
py-2
"

>

Hapus

</button>



</td>



</tr>



))


}





</tbody>



</table>


)

}



</div>



{

editing &&

<div

className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
"

>


<div

className="
bg-white
rounded-3xl
p-8
w-full
max-w-md
"

>


<h2

className="
text-3xl
font-serif
mb-6
"

>

Edit RSVP

</h2>



<input

className="
border
rounded-xl
p-3
w-full
mb-3
"

value={editing.name}

onChange={(e)=>

setEditing({

...editing,

name:e.target.value

})

}

/>




<select

className="
border
rounded-xl
p-3
w-full
mb-3
"

value={editing.attendance}

onChange={(e)=>

setEditing({

...editing,

attendance:e.target.value

})

}

>


<option>

Hadir

</option>


<option>

Tidak Hadir

</option>


</select>





<input

type="number"

className="
border
rounded-xl
p-3
w-full
mb-3
"

value={editing.guests}

onChange={(e)=>

setEditing({

...editing,

guests:Number(e.target.value)

})

}

/>





<textarea

className="
border
rounded-xl
p-3
w-full
mb-5
"

value={editing.message}

onChange={(e)=>

setEditing({

...editing,

message:e.target.value

})

}

/>





<div

className="
flex
gap-3
"

>


<button

onClick={updateRSVP}

className="
bg-black
text-white
rounded-full
px-6
py-3
"

>

Simpan

</button>




<button

onClick={()=>
setEditing(null)
}

className="
border
rounded-full
px-6
py-3
"

>

Batal

</button>



</div>


</div>


</div>


}


</section>


)


}








function Card({

title,

value


}:{

title:string

value:number


}){


return(


<div

className="
bg-white
rounded-3xl
shadow
p-8
text-center
"

>


<h3

className="
text-gray-500
"

>

{title}

</h3>



<p

className="
text-4xl
font-serif
mt-3
"

>

{value}

</p>



</div>


)


}