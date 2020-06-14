var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')
var port = 3000
var con = mysql.createConnection({
  host:"localhost",
  user: "root",
  port: "3309",
  password: "shruti2101",
  database:"demo"
});

con.connect(function(err){
 if(err) throw err;
  console.log("connected");
});

console.log("to check the values --->" )

app.post('/Login', bodyParser.json(),(req, res) => {

  var sql="SELECT username,email,password FROM register where username='"+req.body.Username+"'"
    con.query(sql,function(err,result){
    console.log("username search");

    if (err) throw err; 
    else{
      if(req.body.Username==0||req.body.password==0){
        res.send({"message":"You have entered incomplete values"})    
      }
      else{
        if( result.length>0){
                if(req.body.Password == result[0].password){
                  console.log("Logged in");
                  res.send({"message":"You have logged in successfully","status":"200","obj_user":result[0].username,"obj_mail":result[0].email,"obj_pass":result[0].password})
                }
                else{
                  console.log("Error in Login...Incorrect password") ;
                  res.send({"message":"Your password is incorrect","status":"204"})
                  }
          }      
        else{
        console.log("Error in Login ") ;
        res.send({"message":"Username doesn't exist","status":"204"})
        }
      } 
    }
  });  
})

app.post('/Registration', bodyParser.json(), (req, res) => {
  
  console.log("Registration------------>" , req.body) ;
  console.log(req.body.Email);
  var sql="SELECT username FROM REGISTER where username='"+req.body.Username+"' ;"
  con.query(sql,function(err,result){
  
  if (err) throw err; 
  else{
      if( result.length>0 ){
              console.log("Error in Registration--username exists") ;
              res.send({"message":"This username already exists","status":"204"})    
      }      
      else{
        var sql1="SELECT password FROM REGISTER where password='"+req.body.Password+"';" 
        con.query(sql1,function(err,result1){
            if(err)throw err;
            else{
              if(req.body.Username==0||req.body.email==0||req.body.password==0){
                res.send({"message":"You have entered incomplete values"})    
              }
            else{
                if(result1.length>0){
                  console.log("Error in Registration--password exists") ;
                  res.send({"message":"This password is already taken","object":result1})
                }
                else{
                      if(req.body.Password.length<8){
                        res.send({"message":"Password must contain atleast 8 characters"})
                      }
                      else{
                          if(req.body.Password.length>15){
                            res.send({"message":"Password too long"})
                          }
                      else{
                          if(req.body.Email==0){
                            res.send({"message":"Email address is invalid"}) 
                          }
                          else{
                          var sql2 = "INSERT INTO REGISTER (username, email, password) VALUES ('"+req.body.Username+"','"+req.body.Email+"','"+req.body.Password+"')";
                          var sql3 = "INSERT INTO LOGIN (username, password) VALUES ('"+req.body.Username+"','"+req.body.Password+"')";
                          //var sql = "CREATE TABLE REGISTER (USERNAME VARCHAR(15),NAME VARCHAR(20),PASSWORD VARCHAR(15))"
                          con.query(sql2,function(err,result2){
                          console.log("Values inserted in register table",result2);
                            
                          res.send({"message":"You have successfully registered","status":"200"})
                              if (err) throw err;
                          });
                          con.query(sql3,function(err,result3){
                          console.log("Values inserted in login table",result3);
                              if (err) throw err;
                          });
                         }
                        }
                      }
                    }  
                  } 
                } 
            });    
          } 
        }     
    });
 })
 app.listen(port);

  


