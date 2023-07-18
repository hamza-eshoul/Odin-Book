import { createContext, useReducer } from "react";

export const PostContext = createContext();

export const postsReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        posts: action.payload,
      };
    case "CREATE_POST":
      return {
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
};

const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: null,
  });

  return (
    <PostContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
