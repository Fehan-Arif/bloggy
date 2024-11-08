//=====================
//  Imports
//=====================
import express from "express";
import methodOverride from "method-override";
//=====================
//  Constants
//=====================
const app = express(),
  port = 3000,
  posts = [
    {
      category: "food",
      items: [],
    },
    {
      category: "technology",
      items: [],
    },
    {
      category: "travel",
      items: [],
    },
  ];
//=====================
//  Middleware
//=====================
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);
//=====================
//  Functions
//=====================
function Post(title, content) {
  // Initialize a static counter for unique IDs
  if (typeof Post.nextId === "undefined") {
    Post.nextId = 1;
  }
  // Assign the next available ID and increment the counter
  this.id = Post.nextId++;
  // Post Content
  this.title = title;
  this.content = content;
}
//=====================
//  Seed
//=====================
let post1 = new Post(
  "The first Post",
  "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
);
posts[0].items.push(post1);
let post2 = new Post("Latest Gadgets", "Review of the new smartphone.");
posts[1].items.push(post2);
//=====================
//  Routes
//=====================
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/posts/:postType", (req, res) => {
  let postType = req.params.postType;
  res.render("posts.ejs", { allPosts: posts, postType: postType });
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});
app.post("/compose", (req, res) => {
  let blogCategory = req.body.category.toLowerCase();
  for (let index = 0; index < posts.length; index++) {
    let element = posts[index];
    if (element.category === blogCategory) {
      let newPost = new Post(req.body["blog-title"], req.body["blog-content"]);
      element.items.push(newPost);
    }
  }
  res.redirect("/posts/" + blogCategory.toLowerCase());
});

app.get("/post/:postName", (req, res) => {
  let postName = req.params.postName;
  posts.forEach((post) => {
    post.items.forEach((element) => {
      console.log(element.title);
      if (element.title === postName) {
        res.render("post.ejs", {
          title: element.title,
          content: element.content,
        });
      }
    });
  });
});

app.delete("/posts/:postType/delete", (req, res) => {
  let id = parseInt(req.body.id);
  let postType = req.body.postType;
  if (postType === "food") {
    var i = 0;
  } else if (postType === "technology") {
    var i = 1;
  } else {
    var i = 2;
  }
  // Find the index of the item with id
  let indexToDelete = posts[i].items.findIndex((item) => item.id === id);
  // Remove the item from the array
  if (indexToDelete !== -1) {
    posts[i].items.splice(indexToDelete, 1);
  }
  res.redirect("/posts/" + postType);
});

app.get("/post/:category/:postName/:id/edit", (req, res) => {
  posts.forEach((categoryElement) => {
    if (categoryElement.category === req.params.category) {
      categoryElement.items.forEach((postId) => {
        if (postId.id === parseInt(req.params.id)) {
          let oldPostCategory = categoryElement.category;
          let postCategory =
            oldPostCategory[0].toUpperCase() + oldPostCategory.slice(1);
          res.render("edit.ejs", {
            postCategory: postCategory,
            postData: postId,
          });
        }
      });
    }
  });
});

app.post("/post/:category/:postName/:id/edit", (req, res) => {
  posts.forEach((categoryElement) => {
    if (categoryElement.category === req.params.category.toLowerCase()) {
      categoryElement.items.forEach((postId) => {
        if (postId.id === parseInt(req.params.id)) {
          postId.title = req.body.title;
          postId.content = req.body.content;
          res.redirect("/posts/" + categoryElement.category);
        }
      });
    }
  });
});
//=====================
//  Listener
//=====================
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
