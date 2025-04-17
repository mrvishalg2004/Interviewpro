"use client";
import React, { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format:
  {
    "question": "Your question here",
    "answer": "Your answer here"
  }
  Make sure all quotes in the JSON are properly escaped and all strings are properly terminated.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      console.log("🚀 ~ file: AddNewInterview.jsx:41 ~ onSubmit ~ responseText:", responseText)
      
      // Look for JSON array in the response using a more robust approach
      let jsonData;
      try {
        // Try to find JSON within markdown code blocks if present
        const jsonMatch = responseText.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/) || 
                          responseText.match(/(\[[\s\S]*?\])/);
                          
        if (jsonMatch && jsonMatch[1]) {
          // Clean the JSON string before parsing
          const cleanedJson = jsonMatch[1]
            .replace(/[\u201C\u201D]/g, '"') // Replace curly quotes
            .replace(/\\'/g, "'")            // Handle escaped single quotes
            .replace(/\\"/g, '"')            // Handle escaped double quotes
            .trim();
            
          jsonData = JSON.parse(cleanedJson);
        } else {
          throw new Error("No valid JSON array found in the response");
        }
      } catch (jsonError) {
        console.error("Error parsing JSON:", jsonError);
        
        // Fallback: Try to create a basic structure from the text response
        if (!jsonData) {
          // Generate a default set of questions as a fallback
          jsonData = [
            { 
              question: "There was an error generating questions. Here's a default question about " + jobPosition,
              answer: "Please describe your experience with " + jobPosition
            }
          ];
        }
      }
      
      console.log("🚀 ~ file: AddNewInterview.jsx:45 ~ onSubmit ~ jsonData:", jsonData);
      setJsonResponse(jsonData);
      
      const jsonString = JSON.stringify(jsonData);
      const res = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: jsonString,
          jobPosition: jobPosition,
          jobDesc: jobDescription, 
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-YYYY'),
        }).returning({ mockId: MockInterview.mockId });
        
      setLoading(false);
      router.push(`/dashboard/interview/${res[0]?.mockId}`);
    } catch (error) {
      console.error("Error fetching interview questions:", error);
      setLoading(false);
      alert("There was an error generating the interview questions. Please try again.");
    }
  }; 

  return (
<div
  className="relative p-10 border-2 border-transparent rounded-xl bg-gradient-to-r from-blue-100 via-blue-400 to-blue-500 bg-clip-padding text-white shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_15px_25px_rgba(0,0,0,0.4)] cursor-pointer transition-all duration-500 ease-out"
  onClick={() => setOpenDialog(true)}
>
  {/* Dark Blur Background */}
  <div className="absolute inset-0 -z-10 blur-2xl opacity-20 bg-gradient-to-r from-blue-800 to-gray-900 rounded-2xl"></div>

  {/* Content Area */} 
  <div className="relative text-center">
    <h3 className="text-2xl font-bold text-white">Create New +</h3>
  </div>

       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
            Tell us about your interview process
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={onSubmit}>
              <div>
                <p>
                Share details about your position, role expectations, and work experience duration.
                </p>
                <div className="mt-7 my-3">
                  <label>Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. BackEnd Developer"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div> 
                <div className="my-3">
                  <label>Position Overview/Technical Skills (In short)</label>
                  <Textarea
                    placeholder="Ex. Java, Nodejs, Python, MySql etc"
                    required
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Years of Experience</label>
                  <Input
                    placeholder="Ex. 4"
                    type="number"
                    min="0"
                    max="70"
                    required
                    onChange={(e) => setJobExperience(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-5 justify-end">
                <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Generating from Artificial Intelligence..!!
                    </>
                  ) : (
                    'Start Interview...!!!!'
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
      

    </div>
  );
}

export default AddNewInterview;
//end
