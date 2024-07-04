import { getPostById, deletePost } from "@/lib/api/posts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (!id) return;
    const loadPost = async () => {
      try {
        const post = await getPostById(id);
        setPost(post);
      } catch (e) {
        console.error(e);
      }
    };
    loadPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = () => {
    router.push(`/posts/${id}/edit`);
  };

  return (
    <article>
      <h2 className="text-3xl">{post.title}</h2>
      <p>{post.text}</p>
      <button className="btn btn-info" onClick={handleEdit}>
        edit
      </button>
      <button className="btn btn-warning" onClick={handleDelete}>
        delete
      </button>
    </article>
  );
}
