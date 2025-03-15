import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [notes, setNotes] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    const response = await fetch("/api/notes");
    const data = await response.json();
    setNotes(data.notes);
  };

  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => audioChunksRef.current.push(event.data);
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await transcribeAudio(audioBlob);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone error:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const transcribeAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "audio.webm");
    const response = await fetch("/api/transcribe", { method: "POST", body: formData });
    const data = await response.json();
    if (data.note) setNotes((prev) => [data.note, ...prev]);
  };

  const deleteNote = async (id) => {
    await fetch("/api/deleteNote", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    setNotes((prev) => prev.filter(note => note.id !== id));
  };

  const editNote = async (id) => {
    const newSummary = prompt("Edit summary:");
    const newTags = prompt("Edit tags (comma-separated):");
    if (!newSummary || !newTags) return;

    const tagsArray = newTags.split(",").map(tag => tag.trim());

    const response = await fetch("/api/editNote", {
      method: "PUT",
      body: JSON.stringify({ id, summary: newSummary, tags: tagsArray }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.note) {
      setNotes(prev => prev.map(note => note.id === id ? data.note : note));
    } else {
      alert("Failed to edit note.");
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
        <div key={note.id} style={{ borderBottom: "1px solid #ccc", padding: "1rem" }}>
          <h3>{note.summary}</h3>
          <small>{Array.isArray(note.tags) ? note.tags.join(", ") : note.tags}</small>
          <br />

          <details style={{ marginTop: "0.5rem" }}>
            <summary>View Transcription</summary>
            <p>{note.transcription}</p>
          </details>

          <button style={{ marginTop: "0.5rem" }} onClick={() => editNote(note.id)}>Edit Note</button>
          <button style={{ marginTop: "0.5rem", marginLeft: "1rem" }} onClick={() => deleteNote(note.id)}>Delete Note</button>
        </div>
      ))}
    </div>
  );
}
