"use client"


import {useState} from "react"


import Opening from "@/components/Opening"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import SmoothScroll from "@/components/SmoothScroll"
import Couple from "@/components/Couple"
import OurStory from "@/components/OurStory"
import EventDetail from "@/components/EventDetail"
import Gallery from "@/components/Gallery"
// import Gift from "@/components/Gift"
import RSVP from "@/components/RSVP"
import Wishes from "@/components/Wishes"
import ImageProtection from "@/components/ImageProtection"
import MusicPlayer from "@/components/MusicPlayer"
import WeddingFooter from "./WeddingFooter"
import Hadith from "./Hadith"


interface WeddingPageProps {

    guestName:string

    guestId:string

}





export default function WeddingPage({

    guestName,

    guestId

}:WeddingPageProps){



const [opened,setOpened]=useState(false)





return(


<main>


<ImageProtection/>


<SmoothScroll/>





{

!opened &&

(

<Opening

guestName={guestName}

onOpen={()=>setOpened(true)}

/>

)

}





{

opened &&

(


<>


<MusicPlayer play={opened}/>



<Navbar/>




<Hero/>




<Couple/>




<OurStory/>




<EventDetail/>




<Gallery/>




{/* <Gift/> */}





<RSVP

guestId={guestId}

/>





<Wishes/>

<Hadith />

<WeddingFooter />

</>


)

}



</main>


)

}