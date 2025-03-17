// pages/index.js
import { useState, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    audioChunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      await transcribeAudio(audioBlob);
    };
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const transcribeAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");
    await fetch("/api/transcribe", { method: "POST", body: formData });
  };

  return (
    <div className="p-4 text-center">
      <div className="flex justify-start">
        <Link href="/notes">
          <button className="p-2 text-2xl">☰</button> {/* hamburger menu */}
        </Link>
      </div>

      <h1 className="text-3xl font-bold mt-4">MindVault.ai</h1>
      
      {!isRecording ? (
        <button className="mt-10 py-3 px-6 bg-blue-500 text-white rounded-lg" onClick={startRecording}>
          Start Recording
        </button>
      ) : (
        <button className="mt-10 py-3 px-6 bg-red-500 text-white rounded-lg" onClick={stopRecording}>
          Stop Recording
        </button>
      )}
    </div>
  );
}
