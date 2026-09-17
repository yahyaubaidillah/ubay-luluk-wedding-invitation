    "use client"


    import {
    useEffect,
    useState
    } from "react"


    import {
    supabase
    } from "@/lib/supabase"

    import Toast from "./Toast"




    interface RSVPData {

    attendance:string

    guests:number

    }



    interface Guest {

    id:string

    name:string

    slug:string

    rsvps?:RSVPData

    }






    export default function GuestManagement(){



    const [guestList,setGuestList]=useState<Guest[]>([])



    const [name,setName]=useState("")


    const [slug,setSlug]=useState("")


    const [loading,setLoading]=useState(false)


    const [showToast,setShowToast]=useState(false)

    const [toastMessage,setToastMessage]=useState("")

    const [editId,setEditId]=useState<string | null>(null)

    const [editName,setEditName]=useState("")

    const [editSlug,setEditSlug]=useState("")

    




async function updateGuest(){

if(!editId)
return


const {
data,
error

}=await supabase

.from("guests")

.update({

name:editName,

slug:editSlug

})

.eq(
"id",
editId
)

.select()



console.log(
"UPDATE RESULT:",
{
data,
error
}
)



if(error){

setToastMessage(
error.message
)

setShowToast(true)

return

}




if(!data || data.length===0){


setToastMessage(
"Data tidak ditemukan atau gagal diperbarui"
)

setShowToast(true)

return


}





await loadGuests()



setEditId(null)

setEditName("")

setEditSlug("")



setToastMessage(
"Data tamu berhasil diperbarui"
)

setShowToast(true)



}

async function deleteGuest(id:string){


const confirmDelete = confirm(
"Apakah Anda yakin ingin menghapus tamu ini?"
)


if(!confirmDelete)
return



const {

data,

error

}=await supabase

.from("guests")

.delete()

.eq(
"id",
id
)

.select()



console.log(
"DELETE RESULT:",
{
data,
error
}
)



if(error){

setToastMessage(
error.message
)

setShowToast(true)

return

}




if(!data || data.length===0){


setToastMessage(
"Data tidak ditemukan atau gagal dihapus"
)

setShowToast(true)

return


}





await loadGuests()



setToastMessage(
"Tamu berhasil dihapus"
)

setShowToast(true)



}

    async function loadGuests(){



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


    .order(

    "created_at",

    {

    ascending:false

    }

    )





    if(error){

    console.log(error)

    return

    }





    console.log(
    "GUEST DATA:",
    data
    )





    setGuestList(

    (data || []) as unknown as Guest[]

    )



    }









    useEffect(()=>{


    loadGuests()


    },[])




    function showToastMessage(
    message:string
    ){

    setToastMessage(message)

    setShowToast(true)


    setTimeout(()=>{

    setShowToast(false)

    },3000)


    }




    async function addGuest(){



    if(!name || !slug){

    alert(
    "Nama dan slug wajib diisi"
    )

    return

    }





    setLoading(true)





    // cek slug duplicate

    const {

    data:existing

    }=await supabase


    .from("guests")

    .select("id")

    .eq(

    "slug",

    slug

    )

    .maybeSingle()






    if(existing){


    alert(
    "Slug sudah digunakan"
    )


    setLoading(false)

    return


    }








    const {

    error

    }=await supabase


    .from("guests")


    .insert({

    name,

    slug

    })







    setLoading(false)







    if(error){

    showToastMessage(
    "Gagal menambahkan tamu"
    )

    return

    }







    setName("")

    setSlug("")



    loadGuests()

    showToastMessage(
    "Tamu berhasil ditambahkan"
    )



    }









    return(

    <>
    <Toast

    show={showToast}

    title="Guest Management"

    message={toastMessage}

    />

    <section


    className="

    min-h-screen

    bg-[#faf8f5]

    py-20

    px-6

    "

    >



    <div

    className="

    max-w-5xl

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

    Guest Management

    </h1>







    <div

    className="

    bg-white

    rounded-3xl

    shadow

    p-8

    "

    >



    <div

    className="

    grid

    md:grid-cols-3

    gap-4

    "

    >



    <input


    className="

    border

    rounded-xl

    p-4

    "

    placeholder="Nama tamu"


    value={name}



    onChange={(e)=>

    setName(
    e.target.value
    )

    }


    />








    <input


    className="

    border

    rounded-xl

    p-4

    "

    placeholder="Slug"


    value={slug}



    onChange={(e)=>

    setSlug(

    e.target.value

    .toLowerCase()

    )

    }



    />







    <button


    onClick={addGuest}


    disabled={loading}



    className="

    bg-black

    text-white

    rounded-xl

    "

    >


    {

    loading

    ?

    "Menyimpan..."

    :

    "Tambah"

    }


    </button>




    </div>


    </div>









    <div

    className="

    mt-10

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

    className="border-b"

    >


    <th className="p-4 text-left">

    Nama

    </th>


    <th className="p-4 text-left">

    Slug

    </th>


    <th className="p-4 text-left">

    Status

    </th>


    <th className="p-4 text-left">

    Jumlah

    </th>


    <th className="p-4 text-left">

    Link

    </th>

    <th className="p-4 text-left">
    Action
    </th>


    </tr>


    </thead>






    <tbody>



    {

    guestList.map((guest)=>(



    <tr

    key={guest.id}

    className="border-b"

    >




    <td className="p-4">

    {guest.name}

    </td>





    <td className="p-4">

    {guest.slug}

    </td>






    <td className="p-4">


    {
    guest.rsvps
    ?
    guest.rsvps.attendance
    :
    <span className="text-gray-400">
    Belum RSVP
    </span>
    }



    </td>








    <td className="p-4">


    {
    guest.rsvps
    ?
    guest.rsvps.guests
    :
    "-"
    }



    </td>







    <td className="p-4">


    <a


    href={`/${guest.slug}`}

    target="_blank"


    className="text-blue-600"


    >


    Buka Undangan


    </a>


    </td>


    <td className="p-4">


<button

className="text-blue-600"

onClick={()=>{

setEditId(guest.id)

setEditName(guest.name)

setEditSlug(guest.slug)

}}

>

Edit

</button>



<button

className="
text-red-600
"

onClick={()=>deleteGuest(guest.id)}

>

Hapus

</button>



</td>


    </tr>

    



    ))


    }



    </tbody>





    </table>





    </div>





    </div>

    {
editId && (

<div

className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
"

>


<div

className="
bg-[#fffdf8]
rounded-3xl
p-8
w-[400px]
shadow-xl
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

Edit Guest

</h2>



<input

className="
w-full
border
rounded-xl
p-3
mb-4
"

value={editName}

onChange={(e)=>
setEditName(e.target.value)
}

 />




<input

className="
w-full
border
rounded-xl
p-3
mb-6
"

value={editSlug}

onChange={(e)=>
setEditSlug(e.target.value)
}

 />




<div className="flex gap-3">


<button

onClick={updateGuest}

className="
bg-black
text-white
rounded-xl
px-6
py-3
flex-1
"

>

Simpan

</button>




<button

onClick={()=>setEditId(null)}

className="
border
rounded-xl
px-6
py-3
"

>

Batal

</button>


</div>


</div>


</div>

)
}

    </section>

    </>



    )



    }