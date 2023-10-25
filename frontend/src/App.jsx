import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useContext/useAuthContext";
import { usePostContext } from "./hooks/useContext/usePostContext";

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

import Overlay from "./components/Overlay";
import AddPost from "./components/AddPost";

const App = () => {
  const { user, authIsReady } = useAuthContext();
  const { isAddPost } = usePostContext();

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />

          {isAddPost && (
            <>
              <Overlay />
              <AddPost />
            </>
          )}

          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/homepage" />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/homepage" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/homepage" /> : <Signup />}
            />
            <Route
              path="/homepage"
              element={user ? <Homepage /> : <Navigate to="/login" />}
            />
            <Route
              path="/friends"
              element={user ? <Friends /> : <Navigate to="/login" />}
            >
              <Route index element={<FriendsHome />} />
              <Route path="requests" element={<FriendsRequests />} />
              <Route path="list" element={<FriendsList />} />
            </Route>

            <Route
              path="/profile/:id"
              element={user ? <Profile /> : <Navigate to="/login" />}
            >
              <Route index element={<ProfileHome />} />
              <Route path="friends" element={<ProfileFriends />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
