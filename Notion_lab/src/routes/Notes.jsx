import React, { useContext, useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import FetchURL from "../utils/FetchURL";

const Notes = () => {
  const { user } = useContext(UserContext);
  const userId = user.id;
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
          const data = await FetchURL.getNotesByUserId(userId);
          setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    getNotes(userId);
  }, [userId]);

  const handleDeleteNote = (noteId) => {
    FetchURL.deleteNote(noteId)
        .then(() => {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        })};

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Заметки пользователя {user.email}</h1>
      <ul className="space-y-4">
        {Array.isArray(notes) && notes.map((note) => (
          <li key={note.id} className="flex items-center justify-between bg-white p-4 shadow-md rounded-md">
            <NavLink to={`/view-note/${note.id}`} className="text-blue-500">
              <span className="font-bold">{note.title}</span> - {new Date(note.dateCreated).toLocaleDateString()}
            </NavLink>
            <div className="flex space-x-4">
              <NavLink to={`/edit-note/${note.id}`} className="text-blue-500">Редактировать</NavLink>
              <button onClick={() => handleDeleteNote(note.id)} className="text-red-500">Удалить</button>
            </div>
          </li>
        ))}
      </ul>
      <NavLink to="/create-note" className="block bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700">
        + Новая заметка
      </NavLink>
    </div>
  );
};

export default Notes;
