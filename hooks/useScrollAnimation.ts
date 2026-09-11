"use client"

import {useEffect,useRef} from "react"


export default function useScrollAnimation(){


const ref=useRef(null)


useEffect(()=>{


const observer =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"animate-show"
)

}

})

}

)



if(ref.current){

observer.observe(ref.current)

}



return()=>observer.disconnect()


},[])



return ref

}