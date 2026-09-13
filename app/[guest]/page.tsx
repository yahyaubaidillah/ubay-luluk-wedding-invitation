import { supabase } from "@/lib/supabase"

import WeddingPage from "@/components/WeddingPage"


interface GuestPageProps {

  params: Promise<{
    guest: string
  }>

}



export default async function GuestPage({

  params

}: GuestPageProps){


  const { guest } = await params



  const { data, error } = await supabase

    .from("guests")

    .select("*")

    .eq("slug", guest)

    .single()



  if(error || !data){


    return (

      <main

      className="
      min-h-screen
      flex
      items-center
      justify-center
      "

      >

        <h1

        className="
        text-xl
        font-serif
        "

        >

          Undangan tidak ditemukan

        </h1>


      </main>

    )

  }




  return (

    <WeddingPage


      guestName={data.name}


      guestId={data.id}


    />

  )


}