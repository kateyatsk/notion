import React, { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Link } from "react-router-dom";


const Home = () => {
  const { user } = useContext(UserContext);

  const formatRegistrationDate = (isoDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("ru-RU", options).format(new Date(isoDate));
  };

  return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Обо мне</h1>
        <div className="mb-4">
          <p className="text-lg">Email: {user.email}</p>
          <p className="text-lg">Дата регистрации: {formatRegistrationDate(user.dateRegister)}</p>
        </div>
        <Link to="/notes" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
          Перейти к заметкам
        </Link>
      </div>
  );
};

export default Home;
