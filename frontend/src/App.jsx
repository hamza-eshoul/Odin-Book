import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Homepage from "./pages/Home/Homepage";
import Navbar from "./components/Navbar";

import Profile from "./pages/Profile/Profile";
import ProfileFriends from "./pages/Profile/ProfileFriends";
import ProfileHome from "./pages/Profile/ProfileHome";

import FriendsHome from "./pages/Friends/FriendsHome";
import Friends from "./pages/Friends/Friends";
import FriendsRequests from "./pages/Friends/FriendsRequests";
import FriendsList from "./pages/Friends/FriendsList";

const App = () => {
  const [isAddPostActive, setIsAddPostActive] = useState(false);

  return (
    <div className="">
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
