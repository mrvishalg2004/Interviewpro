"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  // Request microphone permission immediately on component mount
  useEffect(() => {
    const requestMicrophonePermission = async () => {
      try {
        // Check if the browser supports getUserMedia
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          setPermissionError(false);
        } else {
          setPermissionError(true);
          toast("Your browser doesn't support microphone access");
        }
      } catch (error) {
        console.error("Microphone permission error:", error);
        setPermissionError(true);
        toast("Please allow microphone access to record your answers");
      }
    };

    requestMicrophonePermission();
  }, []);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    crossBrowser: true,
    timeout: 10000,
    speechRecognitionProperties: {
      interimResults: true,
      maxAlternatives: 1
    },
    formatResult: (result) => {
      return result.transcript;
    },
    onError: (error) => {
      console.error("Speech recognition error:", error);
      toast("Speech recognition error. Please try again.");
    }
  });

  useEffect(() => {
    // Only update if there are results and they have changed
    if (results.length > 0) {
      // Build a complete transcript from all results
      const completeTranscript = results.map(result => result?.transcript || "").join(" ");
      setUserAnswer(completeTranscript);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (permissionError) {
      toast("Please allow microphone access in your browser settings and refresh the page");
      return;
    }

    try {
      if (isRecording) {
        stopSpeechToText();
      } else {
        // First ensure we have microphone permission
        try {
          await navigator.mediaDevices.getUserMedia({ audio: true });
          
          // Reset results and user answer before starting a new recording
          setResults([]);
          setUserAnswer("");
          
          // Add a small delay before starting to ensure previous instances are cleaned up
          setTimeout(() => {
            startSpeechToText();
          }, 300);
        } catch (permError) {
          console.error("Microphone permission error:", permError);
          setPermissionError(true);
          toast("Please allow microphone access to record your answers");
        }
      }
    } catch (error) {
      console.error("Speech recognition error:", error);
      toast("There was an error with the speech recognition. Please try again.");
    }
  };

  const UpdateUserAnswer = async () => {
    console.log(userAnswer, "########");
    setLoading(true);
    
    try {
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer:" +
        userAnswer +
        ",Depends on question and user answer for given interview question " +
        " please give use rating for answer and feedback as area of improvement if any" +
        " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field. " +
        "IMPORTANT: Return ONLY valid, properly formatted JSON.";
        
      console.log(
        "🚀 ~ file: RecordAnswerSection.jsx:38 ~ SaveUserAnswer ~ feedbackPrompt:",
        feedbackPrompt
      );
      
      const result = await chatSession.sendMessage(feedbackPrompt);
      const responseText = await result.response.text();
      
      console.log(
        "🚀 ~ file: RecordAnswerSection.jsx:46 ~ SaveUserAnswer ~ result:",
        responseText
      );
      
      // Extract JSON using regex patterns to handle different response formats
      let jsonData;
      try {
        // First try to find JSON within markdown code blocks
        const jsonMatch = responseText.match(/```(?:json)?\s*(\{.*?\})\s*```/s) || 
                          responseText.match(/(\{.*?\})/s);
        
        if (jsonMatch && jsonMatch[1]) {
          // Clean the JSON string before parsing
          const cleanedJson = jsonMatch[1]
            .replace(/[\u201C\u201D]/g, '"')  // Replace curly quotes
            .replace(/\\'/g, "'")             // Handle escaped single quotes
            .replace(/\\"/g, '"')            // Handle escaped double quotes
            .replace(/(\r\n|\n|\r)/gm, " ")  // Remove newlines
            .trim();
            
          jsonData = JSON.parse(cleanedJson);
        } else {
          throw new Error("No valid JSON found in the response");
        }
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        // Fallback to a default structure if parsing fails
        jsonData = {
          rating: "N/A",
          feedback: "There was an error generating feedback. Your answer has been recorded."
        };
      }
      
      console.log(
        "🚀 ~ file: RecordAnswerSection.jsx:47 ~ SaveUserAnswer ~ jsonData:",
        jsonData
      );
      
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: jsonData?.feedback || "Feedback not available",
        rating: jsonData?.rating || "N/A",
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (resp) {
        toast("User Answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error in UpdateUserAnswer:", error);
      toast("There was an error saving your answer. Please try again.");
    } finally {
      setResults([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Clean up function to ensure speech recognition is stopped when component unmounts
    return () => {
      if (isRecording) {
        try {
          stopSpeechToText();
        } catch (error) {
          console.error("Error stopping speech recognition:", error);
        }
      }
    };
  }, []); // Empty dependency array to run only on mount/unmount

  if (error || permissionError) return (
    <div className="p-4 bg-red-100 border border-red-300 rounded">
      <p>Microphone access is required for this feature.</p>
      <Button 
        onClick={() => window.location.reload()} 
        className="mt-2"
        variant="outline"
      >
        Refresh Page
      </Button>
    </div>
  );

  return (
    <div className="flex justify-cente items-center flex-col">
      <div className="flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
          priority
        />
        {/* <Webcam
          style={{ height: 300, width: "100%", zIndex: 10 }}
          mirrored={true}
        /> */}
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 items-center animate-pulse flex gap-2">
            <StopCircle /> Stop Recording...
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
      {/* <Button onClick={() => console.log("------", userAnswer)}>
        Show User Answer
      </Button> */}
    </div>
  );
};

export default RecordAnswerSection;


