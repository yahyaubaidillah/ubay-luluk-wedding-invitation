import type { Metadata } from "next"

import {
Cormorant_Garamond,
Inter
} from "next/font/google"

import "./globals.css"



const serif =

Cormorant_Garamond({

subsets:["latin"],

weight:[
"400",
"500",
"600"
],

variable:
"--font-serif"

})




const sans =

Inter({

subsets:["latin"],

variable:
"--font-sans"

})





export const metadata: Metadata = {

title:
"Ubay & Luluk Wedding Invitation",

description:
"Undangan Pernikahan Ubay & Luluk. 02 Oktober 2026.",



keywords:[

"Wedding Invitation",

"Undangan Pernikahan",

"Ubay",

"Luluk",

"02 Oktober 2026"

],

robots:{

index:true,

follow:true,

googleBot:{

index:true,

follow:true

}

},



authors:[

{
name:
"Ubay & Luluk"
}

],



openGraph:{


title:
"Ubay & Luluk Wedding Invitation",


description:
"With love and happiness, we invite you to celebrate our wedding day.",


url:
"https://domain-anda.com",


siteName:
"Ubay & Luluk Wedding",


images:[

{

url:
"/images/wedding-cover.jpg",

width:1200,

height:630,

alt:
"Ubay & Luluk Wedding Invitation"

}

],


locale:
"id_ID",


type:
"website"


},



twitter:{


card:
"summary_large_image",


title:
"Ubay & Luluk Wedding Invitation",


description:
"02 Oktober 2026",


images:[

"/images/wedding-cover.jpg"

]


}

}





export default function RootLayout({

children,

}: Readonly<{

children: React.ReactNode

}>) {


return (

<html


lang="id"

className={`
${serif.variable}
${sans.variable}
h-full
antialiased
`}

// className={

// `${serif.variable} ${sans.variable} h-full antialiased`

// }

>


<body

className="
min-h-screen
overflow-x-hidden
bg-[#faf8f5]
font-sans
antialiased
"

>


{children}


</body>



</html>

)


}