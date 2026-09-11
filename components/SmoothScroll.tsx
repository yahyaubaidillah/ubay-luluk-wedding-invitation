"use client"


import Lenis from "lenis"

import {
useEffect
} from "react"



export default function SmoothScroll(){



useEffect(()=>{


const lenis = new Lenis({

duration:1.2,

smoothWheel:true,

wheelMultiplier:1,

touchMultiplier:1.5,

})





function raf(time:number){

lenis.raf(time)

requestAnimationFrame(raf)

// return null

}



const animationFrame =
requestAnimationFrame(raf)





// update ketika tinggi halaman berubah

const resizeObserver =
new ResizeObserver(()=>{

lenis.resize()

})



resizeObserver.observe(
document.body
)





return()=>{


cancelAnimationFrame(
animationFrame
)


resizeObserver.disconnect()


lenis.destroy()


}



},[])



return null


}