
// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

let src = '/src/assets/views/';

let login = '/user/login.html';
let profile = '/user/profile.html';
let resgister = '/user/register.html';
let pgedit = '/page/page-edit.html';
let pglist = '/page/page-list.html';
let pgnew = '/page/page-new.html';
let wbedit = '/website/website-edit.html';
let wblist = '/website/website-list.html';
let wbnew = '/website/website-new.html';
let wdch = '/widget/widget-chooser.html';
let wdhd = '/widget/widget-heading.html';
let wdim = '/widget/widget-image.html';
let wdlist = '/widget/widget-list.html';
let wdyt = '/widget/widget-youtube.html';


function modifiedSendFile (req, res, path) {
  path = src+path;
  res.sendFile(__dirname + path);
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// Point static path to dist -- For building -- REMOVE
//app.use(express.static(path.join(__dirname, 'dist')));



// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});




const port = process.env.PORT || '5000';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);



// For Build: Catch all other routes and return the index file -- BUILDING
app.get('/', function (req, res) {
  //res.sendFile(path.join(__dirname, 'dist/index.html'));
  res.sendFile(path.join(__dirname, 'src/assets/index.html'));
});


//app.get('/login.html', function (req, res) {
  //res.sendFile(path.join(__dirname, 'src/assets/views/user/login.html'));
//});

app.use(express.static(__dirname + '/src/assets/views/css'));

app.get(login, (req, res)=>{ modifiedSendFile(req, res,login);});
app.get(profile, (req, res)=>{ modifiedSendFile(req, res,profile);});
app.get(resgister, (req, res)=>{ modifiedSendFile(req, res, resgister);});
app.get(pgedit, (req, res)=>{ modifiedSendFile(req, res, pgedit);});
app.get(pglist, (req, res)=>{ modifiedSendFile(req, res, pglist);});
app.get(pgnew, (req, res)=>{ modifiedSendFile(req, res, pgnew);});
app.get(wbedit, (req, res)=>{ modifiedSendFile(req, res, wbedit);});
app.get(wblist, (req, res)=>{ modifiedSendFile(req, res, wblist);});
app.get(wbnew, (req, res)=>{ modifiedSendFile(req, res, wbnew);});
app.get(wdch, (req, res)=>{ modifiedSendFile(req, res, wdch);});
app.get(wdhd, (req, res)=>{ modifiedSendFile(req, res, wdhd);});
app.get(wdim, (req, res)=>{ modifiedSendFile(req, res, wdim);});
app.get(wdlist, (req, res)=>{ modifiedSendFile(req, res, wdlist);});
app.get(wdyt, (req, res)=>{ modifiedSendFile(req, res, wdyt);});

server.listen( port , () => console.log('Running on port 5000'));
