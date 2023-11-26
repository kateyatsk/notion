import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

const NotFound = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4 text-red-500">404 - Страница не найдена</h1>
      <p className="text-gray-600 mb-4">Извините, мы не можем найти запрошенную вами страницу.</p>
      <Link to={user ? "/home" : "/login"} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        {user ? "На главную" : "Войти"}
      </Link>
    </div>
  );
};

export default NotFound;
