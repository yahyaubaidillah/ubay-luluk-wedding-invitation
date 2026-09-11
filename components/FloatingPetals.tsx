"use client"

import {motion} from "framer-motion"


export default function FloatingPetals(){


const petals=[
{
left:"10%",
delay:0
},
{
left:"30%",
delay:2
},
{
left:"70%",
delay:1
},
{
left:"90%",
delay:3
}
]


return(

<>

{
petals.map((item,index)=>(


<motion.div

key={index}

initial={{
y:"100vh",
opacity:0
}}

animate={{
y:"-20vh",
opacity:[0,1,0]
}}

transition={{

duration:10,
repeat:Infinity,
delay:item.delay

}}

style={{
left:item.left
}}

className="
absolute
bottom-0
text-2xl
"
>

✿

</motion.div>


))

}

</>

)

}