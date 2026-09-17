"use client"


import {
useEffect,
useRef,
useState
} from "react"


import {
motion,
AnimatePresence
} from "framer-motion"


import {
Music,
Pause
} from "lucide-react"




interface MusicPlayerProps{

play:boolean

}




export default function MusicPlayer({

play

}:MusicPlayerProps){



const audioRef =
useRef<HTMLAudioElement | null>(null)



const [playing,setPlaying]=
useState(false)



const [showTitle,setShowTitle]=
useState(false)





useEffect(()=>{


if(
play &&
audioRef.current
){


audioRef.current
.play()

.then(()=>{


setPlaying(true)


setShowTitle(true)



setTimeout(()=>{

setShowTitle(false)

},5000)



})

.catch((error)=>{


console.log(
"Music autoplay blocked:",
error
)


})


}



},[play])








function toggleMusic(){


if(!audioRef.current)
return



if(playing){


audioRef.current.pause()

setPlaying(false)


}

else{


audioRef.current.play()

setPlaying(true)


}


}







return(

<>


<audio

ref={audioRef}

src="/music/elvis.mp3"

loop

/>







<AnimatePresence>


{

showTitle &&


<motion.div


initial={{

opacity:0,

y:30

}}


animate={{

opacity:1,

y:0

}}


exit={{

opacity:0,

y:20

}}



className="

fixed

bottom-24

right-6

z-[60]

bg-black/80

text-white

px-5

py-3

rounded-full

backdrop-blur-md

shadow-xl

text-sm

"

>


🎵

Elvis Presley -

Can&apos;t Help Falling in Love


</motion.div>


}



</AnimatePresence>









<motion.button



onClick={toggleMusic}



animate={

playing

?

{

rotate:360

}

:

{

rotate:0

}

}



transition={{

duration:8,

repeat:

playing

?

Infinity

:

0,

ease:"linear"

}}




className="

fixed

bottom-6

right-6

z-[60]

w-14

h-14

rounded-full

bg-black

text-white

shadow-xl

flex

items-center

justify-center

hover:scale-110

transition

"

>


{

playing

?

<Music size={24}/>

:

<Pause size={24}/>

}



</motion.button>






</>


)


}