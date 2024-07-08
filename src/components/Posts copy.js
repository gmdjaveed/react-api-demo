import React, { useState, useEffect } from "react";
import { getPosts, deletePost, updatePost } from "../services/postService";
import PostForm from "./postForm";

export default function Posts() {
  const [posts, setPosts] = useState([]); // Empty posts
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    //console.log("Load posts..."); twice initially
    getPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleDelete = (id) => {
    deletePost(id)
      .then((result) => {
        setPosts(posts.filter((post) => post.id !== id));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const startEditing = (post) => {
    setEditingPost(post);
  };

  return (
    <div>
      <h1> Posts </h1>
      <PostForm
        posts={posts}
        setPosts={setPosts}
        editingPost={editingPost}
        setEditingPost={setEditingPost}
      ></PostForm>

      <div className="items-grid">
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <div className="item-card">
                <h2> {post.title}</h2>
                <p>{post.body}</p>
                <button onClick={() => startEditing(post)}>Edit</button>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
