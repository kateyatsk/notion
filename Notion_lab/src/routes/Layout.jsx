import React from "react";
import { NavLink, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useUser } from "../components/UserContextProvider";

const Layout = () => {
  const navigate = useNavigate();
  const { user, onChange } = useUser();
  const location = useLocation();

  const handleLogout = () => {
    onChange(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4">
      <header className="flex flex-row gap-6 text-lg mt-5 justify-between mb-10">
        <div className="text-2xl font-medium">
          <p className="text-lg">Добро пожаловать, {user?.email}</p>
        </div>
        <div className="flex text-2xl gap-8">
          <NavLink
            to="/"
            end={true}
            className={`font-medium ${
              location.pathname === "/" ? "text-black-900" : "text-stone-500"
            } ml-auto`}
          >
            About
          </NavLink>
          <NavLink
            to="/notes"
            end={true}
            className={`font-medium ${
              location.pathname === "/notes" ? "text-black-900" : "text-stone-500"
            }`}
          >
            Notes
          </NavLink>

          <button
            onClick={handleLogout}
            className="font-medium text-red-700"
          >
            Log out
          </button>
        </div>
      </header>
      <main className="ml-10 flex-1">
          <Outlet></Outlet>
      </main>
      <footer className="mt-4 mb-4">
        <div>
          <hr></hr>
        </div>
        <div className="flex flex-row justify-between text-stone-400 mt-5">
          <div className="ml-10">Created by: Kate Jatskevich</div>
          <div className="mr-10">BSU: 2023</div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
