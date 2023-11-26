import React, { useState, useEffect, useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../routes/NoteForm";
import { UserContext } from "../components/UserContextProvider";
import FetchURL from "../utils/FetchURL";

const EditNote = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await FetchURL.getNoteById(id);
            setTitle(data.title);
            setContent(data.content);
        } catch (error) {
            console.error("Ошибка при извлечении данных примечания:", error);
        }
    };

    fetchData();
}, [id]);


  const handleEditNote = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Пожалуйста, введите название и содержание заметки.");
      return;
    }
    try {
      FetchURL.editNote(title, content, user.id, id)
      navigate("/notes");
    } catch (error) {
      console.error("Ошибка при создании заметки:", error);
    }
  };

  return (
    <NoteForm
      titleValue={title}
      contentValue={content}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onSubmit={handleEditNote}
      titleError={error}
      contentError={error}
      buttonText="Сохранить"
      backLink="/notes"
    />
  );
};

export default EditNote;