"use client"


import {motion} from "framer-motion"



interface RevealProps{

children:React.ReactNode

delay?:number

className?:string

}




export default function Reveal({

children,

delay=0,

className=""


}:RevealProps){



return(


<motion.div


initial={{

opacity:0,

y:50,

scale:0.98

}}



whileInView={{

opacity:1,

y:0,

scale:1

}}



exit={{

opacity:0,

y:50

}}



viewport={{

once:false,

amount:0.25

}}



transition={{

duration:0.8,

delay,

ease:"easeOut"

}}



className={className}


>


{children}


</motion.div>



)

}