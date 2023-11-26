import React, { useState } from "react";
import { Link } from "react-router-dom";

const NoteForm = ({ titleValue, contentValue, onTitleChange, onContentChange, onSubmit, titleError, contentError, buttonText, backLink }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{buttonText} заметки</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Название заметки
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Введите название заметки"
          value={titleValue}
          onChange={(e) => onTitleChange(e.target.value)}
          className={`mt-1 p-2 border rounded-md w-full ${titleError ? 'border-red-500' : ''}`}
        />
        {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Тело заметки
        </label>
        <textarea
          id="content"
          name="content"
          placeholder="Введите тело заметки"
          value={contentValue}
          onChange={(e) => onContentChange(e.target.value)}
          className={`mt-1 p-2 border rounded-md w-full ${contentError ? 'border-red-500' : ''}`}
        ></textarea>
        {contentError && <p className="text-red-500 text-sm mt-1">{contentError}</p>}
      </div>

      <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        {buttonText}
      </button>

      <Link to={backLink} className="block mt-4 text-blue-500">Назад</Link>
    </div>
  );
};

export default NoteForm;
