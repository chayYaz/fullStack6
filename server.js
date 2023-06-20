//const http = require("http");
const mysql2 = require("mysql2");
const hostname = "127.0.0.1";
const port = 3001;
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "0548574423",
  database: "fullstack6",
  port:'3006'
  //socketPath: 'C:\Users\reuto\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\MySQL'
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/", (req, res) => {
  res.send("Hello World2");
});
app.get("/login", (req, res) => {
  console.log("Login route accessed");
  res.send("Login page");
});

app.post("/users", (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const username = body.username;

  const query =
    "INSERT INTO users (username, password,email) VALUES (?, ?,?);  ";
  connection.query(query, [username, password, email], (err, results) => {
    if (err) {
      res.setHeader("Content-Type", "application/json");
    res.status(500).json(response);
    };
    console.log(results);
    const response = {
      message: "User created successfully",
      info: {
        username: username,
        id: results.insertId,
      },
    };

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
  });
});

app.delete("/users/:username", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const username = body.username;
  console.log(req); //email, password, username);
  const query =
    "delete from users where password=? and email=?and username=? and id=?";
  connection.query(query, [username, password, email, id], (err, results) => {
    if (err) throw err;
    console.log(results);
  });
});

app.put("/users/:username", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const username = body.username;
  console.log(req); //email, password, username);
  const query = "update users set password=?,email=?,username=? where id=?";
  connection.query(query, [username, password, email, id], (err, results) => {
    if (err) throw err;
    console.log(results);
  });
});

app.get("/users/:username", (req, res) => {
  console.log("in users/id");
  const { username } = req.params;
  const query = "select * from users where username=?";
  let ansForQuery;
  connection.query(query, [username], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});

//comments
app.post("/comments", (req, res) => {
  console.log("in post to comments. adding user");
  const bodyReq = req.body;
  const email = bodyReq.email;
  const postId = bodyReq.postId;
  const name = bodyReq.name;
  const body = bodyReq.body;
  const query =
    "  INSERT INTO comments (postId, name, email, body) VALUES (?,?,?,?);  ";
  connection.query(query, [postId, name, email, body], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("COMMENTS created successfully");
  });
});

app.delete("/comments/:id", (req, res) => {
  console.log("in put to comments. changing comments");
  const { id } = req.params;
  const bodyReq = req.body;
  const postId = bodyReq.postId;
  console.log(req); //email, password, username);
  const query = "delete from comments where postId=? and id=?";
  connection.query(query, [postId, id], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send({body:"deleted succesfuly from coments"});
  });
});

app.put("/comments/:id", (req, res) => {
  const { id } = req.params;
  const bodyReq = req.body;
  const body = bodyReq.body;
  const email = bodyReq.email;
  const postId = bodyReq.postId;
  const name = bodyReq.name;
  console.log(req); //email, password, username);
  const query =
    "UPDATE comments SET postId=?, email=?, name=?, body=? WHERE id=?;";
  connection.query(query, [postId, email, name, body, id], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("put comment successfully");
  });
});
app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const query = "select * from comments where id=?";
  let ansForQuery;
  connection.query(query, [id], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});

