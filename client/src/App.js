// import { Button } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Chats from "./pages/Chats";
import Home from "./pages/Home";
import { useEffect } from "react";
import { ChatState } from "./context/ChatProvider";

function App() {
  const { user } = ChatState();

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Navigate to="/chats" /> : <Home />}
        />
        <Route
          exact
          path="/chats"
          element={user ? <Chats /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
