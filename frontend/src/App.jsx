import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Signup from "./pages/login/Signup.jsx";
import { ToastProvider } from "./context/toastContext.jsx";
import { useUserContext } from "./context/userContext.jsx";
import Chat from "./pages/Chat/Chat.jsx";
import { SocketContextProvider } from "./context/socketContex.jsx";
import SearchUsers from "./componants/SearchUsers.jsx";

function App() {
  const { user } = useUserContext();
  return (
    <>
      <SocketContextProvider>
        <ToastProvider>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/Chat" /> : <Home />}
            />
            <Route path="/Chat" element={<Chat />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/Chat" /> : <Login />}
            />
            <Route
              path="/Signup"
              element={user ? <Navigate to="/Chat" /> : <Signup />}
            />
          </Routes>
        </ToastProvider>
      </SocketContextProvider>
    </>
  );
}

export default App;
