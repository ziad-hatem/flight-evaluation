(()=>{var e={};e.id=977,e.ids=[977],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},21556:(e,s,a)=>{Promise.resolve().then(a.bind(a,43839))},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},43839:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>t});let t=(0,a(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/ziadhatem/task/flight-evaluation/src/app/contact/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/ziadhatem/task/flight-evaluation/src/app/contact/page.tsx","default")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},70440:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>r});var t=a(31658);let r=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,t.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},74292:(e,s,a)=>{Promise.resolve().then(a.bind(a,81581))},79551:e=>{"use strict";e.exports=require("url")},81581:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>i});var t=a(60687),r=a(43210);function i(){let[e,s]=(0,r.useState)({name:"",email:"",subject:"",message:""}),[a,i]=(0,r.useState)(!1),[n,l]=(0,r.useState)(!1),[d,o]=(0,r.useState)(null),c=e=>{let{name:a,value:t}=e.target;s(e=>({...e,[a]:t}))},m=async e=>{e.preventDefault(),i(!0),o(null),l(!1);try{await new Promise(e=>setTimeout(e,1e3)),s({name:"",email:"",subject:"",message:""}),l(!0)}catch(e){o("Failed to send message. Please try again later."),console.error("Contact form error:",e)}finally{i(!1)}};return(0,t.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,t.jsx)("h1",{className:"text-3xl font-bold mb-6",children:"Contact Us"}),(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8 mb-8",children:[(0,t.jsx)("div",{className:"md:col-span-2",children:(0,t.jsx)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",children:n?(0,t.jsxs)("div",{className:"text-center py-8",children:[(0,t.jsx)("div",{className:"text-green-500 text-5xl mb-4",children:"✓"}),(0,t.jsx)("h2",{className:"text-2xl font-bold mb-2",children:"Message Sent!"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400 mb-6",children:"Thank you for reaching out. We'll get back to you as soon as possible."}),(0,t.jsx)("button",{onClick:()=>l(!1),className:"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors",children:"Send Another Message"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Send Us a Message"}),d&&(0,t.jsx)("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4",role:"alert",children:(0,t.jsx)("span",{className:"block sm:inline",children:d})}),(0,t.jsxs)("form",{onSubmit:m,className:"space-y-4",children:[(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"name",className:"block text-sm font-medium mb-1",children:"Your Name"}),(0,t.jsx)("input",{id:"name",name:"name",type:"text",required:!0,value:e.name,onChange:c,className:"w-full p-2 border rounded-md",placeholder:"John Doe"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium mb-1",children:"Your Email"}),(0,t.jsx)("input",{id:"email",name:"email",type:"email",required:!0,value:e.email,onChange:c,className:"w-full p-2 border rounded-md",placeholder:"john@example.com"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"subject",className:"block text-sm font-medium mb-1",children:"Subject"}),(0,t.jsxs)("select",{id:"subject",name:"subject",required:!0,value:e.subject,onChange:c,className:"w-full p-2 border rounded-md",children:[(0,t.jsx)("option",{value:"",children:"Select a subject"}),(0,t.jsx)("option",{value:"general",children:"General Inquiry"}),(0,t.jsx)("option",{value:"support",children:"Customer Support"}),(0,t.jsx)("option",{value:"feedback",children:"Feedback"}),(0,t.jsx)("option",{value:"partnership",children:"Partnership Opportunities"}),(0,t.jsx)("option",{value:"other",children:"Other"})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"message",className:"block text-sm font-medium mb-1",children:"Message"}),(0,t.jsx)("textarea",{id:"message",name:"message",rows:5,required:!0,value:e.message,onChange:c,className:"w-full p-2 border rounded-md",placeholder:"Your message here..."})]}),(0,t.jsx)("div",{children:(0,t.jsx)("button",{type:"submit",disabled:a,className:"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",children:a?"Sending...":"Send Message"})})]})]})})}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Contact Information"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-medium",children:"Email"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"support@flightevaluation.com"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-medium",children:"Phone"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"+1 (555) 123-4567"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-medium",children:"Address"}),(0,t.jsxs)("p",{className:"text-gray-600 dark:text-gray-400",children:["123 Aviation Way",(0,t.jsx)("br",{}),"San Francisco, CA 94105",(0,t.jsx)("br",{}),"United States"]})]})]})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Business Hours"}),(0,t.jsxs)("ul",{className:"space-y-2",children:[(0,t.jsxs)("li",{className:"flex justify-between",children:[(0,t.jsx)("span",{children:"Monday - Friday:"}),(0,t.jsx)("span",{children:"9:00 AM - 6:00 PM"})]}),(0,t.jsxs)("li",{className:"flex justify-between",children:[(0,t.jsx)("span",{children:"Saturday:"}),(0,t.jsx)("span",{children:"10:00 AM - 4:00 PM"})]}),(0,t.jsxs)("li",{className:"flex justify-between",children:[(0,t.jsx)("span",{children:"Sunday:"}),(0,t.jsx)("span",{children:"Closed"})]})]})]})]})]}),(0,t.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",children:[(0,t.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Frequently Asked Questions"}),(0,t.jsxs)("div",{className:"space-y-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-medium",children:"How do I create an account?"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:'You can create an account by clicking on the "Sign Up" button in the top right corner of the page. Fill in your details and you\'re ready to go!'})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-medium",children:"How do I submit a flight review?"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:'First, search for your flight in the Flights section. Once you find your flight, click on "View Details" and then "Write a Review" to share your experience.'})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-medium",children:"Can I edit my review after submitting it?"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"Yes, you can edit your reviews by going to your profile page and finding the review in your activity section."})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"font-medium",children:"How are the ratings calculated?"}),(0,t.jsx)("p",{className:"text-gray-600 dark:text-gray-400",children:"Overall ratings are calculated as a weighted average of all individual category ratings submitted by users."})]})]})]})]})}},85706:(e,s,a)=>{"use strict";a.r(s),a.d(s,{GlobalError:()=>n.a,__next_app__:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>o});var t=a(65239),r=a(48088),i=a(88170),n=a.n(i),l=a(30893),d={};for(let e in l)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>l[e]);a.d(s,d);let o={children:["",{children:["contact",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,43839)),"/Users/ziadhatem/task/flight-evaluation/src/app/contact/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,94431)),"/Users/ziadhatem/task/flight-evaluation/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(a.t.bind(a,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(a.t.bind(a,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,c=["/Users/ziadhatem/task/flight-evaluation/src/app/contact/page.tsx"],m={require:a,loadChunk:()=>Promise.resolve()},u=new t.AppPageRouteModule({definition:{kind:r.RouteKind.APP_PAGE,page:"/contact/page",pathname:"/contact",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})}};var s=require("../../webpack-runtime.js");s.C(e);var a=e=>s(s.s=e),t=s.X(0,[243,427,658,383],()=>a(85706));module.exports=t})();