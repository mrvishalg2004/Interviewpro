// "use client"
// import { Lightbulb, Volume2 } from 'lucide-react'
// import React from 'react'

// const QuestionsSection = ({mockInterviewQuestion,activeQuestionIndex}) => {
//   console.log("🚀 ~ file: QuestionsSection.jsx:4 ~ QuestionsSection ~ mockInterviewQuestion:", mockInterviewQuestion);
//   const textToSpeach=(text)=>{
// if('speechSynthesis' in window){
//     const speech = new SpeechSynthesisUtterance(text);
//     window.speechSynthesis.speak(speech)
// }else{
//     alert("Sorry, your browser does not support text to speech")
// }
//   }
//   return mockInterviewQuestion && (
//     <div className='p-5 border rounded-lg my-10'>
//         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
//             {mockInterviewQuestion && mockInterviewQuestion.map((question,index)=>(
//                 <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex == index && 'bg-blue-600 text-white'}`}>Question #{index+1}</h2>
//             ))}
//         </div>
//             <h2 className='my-5 text-md md:text-lg'>
//                 {mockInterviewQuestion[activeQuestionIndex]?.question}
//             </h2>
//             <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
//             <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
//                 <h2 className='flex gap-2 items-center text-primary'>
//                     <Lightbulb/>
//                     <strong>Note:</strong>
//                 </h2>
//                 <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
//             </div>
//     </div>
//   )
// }

// export default QuestionsSection
//end


"use client"
import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeach = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech");
    }
  };

  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer transition-colors duration-300 ${
              activeQuestionIndex === index && 'bg-blue-600 text-white'
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {/* Rounded background for the active question */}
      <div className='relative my-5 p-5 bg-blue-50 rounded-lg shadow-md'>
        <h2 className='text-md md:text-lg font-medium text-gray-800'>
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className='absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700'
          onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}
        />
      </div>

      {/* Note Section */}
      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-primary'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  );
};

export default QuestionsSection;



