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
  res.json("Creazione di un nuovo post");
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
