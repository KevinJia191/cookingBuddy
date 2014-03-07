var express = require("express");
var logfmt = require("logfmt");
var app = express();
var pg = require('pg');

var user_controller = require('/user_controller.java');
var ingredient_controller = require('/ingredient_controller.java');
var history_controller = require('/history_controller.java');
var search_controller = require('/search_controller.java');

app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
});


app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  var body="";
  res.writeHead(200);
  res.write('<html><body>'+body+'<br>');
  res.write('<form action="login" method="post">Username <input type="text" name="username"><br>Password <input type="text" name="password"><input type="submit" value="Login" onclick=this.form.action="users/login"><input type="submit" value="add" onclick=this.form.action="users/add"><input type="submit" value="resetFixture" onclick=this.form.action="TESTAPI/resetFixture"><input type="submit" value="unitTests" onclick=this.form.action="TESTAPI/unitTests">');
  res.end('</form></body></html>');
});
app.post('/users/login', function(req, res) {
    res.header('Content-Type', 'application/json');
    var body = "<button onclick='window.location.assign(\"http://radiant-temple-1017.herokuapp.com/\");'>Click me</button>";
    //console.log(req);
    console.log(req.body);
    var username = req.body.user;
    var password = req.body.password;

    console.log("loginuser="+username);
    console.log("loginpass="+password);

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        var query = client.query('SELECT * from login_info WHERE username=\''+username+'\' AND password=\''+password+'\';', function(err, result) {
          done();
          if(err) return console.error(err);
          row_count = result.rows.length;
          if (row_count<1) {
            var jsonObject = {
              errCode: UsersModel.ERR_BAD_CREDENTIALS
            };
            var jsonForm = JSON.stringify(jsonObject);
            res.end(jsonForm);
            return;
          }

          client.query('UPDATE login_info SET count='+(result.rows[0].count+1)+' WHERE username =\''+username+'\' AND password=\''+password+'\';', function(err, result) {
            done();
            if(err) return console.error(err);
          });

          var jsonObject = {
            errCode: UsersModel.SUCCESS,
            count: (result.rows[0].count+1)
          };
          var jsonForm = JSON.stringify(jsonObject);
          res.end(jsonForm);
        });
      });
  });
  
app.post('/users/add', function(req, res) {
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
