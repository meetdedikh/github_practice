import Dashboard from "./Dashboard";
import "./App.css";
import { Login } from "./Login";
import { Route, Routes } from "react-router-dom";
import { UserProfile } from "./UserProfile";
import { Request } from "./Request";
import { FriendList } from "./FriendList";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Registrarion } from "./Registrarion";
import { AddPost } from "./AddPost";
import { Comment } from "./Comment";

function App() {
  const { state } = useContext(AuthContext);
  if (!state.isLoggedIn)
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registrarion/>} />
      </Routes>
    );
    return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/request" element={<Request />} />
        <Route path="/friendlist" element={<FriendList />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/addcomments" element={<Comment />} />.
        
        
      </Routes>
    );
}

export default App;
