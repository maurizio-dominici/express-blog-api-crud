// imports
const express = require("express");
const { posts } = require("../data/variables");

// functions
const index = (req, res) => {
  const filteredTags = req.query.tags;
  const fiteredTitle = req.query.title;

  let filteredPosts = [...posts];

  if (filteredTags) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags.includes(filteredTags)
    );
  }

  if (fiteredTitle) {
    filteredPosts = filteredPosts.filter((post) =>
      post.title.includes(fiteredTitle)
    );
  }

  res.json({
    filteredPosts,
  });
};

const show = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((currentPost) => currentPost.id === id);

  if (!post) {
    res.status(404);

    return res.json({
      error: "Not found",
      status: 404,
      message: "Post non trovato",
    });
  }

  res.json(post);
};

const store = (req, res) => {
  const { title, content, image, tags } = req.body;

  let isRequestMalformed = false;
  const malformedElements = [];

  if (!title || typeof title !== "string" || title.length < 3) {
    console.log("title is malformed");
    malformedElements.push("name");
    isRequestMalformed = true;
  }

  if (!content || typeof content !== "string" || content.length < 3) {
    console.log("content is malformed");
    malformedElements.push("content");
    isRequestMalformed = true;
  }

  if (!image || typeof image !== "string" || image.length < 3) {
    console.log("image is malformed");
    malformedElements.push("image");
    isRequestMalformed = true;
  }

  if (!Array.isArray(tags)) {
    console.log("tags is malformed");
    malformedElements.push("tags");
    isRequestMalformed = true;
  }

  if (isRequestMalformed) {
    res.status(400);

    res.json({
      error: "400 bad request",
      message: "Request is malformed",
      malformedElements,
    });
  }

  let maxId = 0;
  for (const post of posts) {
    if (post.id > maxId) maxId = post.id;
  }

  const postId = maxId + 1;
  const newPost = { id: postId, title, content, image, tags };
  posts.push(newPost);

  res.status(201).json(newPost);
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  res.json(`Modifica totale del post ${id}`);
};

const modify = (req, res) => {
  const id = parseInt(req.params.id);
  res.json(`Modifica parziale del post ${id}`);
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((currentPost) => currentPost.id === id);

  if (!post) {
    res.status(404);

    return res.json({
      error: "Not found",
      status: 404,
      message: "Post non trovato",
    });
  }

  posts.splice(posts.indexOf(post), 1);

  res.json({
    status: 204,
    message: `Ok il post ${post.title.toUpperCase()} è stata eliminata`,
  });

  console.log(posts);
};

// exports
module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy,
};
