var express = require('express');
var mysql = require('mysql');

var con = mysql.createConnection({
    host:"localhost",
    user: "root",
    port: "3309",
    password: "shruti2101",
    database:"demo"
});

con.connect(function(err){
   //if(err) throw err;
    console.log("connected");
    var sql = "create table details (username varchar(20),password varchar(15))";
con.query(sql,function(err,result){
    console.log("Table created");
 });    
});