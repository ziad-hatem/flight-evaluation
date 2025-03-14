(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[167],{877:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>n});var s=a(5155),r=a(2115),i=a(5695),l=a(6874),c=a.n(l);function n(){let e=(0,i.useRouter)(),[t,a]=(0,r.useState)([]),[l,n]=(0,r.useState)(!0),[d,o]=(0,r.useState)(null),[x,h]=(0,r.useState)(null);(0,r.useEffect)(()=>{(async()=>{try{var t;let a=await fetch("/api/auth/session"),s=await a.json();h(s),(null==s?void 0:null===(t=s.user)||void 0===t?void 0:t.id)?m(s.user.id):e.push("/login?callbackUrl=/my-rates")}catch(e){console.error("Failed to fetch session:",e),o("Failed to authenticate. Please try again."),n(!1)}})()},[e]);let m=async e=>{try{n(!0);let t=await fetch("/api/ratings?userId=".concat(e));if(!t.ok)throw Error("Failed to fetch ratings");let s=await t.json();a(s)}catch(e){o(e instanceof Error?e.message:"An error occurred"),console.error("Ratings fetch error:",e)}finally{n(!1)}},u=e=>new Date(e).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric"}),p=e=>e>=4?"text-green-600":e>=3?"text-yellow-600":"text-red-600";return l?(0,s.jsxs)("div",{className:"container mx-auto px-4 py-8 text-center",children:[(0,s.jsx)("div",{className:"inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"}),(0,s.jsx)("p",{className:"mt-2",children:"Loading your ratings..."})]}):d?(0,s.jsx)("div",{className:"container mx-auto px-4 py-8",children:(0,s.jsx)("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",role:"alert",children:(0,s.jsx)("span",{className:"block sm:inline",children:d})})}):(0,s.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,s.jsx)("h1",{className:"text-3xl font-bold mb-6",children:"My Flight Ratings"}),0===t.length?(0,s.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center",children:[(0,s.jsx)("p",{className:"text-gray-600 dark:text-gray-400 mb-4",children:"You haven't rated any flights yet."}),(0,s.jsx)(c(),{href:"/flights",className:"bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors",children:"Browse Flights to Rate"})]}):(0,s.jsxs)("div",{className:"bg-white dark:bg-gray-800 rounded-lg shadow-md p-6",children:[(0,s.jsxs)("h2",{className:"text-xl font-semibold mb-4",children:["Your Ratings (",t.length,")"]}),(0,s.jsx)("div",{className:"overflow-x-auto",children:(0,s.jsxs)("table",{className:"min-w-full divide-y divide-gray-200",children:[(0,s.jsx)("thead",{className:"bg-gray-50 dark:bg-gray-700",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Flight"}),(0,s.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Airline"}),(0,s.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Route"}),(0,s.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Rating"}),(0,s.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Date"}),(0,s.jsx)("th",{scope:"col",className:"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider",children:"Actions"})]})}),(0,s.jsx)("tbody",{className:"bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700",children:t.map(e=>(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm font-medium",children:e.flight.flightNumber})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm",children:e.flight.airline.name})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsxs)("div",{className:"text-sm",children:[e.flight.origin," → ",e.flight.destination]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsxs)("div",{className:"text-sm font-bold ".concat(p(e.overallRating)),children:[e.overallRating.toFixed(1),"/5"]})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap",children:(0,s.jsx)("div",{className:"text-sm text-gray-500 dark:text-gray-400",children:u(e.createdAt)})}),(0,s.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm",children:(0,s.jsx)(c(),{href:"/flights/".concat(e.flightId),className:"text-blue-600 hover:underline",children:"View Flight"})})]},e.id))})]})})]}),(0,s.jsx)("div",{className:"mt-8",children:(0,s.jsx)(c(),{href:"/profile",className:"text-blue-600 hover:underline",children:"← Back to Profile"})})]})}},5695:(e,t,a)=>{"use strict";var s=a(8999);a.o(s,"useParams")&&a.d(t,{useParams:function(){return s.useParams}}),a.o(s,"useRouter")&&a.d(t,{useRouter:function(){return s.useRouter}}),a.o(s,"useSearchParams")&&a.d(t,{useSearchParams:function(){return s.useSearchParams}})},8900:(e,t,a)=>{Promise.resolve().then(a.bind(a,877))}},e=>{var t=t=>e(e.s=t);e.O(0,[874,441,684,358],()=>t(8900)),_N_E=e.O()}]);