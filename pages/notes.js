import { useState, useEffect } from "react";
import Link from "next/link";
import db from "../lib/pouchdb";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const allDocs = await db.allDocs({ include_docs: true });
      const data = allDocs.rows.map((row) => row.doc);
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1>Your Notes</h1>
      <input
        type="text"
        placeholder="Search notes..."
        style={styles.searchBox}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div style={styles.notesContainer}>
        {filteredNotes.map((note) => (
          <div key={note._id} style={styles.noteCard}>
            <p>{note.text}</p>
          </div>
        ))}
      </div>

      <Link href="/" style={styles.link}>
        Go Back
      </Link>
    </div>
  );
}

const styles = {
  container: { padding: "2rem" },
  searchBox: { width: "100%", padding: "0.5rem", marginBottom: "1rem" },
  notesContainer: { display: "grid", gap: "1rem" },
  noteCard: { backgroundColor: "#f8f8f8", padding: "1rem", borderRadius: "8px" },
  link: { marginTop: "2rem", textDecoration: "underline", color: "#0070f3" },
};
