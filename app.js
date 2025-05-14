// imports
const express = require("express");

const postRouter = require("./routers/posts.js");

// express app config
const app = express();
const appPort = 3000;
const appUrl = `http://localhost:` + appPort;

// static assets middelware
app.use(express.static("public"));

// routers
app.use("/posts", postRouter);

app.listen(appPort, () => {
  console.log(`Server listening on ${appUrl}`);
});
