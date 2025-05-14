// imports
const express = require("express");
const { posts } = require("../data/variables");

// express posts.js config
const router = express.Router();

// root ==== view posts list (INDEX)
router.get("/", (req, res) => {
  res.json(posts);
  console.log("lettura della lista dei post");
});

// root ==== view single post (SHOW)
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(posts.find((currentPost) => currentPost.id === id));
  console.log(`lettura del post ${id}`);
});

// root ==== create new post (STORE)
router.post("/", (req, res) => {
  res.json("Creazione di un nuovo post");
});

// root ==== complete fix post (UPDATE)
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(`Modifica totale del post ${id}`);
});

// root ==== patch post (MODIFY)
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(`Modifica parziale del post ${id}`);
});

// root ==== delete post (DESTROY)
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  res.json(`Rimozione del post ${id}`);
});

// exports
module.exports = router;
