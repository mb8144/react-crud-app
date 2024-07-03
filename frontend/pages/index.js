import Post from "@/components/Post";
import { getAllPosts } from "@/lib/api/posts";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getAllPosts();
        setPosts(posts);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPosts();
  }, []);
  
  return (
    <div>
      <h1>Welcome to my blog!</h1>
      
      <Post posts={posts} />
    </div>
  );
}
