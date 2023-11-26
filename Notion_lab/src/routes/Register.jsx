import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useUser } from "../components/UserContextProvider";
import FetchURL from "../utils/FetchURL";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { saveUser } = useUser();

  const registerSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
    repeatPassword: z.string(),
  });

  const isPasswordStrong = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
  };

  const handleRegister = async () => {
    try {
      registerSchema.parse({
        email,
        password,
        repeatPassword,
      });

      if (password !== repeatPassword) {
        setError("Пароли не совпадают");
        return;
      }

      if (!isPasswordStrong(password)) {
        setError(
          "Пароль должен содержать минимум 8 символов, заглавные и строчные буквы, и цифры"
        );
        return;
      }
      const userData = {
        email,
        password,
        dateRegister: new Date().toISOString(),
      };
      if (await FetchURL.getUsers(userData)) {
        saveUser(userData);
        navigate("/login");
      } else {
        setError("Ошибка при сохранении данных пользователя");
      }
    } catch (error) {
      setError(error.errors[0]?.message || "Ошибка валидации");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-2 py-1 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-2 py-1 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        className="border rounded px-2 py-1 mb-2 w-full"
      />
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white rounded px-4 py-2 w-full"
      >
        Зарегистрироваться
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default Register;
