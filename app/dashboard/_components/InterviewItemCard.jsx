// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import React from "react";

// const InterviewItemCard = ({ interview }) => {
//     const router = useRouter()
//     const onStart=()=>{
//         router.push('/dashboard/interview/'+interview?.mockId)
//     }
//     const onFeedbackPress=()=>{
//         router.push('dashboard/interview/'+interview.mockId+"/feedback")
//     }
//   return (
//     <div className="border shadow-sm rounded-sm p-3">
//       <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
//       <h2 className="text-sm text-gray-500">{interview?.jobExperience}</h2>
//       <h2 className="text-xs text-gray-400">
//         Created At: {interview?.createdAt}
//       </h2>
//       <div className="flex justify-between gap-5 mt-2">
//         <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress} >
//           Feedback
//         </Button>
//         <Button className="w-full" size="sm" onClick={onStart}>Start</Button>
//       </div>
//     </div>
//   );
// };

// export default InterviewItemCard;
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
    const router = useRouter();
    const onStart = () => {
        router.push('/dashboard/interview/' + interview?.mockId);
    };
    const onFeedbackPress = () => {
        router.push('dashboard/interview/' + interview.mockId + "/feedback");
    };
    return (
        <div 
            className="border shadow-sm rounded-md p-4" 
            style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
        >
            <h2 className="font-bold text-gray-800">{interview?.jobPosition}</h2>
            <h2 className="text-sm text-gray-600">{interview?.jobExperience}</h2>
            <h2 className="text-xs text-gray-500">
                Created At: {interview?.createdAt}
            </h2>
            <div className="flex justify-between gap-4 mt-4">
                {/* Feedback Button */}
                <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                    onClick={onFeedbackPress}
                >
                    Feedback
                </Button>
                {/* Start Button */}
                <Button 
                    className="w-full bg-teal-500 text-white hover:bg-teal-600 transition-all duration-300 font-medium shadow-sm hover:shadow-md" 
                    size="sm" 
                    onClick={onStart}
                >
                    Start
                </Button>
            </div>
        </div>
    );
};

export default InterviewItemCard;
