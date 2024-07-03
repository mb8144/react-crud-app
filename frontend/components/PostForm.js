import { createPost, getPostById, updatePost } from "@/lib/api/posts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./PostForm.module.css";

const URL = process.env.NEXT_PUBLIC_API_URL;

const defaultModel = {
  title: "",
  text: "",
};

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

export default function PostForm({ postToEdit }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(defaultModel);
  const [post, setPost] = useState(defaultModel);

  useEffect(() => {}, [postToEdit]);

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

    if (post.id) {
      try {
        updatePost(post);
        setPost(post);
      } catch(e) {
        console.error(e);
      }
    } else {
      try {
        createPost(post);
        setPost(post);
      } catch(e){
        console.error(e);
      }
    }
    setIsLoading(false);
    router.push(`${URL}/posts/${post.id}`);
  };

  return (
    <div className={styles.postform}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="text"
          name="text"
          onChange={handleChange}
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
