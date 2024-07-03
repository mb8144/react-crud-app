import Post from "@/components/Post";
import PostForm from "@/components/PostForm";
import { getAllPosts } from "@/lib/api/posts";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const post = {
    title: "title1",
    text: "text1"
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        setPosts(posts);
        console.log(posts);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPosts();
  }, []);
  
  return (
    <div>
      <h1>Welcome to my blog!</h1>
      <PostForm />
      <Post posts={posts} />
    </div>
  );
}
