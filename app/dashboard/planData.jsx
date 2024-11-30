// import React from "react";

// const PricingPlans = () => {
//   const plans = [
//     {
//       name: "Basic", 
//       price: "Free",
//       features: [
//         "Access to basic features",
//         "1 user account",
//         "Community support",
//       ],
//       buttonLabel: "Get Started",
//       buttonVariant: "bg-blue-500 hover:bg-blue-600 text-white",
//     },
//     {
//       name: "Pro",
//       price: "$29/month",
//       features: [
//         "Everything in Basic",
//         "5 user accounts",
//         "Priority email support",
//         "Customizable options",
//       ],
//       buttonLabel: "Choose Pro",
//       buttonVariant: "bg-green-500 hover:bg-green-600 text-white",
//     },
//     {
//       name: "Enterprise",
//       price: "$99/month",
//       features: [
//         "Everything in Pro",
//         "Unlimited user accounts",
//         "Dedicated support manager",
//         "Advanced analytics",
//       ],
//       buttonLabel: "Contact Sales",
//       buttonVariant: "bg-purple-500 hover:bg-purple-600 text-white",
//     },
//   ];

//   return (
//     <div className="bg-gray-100 py-12">
//       <div className="max-w-6xl mx-auto px-4">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//           Pricing and Plans
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {plans.map((plan, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
//             >
//               <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>
//               <p className="text-4xl font-bold text-gray-700 my-4">
//                 {plan.price}
//               </p>
//               <ul className="text-gray-600 mb-6 space-y-3">
//                 {plan.features.map((feature, idx) => (
//                   <li key={idx} className="flex items-center gap-2">
//                     <span className="text-green-500 font-bold">✔</span>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//               <button
//                 className={`py-2 px-6 rounded-lg font-medium ${plan.buttonVariant}`}
//               >
//                 {plan.buttonLabel}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PricingPlans;
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="font-bold text-4xl">Buy now....👩‍💻</h2>
      <h2 className="text-gray-6000">Buy noww</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview/>
      </div>
      {/* previous interview questions */}
      <InterviewList/>
    </div>
  );
};

export default Dashboard;
