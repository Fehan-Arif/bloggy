//=====================
//  Imports
//=====================
import express from "express";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
//=====================
//  Constants
//=====================
const app = express(),
  port = 3000;
// __dirname = dirname(fileURLToPath(import.meta.url));
//=====================
//  Middleware
//=====================
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//=====================
//  Routes
//=====================
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/posts", (req, res) => {
  res.render("posts.ejs");
});
app.get("/post", (req, res) => {
  res.render("post.ejs");
});
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});
//=====================
//  Listener
//=====================
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
