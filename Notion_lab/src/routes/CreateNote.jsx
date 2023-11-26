import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";
import NoteForm from "../routes/NoteForm";
import FetchURL from "../utils/FetchURL";

const CreateNote = () => {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [errorContent, setErrorContent] = useState("");
  const navigate = useNavigate();

  const handleCreateNote = async () => {
    if (!title.trim()) {
      setErrorTitle("Пожалуйста, введите название заметки.");
    } else {
      setErrorTitle("");
    }

    if (!content.trim()) {
      setErrorContent("Пожалуйста, введите тело заметки.");
    } else {
      setErrorContent("");
    }

    if (title.trim() && content.trim()) {
      try {
        const currentDate = new Date().toISOString();
        const response = FetchURL.createNote(title, content, user.id, currentDate)
        console.log(response)
          navigate("/notes");
      } catch (error) {
        console.error("Ошибка при создании заметки:", error);
      }
    }
  };

  return (
    <NoteForm
      titleValue={title}
      contentValue={content}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onSubmit={handleCreateNote}
      titleError={errorTitle}
      contentError={errorContent}
      buttonText="Создать"
      backLink="/notes"
    />
  );
};

export default CreateNote;
