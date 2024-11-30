// import { Inter } from "next/font/google";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import { Toaster } from "@/components/ui/sonner";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Interview Pro",
//   description: "Develope by PV software solution",
// };

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body className={inter.className}>
//           <Toaster />
//           {children}
//         </body>
//       </html>
//     </ClerkProvider>
//   );
// }



import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next"; // Import SpeedInsights

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Interview Pro",
  description: "Developed by PV software solution",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          {children}
          {/* Add the SpeedInsights component to the layout */}
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
