import React, { useContext, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import { useNavigate, NavLink } from "react-router-dom";
import { z } from "zod";
import FetchURL from "../utils/FetchURL";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const handleLogin = async () => {
    try {
        loginSchema.parse({ email, password });
            const userData = await FetchURL.getUserById(email, password);
            if (userData.length > 0) {
                userContext.onChange(userData[0]);
                navigate("/");
            } else {
                setError("Неверные учетные данные");
            }
    } catch (error) {
        setError(error.errors?.[0]?.message || "Ошибка при входе пользователя");
    }
};


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Вход</h1>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2 mb-3 w-full"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2 mb-3 w-full"
          />
        </div>
        <div>
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white rounded px-4 py-2 w-full"
          >
            Войти
          </button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="mt-4">
          <NavLink to="/register" className="text-blue-500 underline">
            Регистрация
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
