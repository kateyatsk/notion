import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import FetchURL from "../utils/FetchURL";

const ViewNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchURL.getNoteById(id);
        setNote(data);
      } catch (error) {
        console.error("Ошибка при извлечении данных примечания:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteNote = async () => {
    try {
      if (await FetchURL.deleteNote(id)) {
        navigate("/notes"); 
      } else {
        throw new Error("Примечание об ошибке при удалении");
      }
    } catch (error) {
      console.error("Примечание об ошибке при удалении:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
        <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
      </div>

      <div className="flex items-center space-x-4 mt-4">
        <Link
          to={`/edit-note/${id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Редактировать
        </Link>
        <button
          onClick={handleDeleteNote}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Удалить
        </button>
      </div>

      <Link to="/notes" className="block mt-4 text-blue-500">
        Назад
      </Link>
    </div>
  );
};

export default ViewNote;
