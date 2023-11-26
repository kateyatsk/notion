import React from "react";
import { createBrowserRouter, RouterProvider, Route, Outlet } from "react-router-dom";
import UserContextProvider from "./components/UserContextProvider";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Notes from "./routes/Notes.jsx";
import CreateNote from "./routes/CreateNote";
import EditNote from "./routes/EditNote";
import ViewNote from "./routes/ViewNote";
import NotFound from "./routes/NotFound";
import RequireAuth from "./components/RequireAuth";
import Layout from "./routes/Layout";


const router = createBrowserRouter([
  { path: "register", element: <Register /> },
  { path: "login", element: <Login /> },
  { element: 
      <RequireAuth>
          <Layout />
        </RequireAuth>,
    children: [
      { path: "/",
      element: 
        <RequireAuth>
          <Home />
        </RequireAuth>
      ,},
      { path: "/notes", element: <Notes /> },
      { path: "create-note", element: <CreateNote /> },
      { path: "edit-note/:id", element: <EditNote /> },
      { path: "view-note/:id", element: <ViewNote /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function App() {
  return (
    <UserContextProvider>
    <RouterProvider router={router}>
      <Outlet />
    </RouterProvider>
    </UserContextProvider>
  );
}

