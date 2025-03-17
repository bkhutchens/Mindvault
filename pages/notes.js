// pages/notes.js
import { useState, useEffect } from "react";
import Link from "next/link";
import EditNoteModal from "../components/EditNoteModal";
import ThemeToggle from "../components/ThemeToggle";
import { useSession, signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function Notes() {
  const approvedTags = [
    "Project",
    "Notes",
    "Reminder",
    "Idea",
    "Task",
    "Meeting",
    "Question",
    "Personal",
    "Work",
    "List",
    "Event",
  ];

  const { data: session, status } = useSession();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (!data.notes) {
        console.error("API did not return notes:", data);
        return; // Or handle the error appropriately
      }
      const parsedNotes = data.notes.map((note) => ({
        ...note,
        tags:
          typeof note.tags === "string"
            ? note.tags.split(",").map((tag) => tag.trim())
            : note.tags,
      }));
      setNotes(parsedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };
  

  const deleteNote = async (id) => {
    await fetch("/api/deleteNote", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleSave = async (id, summary, tags) => {
    const res = await fetch("/api/editNote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, summary, tags }),
    });
    const data = await res.json();
    if (data.note) {
      const updatedNote = {
        ...data.note,
        tags:
          typeof data.note.tags === "string"
            ? data.note.tags.split(",").map((tag) => tag.trim())
            : data.note.tags,
      };
      setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
      setEditingNote(null);
    } else {
      alert("Error updating note!");
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    return (
      <div className="p-4 text-center">
        <p>You must be signed in to view your notes.</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <Link href="/">
          <button className="px-3 py-1 border rounded">← Back to Record</button>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="px-3 py-1 border rounded bg-red-500 text-white"
        >
          Sign Out
        </button>
      </div>
      <ThemeToggle />
      <h1 className="text-2xl font-bold mb-4">Your Notes</h1>
      {notes.map((note) => (
        <div key={note.id} className="p-3 my-2 bg-gray-200 dark:bg-gray-700 rounded">
          <h3 className="font-semibold">{note.summary}</h3>
          <small className="text-gray-600 dark:text-gray-300">
            {note.tags.join(", ")}
          </small>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">
              Full transcription
            </summary>
            <p className="mt-2">{note.transcription}</p>
          </details>
          <div className="mt-2">
            <button
              onClick={() => setEditingNote(note)}
              className="mr-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deleteNote(note.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
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
