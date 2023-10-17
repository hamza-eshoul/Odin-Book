import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import FriendsHome from "./components/FriendsHome";
import ProfileFriends from "./components/ProfileFriends";
import ProfileHome from "./components/ProfileHome";
import Login2 from "./pages/Auth/Login2";
import Signup from "./pages/Auth/Signup";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import FriendsRequests from "./components/FriendsRequests";
import FriendsList from "./components/FriendsList";

const App = () => {
  const [isAddPostActive, setIsAddPostActive] = useState(false);

  return (
    <div className="">
      <BrowserRouter>
        <Navbar setIsAddPostActive={setIsAddPostActive} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<Login2 />} />
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
