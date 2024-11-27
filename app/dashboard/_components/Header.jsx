// "use client"
// import { UserButton } from '@clerk/nextjs'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

// export const Header = () => {
//     const path=usePathname()
//     useEffect(()=>{
//         console.log(path);
//     })
//   return (
//     <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
//         {/* <Image src={'/logo.png'} alt='logo' width={200} height={200}  style={{ width: "auto", height: "auto" }}   /> */
//         <Image src={'/logo.png'} alt='logo' width={400} height={400} />
// }
//         <ul className='hidden md:flex gap-6'>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
//             <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how' && 'text-primary font-bold'}`}>How its works?</li>
//         </ul>
//         <UserButton/>
//     </div>
//   )
// }

// "use client"
// import { UserButton } from '@clerk/nextjs'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation'
// import React, { useEffect } from 'react'

// export const Header = () => {
//     const path = usePathname()
//     useEffect(() => {
//         console.log(path);
//     })
    
//     return (
//         <div className='flex p-4 items-center justify-between bg-secondary shadow-sm h-20'> {/* Adjusted height here */}
//             <Image src={'/logo.png'} alt='logo' width={400} height={400} />
//             <ul className='hidden md:flex gap-6'>
//                 <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
//                 <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/questionpage' && 'text-primary font-bold'}`}>Questions</li>
//                 <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dahboard/planData' && 'text-primary font-bold'}`}>Upgrade</li>
//                 <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-primary font-bold'}`}>How it works?</li>
//             </ul>
//             <UserButton />
//         </div>
//     )
// }

"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

export const Header = () => {
    const path = usePathname()
    useEffect(() => {
        console.log(path);
    })
    
    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm h-20'> {/* Adjusted height here */}
            <Image src={'/logo.png'} alt='logo' width={400} height={400} />
            <ul className='hidden md:flex gap-6'>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/questionpage' && 'text-primary font-bold'}`}>
                    <Link href="/questionpage">Frequently Ask Questions</Link>
                </li>
                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/planData' && 'text-primary font-bold'}`}>
                <Link href="/planData">How it works?</Link></li>
                {/* <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path == '/dashboard/how' && 'text-primary font-bold'}`}>How it works?</li>  */}
            </ul>
            <UserButton />
        </div>
    )
}