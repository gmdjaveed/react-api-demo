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
        {posts.map((post) => (
          <div key={post.id} className="item-card-info">
            <div className="item-card">
              <div className="item-card-title"> {post.title}</div>
              <div className="item-card-body">{post.body}</div>
              <button
                className="wishlist-btn"
                onClick={() => startEditing(post)}
              >
                Edit
              </button>
              <div class="divider" />
              <button
                className="wishlist-btn"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
