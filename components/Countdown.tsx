"use client"

import {useEffect,useState} from "react"


export default function Countdown(){

const target =
new Date("December 12, 2026 08:00:00").getTime()


const [time,setTime]=useState({
 days:0,
 hours:0,
 minutes:0,
 seconds:0
})


useEffect(()=>{


const interval=setInterval(()=>{


const now=new Date().getTime()

const distance=target-now


setTime({

days:
Math.floor(
distance/(1000*60*60*24)
),


hours:
Math.floor(
(distance/(1000*60*60))%24
),


minutes:
Math.floor(
(distance/(1000*60))%60
),


seconds:
Math.floor(
(distance/1000)%60
)


})


},1000)


return()=>clearInterval(interval)


},[])



return(

<div
className="
flex
justify-center
gap-5
mt-10
"
>


{
Object.entries(time)
.map(([key,value])=>(


<div
key={key}
className="
text-center
"
>


<div
className="
text-3xl
font-serif
"
>

{value}

</div>


<span
className="
text-xs
uppercase
tracking-widest
opacity-70
"
>

{key}

</span>


</div>


))
}


</div>

)

}