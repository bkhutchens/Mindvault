import { useState, useRef } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await transcribeAudio(audioBlob);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone access error:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
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

      if (data.note) {
        setNotes((prevNotes) => [data.note, ...prevNotes]);
      } else {
        console.error("API Error:", data.error);
      }
    } catch (error) {
      console.error("Error sending file:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>MindVault.ai</h1>

      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      {notes.map((note) => (
        <div key={note.id} style={{ padding: "1rem", marginTop: "1rem", backgroundColor: "#f1f1f1", borderRadius: "8px" }}>
          <p><strong>Summary:</strong> {note.summary}</p>
          <p><strong>Tags:</strong> {note.tags.join(", ")}</p>
          <details>
            <summary>View Full Transcription</summary>
            <p>{note.transcription}</p>
          </details>
        </div>
      ))}
    </div>
  );
}
