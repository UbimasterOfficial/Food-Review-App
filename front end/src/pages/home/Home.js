import React, { useEffect, useState } from "react";
import "./Home.css";
import Post from "../../components/Post";
import { getAllPost } from "../../util/APIUtils";
import { toast } from "react-toastify";
import CreatePost from "../../components/CreatePost";

const Home = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);

  const fetchAllPost = async () => {
    try {
      const response = await getAllPost();
      setPosts(response.reverse());
    } catch (error) {
      toast("Oops something went wrong!", { type: "error" });
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  return (
    <div className="home-container bg-sky-100">
      <div className="container">
        <CreatePost currentUser={currentUser} refetchPosts={fetchAllPost} />

        {posts.map(post => (
          <Post
            key={post.id}
            currentUser={currentUser}
            refetchPosts={fetchAllPost}
            {...post}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
