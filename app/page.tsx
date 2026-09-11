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
import Gift from "@/components/Gift"
import RSVP from "@/components/RSVP"
import Wishes from "@/components/Wishes"
import ImageProtection from "@/components/ImageProtection"
import MusicPlayer from "@/components/MusicPlayer"


export default function Home(){

const [opened,setOpened]=useState(false)


return (

<main>
<ImageProtection/>

<SmoothScroll/>


{
!opened &&
(
<Opening
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

<Gift/>

<RSVP/>

<Wishes/>




{/* <section
id="couple"
className="
min-h-screen
bg-white
flex
items-center
justify-center
"
>

<h2
className="
text-5xl
"
>
Couple Section
</h2>

</section> */}



{/* <section
id="event"
className="
min-h-screen
bg-neutral-100
flex
items-center
justify-center
"
>

<h2
className="
text-5xl
"
>
Event Section
</h2>

</section> */}



{/* <section
id="gallery"
className="
min-h-screen
bg-white
flex
items-center
justify-center
"
>

<h2
className="
text-5xl
"
>
Gallery Section
</h2>


</section> */}


</>

)
}

{/* <SmoothScroll/> */}



</main>

)

}