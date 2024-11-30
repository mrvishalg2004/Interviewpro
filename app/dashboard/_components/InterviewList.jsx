// "use client";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import { desc, eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import InterviewItemCard from "./InterviewItemCard"

// const InterviewList = () => {
//   const { user } = useUser();
//   const [InterviewList, setInterviewList] = useState([]);
//   useEffect(() => {
//     user && GetInterviewList();
//   }, [user]);
//   const GetInterviewList = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(
//         eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
//       )
//       .orderBy(desc(MockInterview.id));

//     console.log(
//       "🚀 ~ file: InterviewList.jsx:14 ~ GetInterviewList ~ GetInterviewList:",
//       GetInterviewList
//     );
//     setInterviewList(result)
//   };
//   return (
//     <div>
//       <h2 className="font-medium text-xl">Previous Mock Interview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
//         {InterviewList&&InterviewList.map((interview,index)=>(
//             <InterviewItemCard interview={interview} key={index}/>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InterviewList;

//end


"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { SpeedInsights } from "@vercel/speed-insights/next";

const InterviewList = () => {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) {
      setLoading(true);
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));

    setInterviewList(result);
    setLoading(false);
  };

  // Group interviews by jobPosition
  const groupedInterviews = InterviewList.reduce((acc, interview) => {
    const { jobPosition } = interview;
    if (!acc[jobPosition]) {
      acc[jobPosition] = [];
    }
    acc[jobPosition].push(interview);
    return acc;
  }, {});

  // Filter interviews based on search term
  const filteredInterviews = Object.keys(groupedInterviews).filter((jobPosition) =>
    jobPosition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5">
      {/* Updated heading with larger font size */}
      <h2 className="font-bold text-3xl text-center">
        Previous Mock Interviews
      </h2>

      {/* Search Bar */}
      <div className="my-4 text-center">
        <input
          type="text"
          placeholder="Search by job position..."
          className="p-2 border rounded-md w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center my-10">
          <div className="loader">Wait the data is fetching....!!</div>
        </div>
      ) : (
        <div className="my-3">
          {filteredInterviews.length === 0 ? (
            <p>No interviews found for this search term.</p>
          ) : (
            filteredInterviews.map((jobPosition, index) => (
              <div key={index}>
                <div className="flex items-center justify-between my-3">
                  <h3 className="font-medium text-2xl text-blue-1500">{jobPosition}</h3>
                </div>
                {/* Always visible interviews */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {groupedInterviews[jobPosition].map((interview, index) => (
                    <InterviewItemCard interview={interview} key={index} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default InterviewList;

// "use client";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { useUser } from "@clerk/nextjs";
// import { desc, eq } from "drizzle-orm";
// import React, { useEffect, useState } from "react";
// import InterviewItemCard from "./InterviewItemCard";

// // Import icons for v2
// import { AcademicCapIcon, BriefcaseIcon } from "@heroicons/react"; // Updated import path

// const InterviewList = () => {
//   const { user } = useUser();
//   const [InterviewList, setInterviewList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     if (user) {
//       setLoading(true);
//       GetInterviewList();
//     }
//   }, [user]);

//   const GetInterviewList = async () => {
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
//       .orderBy(desc(MockInterview.id));

//     setInterviewList(result);
//     setLoading(false);
//   };

//   // Group interviews by jobPosition
//   const groupedInterviews = InterviewList.reduce((acc, interview) => {
//     const { jobPosition } = interview;
//     if (!acc[jobPosition]) {
//       acc[jobPosition] = [];
//     }
//     acc[jobPosition].push(interview);
//     return acc;
//   }, {});

//   // Filter interviews based on search term
//   const filteredInterviews = Object.keys(groupedInterviews).filter((jobPosition) =>
//     jobPosition.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Determine which icon to show based on role
//   const getIconForRole = (role) => {
//     if (role === "interviewer") {
//       return <BriefcaseIcon className="w-6 h-6 text-blue-500" />;
//     } else if (role === "candidate") {
//       return <AcademicCapIcon className="w-6 h-6 text-green-500" />;
//     } else {
//       return null;
//     }
//   };

//   return (
//     <div className="p-5">
//       {/* Updated heading with larger font size */}
//       <h2 className="font-bold text-3xl text-center">
//         Previous Mock Interviews
//       </h2>

//       {/* Search Bar */}
//       <div className="my-4 text-center">
//         <input
//           type="text"
//           placeholder="Search by job position..."
//           className="p-2 border rounded-md w-1/2"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Loading State */}
//       {loading ? (
//         <div className="text-center my-10">
//           <div className="loader">Loading...</div>
//         </div>
//       ) : (
//         <div className="my-3">
//           {filteredInterviews.length === 0 ? (
//             <p>No interviews found for this search term.</p>
//           ) : (
//             filteredInterviews.map((jobPosition, index) => (
//               <div key={index}>
//                 <div className="flex items-center justify-between my-3">
//                   <div className="flex items-center">
//                     {/* Display the role-based icon */}
//                     {getIconForRole(user?.role)} 
//                     <h3 className="font-medium text-2xl text-blue-500 ml-2">
//                       {jobPosition}
//                     </h3>
//                   </div>
//                 </div>
//                 {/* Always visible interviews */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//                   {groupedInterviews[jobPosition].map((interview, index) => (
//                     <InterviewItemCard interview={interview} key={index} />
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterviewList;
