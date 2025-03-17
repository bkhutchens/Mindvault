// pages/index.js
import { useState, useRef } from "react";
import Link from "next/link";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) =>
        audioChunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await transcribeAudio(audioBlob);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");
    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("Transcription response:", data);
      // You might show a notification or update state if desired.
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  };

  return (
    <div className="p-4 text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Navigation bar */}
      <div className="flex justify-between items-center">
        <Link href="/notes">
          <button className="p-2 text-2xl">☰</button>
        </Link>
        <ThemeToggle />
      </div>
      <h1 className="text-3xl font-bold mt-4">MindVault.ai</h1>
      <div className="mt-10">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="py-3 px-6 bg-blue-500 text-white rounded-lg"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="py-3 px-6 bg-red-500 text-white rounded-lg"
          >
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
}
