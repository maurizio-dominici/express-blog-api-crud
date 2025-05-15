// imports
const express = require("express");
const postRouter = require("./routers/posts.js");

// express app config
const app = express();
const appPort = 3000;
const appUrl = `http://localhost:` + appPort;

// middelware
app.use(express.static("public")); // static assets
app.use(express.json()); // body-parsers middleware

// routers
app.use("/posts", postRouter);

app.listen(appPort, () => {
  console.log(`Server listening on ${appUrl}`);
});
