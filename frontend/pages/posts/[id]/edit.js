import { getPostById, updatePost } from "@/lib/api/posts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PostsEditPage() {
  const router = useRouter();
  const { id } = router.query;

  const defaultModel = {
    title: "",
    text: "",
  };
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(defaultModel);

  useEffect(() => {
    if (!id) return;
    const loadPost = async () => {
      try {
        const post = await getPostById(id);
        setPost(post);
        console.log(post);
      } catch (e) {
        console.error(e);
      }
    };
    loadPost();
  }, [id]);

  function validateModel(post) {
    const errors = {
      title: "",
      text: "",
    };

    let isValid = true;

    if (post.title.trim().length === 0) {
      errors.title = "not valid title";
      isValid = false;
    }
    if (post.text.trim().length === 0) {
      errors.text = "not valid text";
      console.log(errors);
      isValid = false;
    }

    return { errors, isValid };
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(defaultModel);

    const result = validateModel(post);
    console.log(result);
    if (!result.isValid) {
      setErrors(result.errors);
      setIsLoading(false);
      return;
    }

    try {
      await updatePost(post);
      alert("Post has been updated!");
      router.push(`/posts/${id}`);
    } catch (error) {
      console.error(error);
      setErrors({ ...errors, submit: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>
        Edit post with id: {post.id}
        {post.title}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
          value={post.title}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="text"
          name="text"
          onChange={handleChange}
          value={post.text}
          className="input input-bordered w-full max-w-xs"
        />
        {errors.title && <div className={styles.error}>{errors.title}</div>}
        {errors.text && <div className={styles.error}>{errors.text}</div>}
        <button className="btn btn-success" disabled={isLoading}>
          {isLoading ? "...Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
}
