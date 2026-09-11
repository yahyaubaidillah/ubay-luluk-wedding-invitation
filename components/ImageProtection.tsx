"use client"


import {useEffect} from "react"



export default function ImageProtection(){


useEffect(()=>{


function preventContextMenu(
e:MouseEvent
){

e.preventDefault()

}



document.addEventListener(
"contextmenu",
preventContextMenu
)



return()=>{

document.removeEventListener(
"contextmenu",
preventContextMenu
)

}



},[])



return null


}