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
  // salvo il post preso dal body
  const { title, content, image, tags } = req.body;

  // eseguo i controlli sul post in modo che sia uniforme a quelli che gia ho
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

  // se il post è malformato blocco tutto con un errore 400
  if (isRequestMalformed) {
    res.status(400);

    res.json({
      error: "400 bad request",
      message: "Request is malformed",
      malformedElements,
    });
  }

  // stabilisco l' id da prendere per creare il nuovo post
  let maxId = 0;
  for (const post of posts) {
    if (post.id > maxId) maxId = post.id;
  }
  const postId = maxId + 1;
  const newPost = { id: postId, title, content, image, tags };
  posts.push(newPost);

  // mando la risposta con il post creato con l'id aggiornato
  res.status(201).json(newPost);
};

const update = (req, res) => {
  // controllo l'id del post
  const postId = parseInt(req.params.id);
  const post = posts.find((currentPost) => currentPost.id === postId);

  // mando l'errore se non ho il post
  if (!post) {
    res.status(404);

    return res.json({
      error: "404 not found",
      message: "post not found",
    });
  }

  // salvo il nuovo post preso dal body
  const { title, content, image, tags } = req.body;

  // creo i controlli di sicurezza per avere un post ben generato
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

  // se l'array è mal generato blocco tutto con un errore 400
  if (isRequestMalformed) {
    res.status(400);

    res.json({
      error: "400 bad request",
      message: "Request is malformed",
      malformedElements,
    });
  }

  // se supera i controllli sostituisco il post
  const updatePost = { id: postId, title, content, image, tags };
  const postIndex = posts.indexOf(post);
  posts.splice(postIndex, 1, updatePost);

  // mando la risposta con il post sostituito
  res.json(updatePost);
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
