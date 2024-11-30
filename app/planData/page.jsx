"use client";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const HowItWorksPage = () => {
  const steps = [
    {
      title: "Step 1: Create an Account",
      description:
        "Sign up on our platform to access the interview preparation features. You can use your email or log in with your preferred authentication provider.",
      icon: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png", // Account icon
    },
    {
      title: "Step 2: Set Up an Interview",
      description:
        "Navigate to the dashboard and click on 'Create Interview.' Fill out details like the job role, required skills, and experience level.",
      icon: "https://cdn-icons-png.flaticon.com/512/3649/3649475.png", // Setup icon
    },
    {
      title: "Step 3: Start the Interview",
      description:
        "Click 'Start Interview' to begin. The system will generate personalized questions tailored to the job role and skills you specified.",
      icon: "https://cdn-icons-png.flaticon.com/512/1057/1057223.png", // Start icon
    },
    {
      title: "Step 4: Answer Questions",
      description:
        "Respond to the AI-generated questions verbally. Your answers will be recorded and analyzed for feedback.",
      icon: "https://cdn-icons-png.flaticon.com/512/833/833524.png", // Mic icon
    },
    {
      title: "Step 5: Receive Feedback",
      description:
        "After completing the interview, receive detailed AI-generated feedback to help you improve your performance.",
      icon: "https://cdn-icons-png.flaticon.com/512/2907/2907253.png", // Feedback icon
    },
    {
      title: "Step 6: Review and Track Progress",
      description:
        "Access all past interviews and feedback through your dashboard to track your improvement over time.",
      icon: "https://cdn-icons-png.flaticon.com/512/1106/1106868.png", // Review icon
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center py-10 px-4"
      style={{
        backgroundImage: "url('/1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-8 bg-white bg-opacity-80 px-4 py-2 rounded-lg">
        How It Works
      </h1>
      <div className="w-full max-w-4xl bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative mb-6 flex items-center group cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-2 hover:border-blue-500 rounded-lg p-4"
          >
            <img
              src={step.icon}
              alt={step.title}
              className="w-16 h-16 mr-4 bg-gray-200 rounded-full shadow-md"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksPage;
