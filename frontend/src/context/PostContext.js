import { createContext, useReducer } from "react";

export const PostContext = createContext();

export const postsReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
      };
    case "ADD_POST":
      return {
        ...state,
        isAddPost: true,
      };
    case "CLOSE_ADD_POST":
      return {
        ...state,
        isAddPost: false,
      };
    case "CREATE_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    case "RESET_POSTS":
      return {
        ...state,
        posts: null,
      };

    default:
      return state;
  }
};

const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: null,
    isAddPost: false,
  });

  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
