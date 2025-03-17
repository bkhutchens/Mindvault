// pages/notes.js
import { useState, useEffect } from "react";
import Link from "next/link";
import EditNoteModal from "../components/EditNoteModal";

export default function Notes() {
  const approvedTags = ["Project","Notes","Reminder","Idea","Task","Meeting","Question","Personal","Work","List","Event"];
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    data.notes.forEach(note => note.tags = typeof note.tags === 'string' ? note.tags.split(",") : note.tags);
    setNotes(data.notes);
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
      data.note.tags = typeof data.note.tags === 'string' ? data.note.tags.split(",") : data.note.tags;
      setNotes(notes.map(n => (n.id === id ? data.note : n)));
      setEditingNote(null);
    } else {
      alert("Error updating note!");
    }
  };

  return (
    <div className="p-4">
      <Link href="/">
        <button className="mb-4">← Back to Record</button>
      </Link>

      <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
      
      {notes.map(note => (
        <div key={note.id} className="p-3 my-2 bg-gray-200 rounded">
          <h3 className="font-semibold">{note.summary}</h3>
          <small className="text-gray-600">{note.tags.join(", ")}</small>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">Full transcription</summary>
            <p className="mt-2">{note.transcription}</p>
          </details>
          <button className="mr-2 mt-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={() => setEditingNote(note)}>
            Edit
          </button>
          <button className="mt-2 px-3 py-1 bg-red-500 text-white rounded" onClick={() => deleteNote(note.id)}>
            Delete
          </button>
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
