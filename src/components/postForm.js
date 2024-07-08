import React, { useState, useEffect } from "react";
import { createPost, updatePost } from "../services/postService";

export default function PostForm({
  posts,
  setPosts,
  editingPost,
  setEditingPost,
}) {
  //UserId, Id : handled by the backend.
  //{UserId, Id, Title, Body} so we need only Title and Body!
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingPost) {
      editPost();
    } else {
      addPost();
    }

    setTitle("");
    setBody("");
    setEditingPost(null);
  };

  const addPost = () => {
    createPost({ title, body }) //Note: Inline creation of object.
      .then((response) => {
        setPosts([...posts, response.data]); //New Post is returned here in response.data.
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const editPost = () => {
    console.log("editPost - editingPost:" + editingPost);
    console.log("editPost - editingPost.id:" + editingPost.id);
    updatePost(editingPost.id, { title, body })
      .then((response) => {
        setPosts(
          posts.map((post) =>
            post.id === editingPost.id ? response.data : post
          )
        );
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Title</div>
      <input
        type="text"
        size="100"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div>Body</div>
      <textarea
        rows="5"
        cols="100"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <div>
        <button className="wishlist-btn" type="submit">
          {editingPost ? "Edit Post" : " Add Post"}
        </button>
      </div>
    </form>
  );
}
