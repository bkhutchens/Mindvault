import { useState, useEffect } from "react";

export default function EditNoteModal({ note, onClose, onSave, approvedTags }) {
  const [summary, setSummary] = useState(note.summary || "");
  const [selectedTags, setSelectedTags] = useState(note.tags || []);

  useEffect(() => {
    setSummary(note.summary || "");
    setSelectedTags(note.tags || []);
  }, [note]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) return prev.filter(t => t !== tag);
      if (prev.length < 3) return [...prev, tag];
      return prev;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
        <h3 className="text-xl mb-4">Edit Note</h3>

        <textarea
          className="w-full h-24 border rounded p-2"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <div className="mt-4">
          <p className="mb-2 font-semibold">Tags (max 3):</p>
          {approvedTags.map((tag) => (
            <label key={tag} className="inline-flex items-center mr-2 mb-2">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                disabled={!selectedTags.includes(tag) && selectedTags.length >= 3}
                onChange={() => toggleTag(tag)}
              />
              <span className="ml-1">{tag}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button className="mr-2 px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={() => onSave(note.id, summary, selectedTags)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