app.get("/users/:userId/todos", (req, res) => {
  const { userId } = req.params;
  const query = "select * from todos where userid=? ";
  let ansForQuery;
  connection.query(query, [userId], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});

// app.put("/comments/:id", (req, res) => {
//   const { id } = req.params;
//   const bodyReq = req.body;
//   const body = bodyReq.body;
//   const email = bodyReq.email;
//   const postId = bodyReq.postId;
//   const name = bodyReq.name;
//   console.log(req); //email, password, username);
//   const query =
//     "UPDATE comments SET postId=?, email=?, name=?, body=? WHERE id=?;";
//   connection.query(query, [postId, email, name, body, id], (err, results) => {
//     if (err) throw err;
//     console.log(results);
//     res.send("put comment successfully");
//   });
// });
app.put("/users/:userId/todos/:todoId", (req, res) => {
  const { userId, todoId } = req.params;
  const bodyReq = req.body;
  const completed = bodyReq.completed;
  const title = bodyReq.title;
  console.log(req); //email, password, username);
  const query =
    "UPDATE todos SET title=? ,completed=? WHERE userId=? and id=?;";
  connection.query(
    query,
    [title, completed, userId, todoId],
    (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send({body:"put todo successfully"});
    }
  );
});


app.delete("/users/:userId/todos/:todoId", (req, res) => {
  const { userId, todoId } = req.params;
  //const bodyReq = req.body;
  const query =
    "delete from todos where userId=? and id=?;";
  connection.query(
    query,
    [userId, todoId],
    (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send({body:"put todo successfully"});
    }
  );
});


app.post("/users/:userId/todos", (req, res) => {
  const { userId } = req.params;
  const bodyReq = req.body;
const title = bodyReq.title;
  const query ="  INSERT INTO todos (userId,title,completed) VALUES (?,?,?);"; 
  connection.query(
    query,
    [userId,title, 0],
    (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send({ body: res.insertId });
    }
  );
});

app.get("/users/:userId/todos/:orderByType", (req, res) => {
  const { userId, orderByType} = req.params;
  const query = `select * from todos where userid=? order by ${orderByType}`;
  let ansForQuery;
  console.log(orderByType);
  connection.query(query, [userId], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});
app.get("/users/:userId/posts", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const query = "select * from posts where userid=? ";
  let ansForQuery;
  connection.query(query, [userId], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});

app.delete("/users/posts/:postId", (req, res) => {
  const {  postId } = req.params;
  //const bodyReq = req.body;
  console.log('in delete all comments');
  const query ="delete from posts where id=? ;";
  connection.query(query,[postId],(err, results) => {
      if (err) throw err;
      console.log(results);
      res.send({body:"deleted all comments successfully"});
    }
  );
});

app.post("/users/:userId/posts", (req, res) => {
  const { userId } = req.params;
  const bodyReq = req.body;
const title = bodyReq.title;
const body = bodyReq.body;
  const query ="  INSERT INTO posts (userId,title,body) VALUES (?,?,?);"; 
  connection.query(query,[userId,title, body],(err, results) => {
      if (err) throw err;
      console.log(results);
      const postId = results.insertId;
      const createdPost = { id: postId, userId, title, body }; 
      res.send(createdPost);

    }
  );
});

app.put("/users/posts/:postId", (req, res) => {
  const { postId} = req.params;
  const bodyReq = req.body;
  const body = bodyReq.bodyPost;
  console.log(body);
  const query ="UPDATE  posts set body=? where id=?;"; 
  connection.query(query,[body, postId],(err, results) => {
      if (err) throw err;
      else
      console.log(results);
     
      //const postId = results.insertId;
      //const createdPost = { id: postId, userId, title, body }; 
      res.send(results);

    }
  );
});
//${urlPrefix}users/posts/${postId}
app.get("/users/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  console.log('in get all comments');
  const query = "select * from comments where postid=?";
  let ansForQuery;
  connection.query(query, [postId], (err, results) => {
    if (err) throw err;
    ansForQuery = results;
    console.log(ansForQuery);
    res.send(ansForQuery);
  });
});


app.delete("/users/posts/:postId/comments", (req, res) => {
  const {  postId } = req.params;
  console.log('in delete all comments');
  const query ="delete from comments where postId=? ;";
  connection.query(query,[postId],(err, results) => {
      if (err) throw err;
      console.log(results);
      res.send({body:"deleted all comments successfully"});
    }
  );
});

app.post("/users/posts/:postId/comments", (req, res) => {
  const { postId } = req.params;
  const { name, email, body } = req.body;

  const query = "INSERT INTO comments (postid, name, email, body) VALUES (?, ?, ?, ?)";
  connection.query(query, [postId, name, email, body], (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});



app.delete("/users/:userId/posts/:postId/comments/:commentId", (req, res) => {
  const { commentId, postId } = req.params;
  const query =
    "delete from comments where postId=? and id=?;";
  connection.query(
    query,
    [postId, commentId],
    (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send({body:"deleted comment successfully"});
    }
  );
});