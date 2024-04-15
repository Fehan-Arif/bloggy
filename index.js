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
  port = 3000,
  // __dirname = dirname(fileURLToPath(import.meta.url));
  posts = [
    { category: 'Food', items: [] },
    { category: 'Technology', items: [] },
    { category: 'Travel', items: [] }
  ];
//=====================
//  Middleware
//=====================
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//=====================
//  Functions
//=====================
function Post(title, content) {
  this.title = title;
  this.content = content;
};
// Constructor function to create an item
// function createItem(title, content) {
//   return { title, content };
// }
//=====================
//  Routes
//=====================
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/food", (req, res) => {
  // let post1 = new Post("The first Post", "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.");
  // posts[0].items.push(post1);
  let routePage = "Food";
  res.render("posts.ejs", { allPosts: posts, routePage: routePage });
});
app.get("/technology", (req, res) => {
  // let post1 = new Post('Latest Gadgets', 'Review of the new smartphone.');
  // posts[1].items.push(post1);
  let routePage = "Technology";
  res.render("posts.ejs", { allPosts: posts, routePage: routePage });
});
app.get("/travel", (req, res) => {
  let routePage = "Travel";
  res.render("posts.ejs", { allPosts: posts, routePage: routePage });
});
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});
app.post("/compose", (req, res) => {
  // console.log(req.body);
  let blogCategory = req.body.category;
  for (let index = 0; index < posts.length; index++) {
    let element = posts[index];
    if (element.category === blogCategory) {
      let newPost = new Post(req.body['blog-title'], req.body['blog-content']);
      element.items.push(newPost);
    }
    // console.log(element.items);
  }
  res.redirect("/" + blogCategory.toLowerCase());
});
//=====================
//  Listener
//=====================
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
