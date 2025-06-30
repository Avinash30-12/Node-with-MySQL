const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express= require("express");
const app =express();
const path = require("path");
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views" , path.join(__dirname ,"/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node_app',
    password:'***********'
});
let getuser = ()=>{
  return[
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password()
  ];
}

//home route
app.get("/", (req,res)=>{
  let q =`SELECT count(*) from user`;
try{
  connection.query(q, (err, result) => {
    if (err) throw err;
    let count = result[0] ["count(*)"];   //showing the count of record in database
    res.render("home.ejs" , {count});
  });
} catch(err){
    console.log(err);
    res.send(err);
}
})

//show route
app.get("/user", (req, res) => {
  const q = "SELECT * FROM user";
try{
  connection.query(q, (err, users) => {
    if (err) throw err;
    res.render("show.ejs", { users });
  });
} catch(err){
    console.log(err);
    res.send(err);
}
});

//edit route
app.get("/user/:id/edit" , (req,res)=>{
let {id} = req.params;
let q =`SELECT * from user where userid = '${id}'`;

try{
  connection.query(q,(err, results) => {
    if (err) throw err;
    let user = results[0];
    res.render("edit.ejs", { user } );
  });
} catch(err){
    console.log(err);
    res.send("err");
}
});

//update route
app.patch("/user/:id" , (req,res)=>{
let {id} = req.params;
let {password:formpass , username:newUsername } = req.body;
let q =`SELECT * from user where userid = '${id}'`;

try{
  connection.query(q,(err, results) => {
    if (err) throw err;
    let user = results[0];
    if(formpass != user.password){ //2nd step to check if password is correct or wrong
      res.send("wrong password");
    } else{
      let q = `update user SET username= '${newUsername}' WHERE userid = '${id}'`;
      connection.query(q , (req , result)=>{
        if(err) throw err;
        res.send(result);
      })
    }
    
  });
} catch(err){
    console.log(err);
    res.send("err");
}
});
//deleting from database
app.get("/user/:id/delete", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE userid='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("delete.ejs", { user });
    });
  } catch (err) {
    res.send("some error with DB");
  }
});
app.delete("/user/:id/", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `SELECT * FROM user WHERE userid='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (user.password != password) {
        res.send("WRONG Password entered!");
      } else {
        let q2 = `DELETE FROM user WHERE userid='${id}'`; //Query to Delete
        connection.query(q2, (err, result) => {
          if (err) throw err;
          else {
            console.log(result);
            console.log("deleted!");
            res.redirect("/user");
          }
        });
      }
    });
  } catch (err) {
    res.send("some error with DB");
  }
});

app.listen("8080" , ()=>{
  console.log("litining");
})

// let q = "INSERT INTO user (userid , username, email, password) VALUES ?";

// let data =[];
// for(let i = 1; i<100; i++){
//   data.push(getuser());
// }

// try{
//   connection.query(q, [data] , (err, result) => {
//     if (err) throw err;
//     console.log(result);
  
//   });
// } catch(err){
//     console.log(err);
// }
// connection.end();


