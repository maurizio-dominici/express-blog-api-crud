// imports
const express = require("express");
const postControls = require("../controllers/postController.js");

// express posts.js config
const router = express.Router();

// root
router.get("/", postControls.index);
router.get("/:id", postControls.show);
router.post("/", postControls.store);
router.put("/:id", postControls.update);
router.patch("/:id", postControls.modify);
router.delete("/:id", postControls.destroy);

// exports
module.exports = router;
