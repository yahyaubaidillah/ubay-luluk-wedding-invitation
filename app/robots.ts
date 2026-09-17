import { MetadataRoute } from "next"


export default function robots(): MetadataRoute.Robots {

return {

rules:[

{
userAgent:"*",
allow:"/"
},

{
userAgent:"facebookexternalhit",
allow:"/"
},

{
userAgent:"WhatsApp",
allow:"/"
}

],


sitemap:
"https://ubay-luluk-wedding-invitation.vercel.app/sitemap.xml"

}

}