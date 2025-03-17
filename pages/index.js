import { useState, useEffect, useRef } from "react";
import EditNoteModal from "../components/EditNoteModal";

export default function Home() {
  const approvedTags = [
    "Project", "Notes", "Reminder", "Idea", "Task",
    "Meeting", "Question", "Personal", "Work", "List", "Event"
  ];

  const [notes, setNotes] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    const parsedNotes = data.notes.map(note => ({
      ...note,
      tags: note.tags.split(",")
    }));
    setNotes(parsedNotes);
  };

  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await transcribeAudio(audioBlob);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (e) { console.error(e); }
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
  
    if (data.note) {
      if (typeof data.note.tags === 'string') {
        data.note.tags = data.note.tags.split(",");
      }
      setNotes((prev) => [data.note, ...prev]);
    } else {
      alert(`Error in transcription: ${data.error}`);
    }
  };
  

  const deleteNote = async (id) => {
    await fetch("/api/deleteNote", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setNotes(notes.filter(n => n.id !== id));
  };


  const handleSave = async (id, summary, tags) => {
    const res = await fetch("/api/editNote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, summary, tags }),
    });
    const data = await res.json();
    
    if (data.note) {
      // Safely handle tags clearly
      if (typeof data.note.tags === "string") {
        data.note.tags = data.note.tags.split(",").map(tag => tag.trim());
      }
      setNotes(notes.map(n => (n.id === id ? data.note : n)));
      setEditingNote(null);
    } else {
      alert("Error updating note!");
    }
  };
  

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">MindVault.ai</h1>
      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      {notes.map(note => (
        <div key={note.id} className="p-3 my-2 bg-gray-200 rounded">
          <h3>{note.summary}</h3>
          <small>{note.tags.join(", ")}</small>
          <details>
            <summary>Full transcription</summary>
            <p>{note.transcription}</p>
          </details>
          <button onClick={() => setEditingNote(note)} className="mr-2">Edit</button>
          <button onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      ))}

      {editingNote && (
        <EditNoteModal
          note={editingNote}
          approvedTags={approvedTags}
          onSave={handleSave}
          onClose={() => setEditingNote(null)}
        />
      )}
    </div>
  );
}
