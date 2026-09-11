import WeddingPage from "@/components/WeddingPage"


export default async function GuestPage({

params

}:{

params:Promise<{
guest:string
}>

}){


const {guest}=await params


const guestName =
guest.charAt(0).toUpperCase()
+
guest.slice(1)



return (

<WeddingPage

guestName={guestName}

/>

)

}