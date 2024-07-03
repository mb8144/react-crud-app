const URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllPosts() {
  const response = await fetch(`${URL}/posts`);
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  const data = await response.json();
  return data;
}

export async function getPostById(id) {
  const response = await fetch(`${URL}/posts/${id}`);
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  const data = await response.json();
  return data;
}

export async function createPost(post) {
  const response = await fetch(`${URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  const data = await response.json();
  return data;
}

export async function updatePost(post) {
  const response = await fetch(`${URL}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  const data = await response.json();
  return data;
}

export async function deletePost(post) {
    const response = await fetch(`${URL}/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    const data = await response.json();
    return data;
  }