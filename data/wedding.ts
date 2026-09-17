// export const weddingData = {
//   groom: {
//     name: "M. Yahya Ubaidillah",
//     parents: "Putra dari Bapak Salamet & Raudatul Jannah",
//   },

//   bride: {
//     name: "Khofifah Mamluatur Riskiyah",
//     parents: "Putri dari Bapak Akh. Hidayat MZ & Ibu Sitti Juhairiyah",
//   },

//   date: "02 Oktober 2026",

//   location: "Aenbaja Kenek, Bluto, Sumenep",

//   event: {
//     akad: {
//       time: "09.00 WIB",
//       place: "Kediaman Mempelai Wanita",
//     },

//     // reception: {
//     //   time: "11.00 - 14.00 WIB",
//     //   place: "Hotel Grand Melia Jakarta",
//     // }
//   }
// };

export interface EventData {
  type:string
  date:string
  time:string
  location:string
  address:string
  maps:string
}


export interface StoryData {
  year:string
  title:string
  description:string
}

export const wedding = {



groom:{
name:"Ubay",
fullname:"M. Yahya Ubaidillah,S.Kom,M.Kom",
parents:
"Putra dari Bapak Salamet & Raudatul Jannah",
photo:"/images/ubay.jpg"
},


bride:{
name:"Luluk",
fullname:"Khofifah Mamluatur Riskiyah,S.M",
parents:
"Putri dari Bapak Akh. Hidayat MZ & Ibu Sitti Juhairiyah",
photo:"/images/luluk.jpg"
},


date:
"02 Oktober 2026",


story:[

{
year:"2026-03",
title:"First Meet",
description:
"Pertama kali kami bertemu dan mulai mengenal satu sama lain di sebuah acara Silaturahmi Saat Lebaran."
},


{
year:"2026-03",
title:"Relationship",
description:
"Kami mulai mengenal satu sama lain lebih dalam dan membangun hubungan."
},


{
year:"2026-04",
title:"Engagement",
description:
"Perjalanan kami berlanjut menuju komitmen yang lebih serius."
},


{
year:"2026-10",
title:"Wedding",
description:
"Hari bahagia kami untuk memulai kehidupan baru bersama."
}

],

events:[
{
type:"Akad",
date:"02 Oktober 2026",
time:"10.00 WIB",
location:
"Rumah Mempelai Wanita",
address:
"Aengbaja Kenek, Bluto, Sumenep",
maps:
"https://maps.app.goo.gl/3RG8457SNvW9fDgS7"
}


// {
// type:"Resepsi",
// date:"02 Oktober 2026",
// time:"11.00 - 14.00 WIB",
// location:
// "Hotel Grand Melia",
// address:
// "Alamat lengkap lokasi resepsi",
// maps:
// "https://maps.google.com"
// }

] as EventData[],

gallery:[

"/images/gallery/photo1.webp",
"/images/gallery/photo2.webp",
"/images/gallery/photo3.webp",
"/images/gallery/photo4.webp",
"/images/gallery/photo5.webp",
"/images/gallery/photo6.webp",
"/images/gallery/photo7.webp",
"/images/gallery/photo8.webp",
"/images/gallery/photo9.webp",
"/images/gallery/photo10.webp",
"/images/gallery/photo11.webp",
"/images/gallery/photo12.webp"
],

gift:[

{
bank:"Bank Mandiri",
logo:"/images/bank/mandiri.png",
name:"M YAHYA UBAIDILLAH",
account:"1410021825419"
},


{
bank:"Bank Mandiri",
logo:"/images/bank/mandiri.png",
name:"KHOFIFAH MAMLUATUR RISKIYAH",
account:"1400020879285"
}

]


}