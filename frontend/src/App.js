import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Friends from "./pages/Friends";
import FriendsRequests from "./components/FriendsRequests";
import FriendsList from "./components/FriendsList";

import FriendsHome from "./components/FriendsHome";
import ProfileFriends from "./components/ProfileFriends";
import ProfileHome from "./components/ProfileHome";

const App = () => {
  const [isAddPostActive, setIsAddPostActive] = useState(false);

  return (
    <div className="bg-[#eef7ff] font-cabinetGrotesk">
      <BrowserRouter>
        <Navbar setIsAddPostActive={setIsAddPostActive} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/homepage"
            element={
              <Homepage
                isAddPostActive={isAddPostActive}
                setIsAddPostActive={setIsAddPostActive}
              />
            }
          />
          <Route path="/friends" element={<Friends />}>
            <Route index element={<FriendsHome />} />
            <Route path="requests" element={<FriendsRequests />} />
            <Route path="list" element={<FriendsList />} />
          </Route>

          <Route path="/profile/:id" element={<Profile />}>
            <Route
              index
              element={
                <ProfileHome
                  isAddPostActive={isAddPostActive}
                  setIsAddPostActive={setIsAddPostActive}
                />
              }
            />
            <Route path="friends" element={<ProfileFriends />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
