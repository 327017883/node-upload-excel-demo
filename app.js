let path = require('path');
let fs = require('fs'); 

let express = require('express');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let bodyParser = require('body-parser');
let compression = require('compression');

let app = express();

app.set('views', path.join(__dirname, 'statics/views'));
app.engine('html', require('express-art-template'));
app.set('view engine','html');

app.use(express.static(path.join(__dirname, '/statics')));
app.use(compression()); // 开启 gzip 压缩
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({
//      secret: '12345',
//      name: 'testCookie',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
//      cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
//      resave: false,
//     saveUninitialized: true,
// }));


var routes = require('./routes/index');
routes(app);

let port = process.env.PORT || 3000;
var http = require('http');
var server = http.createServer(app);
server.listen(port, function(){
  console.log('Server running at http://' + getIp() + ':' + port +'/')
});

// 获取本地 以太网 IPv4 的 ip 地址
function getIp(){
    let os = require('os');
    let ifaces = os.networkInterfaces();
    for (let dev in ifaces) {  
      if('以太网' == dev){
        for(let i = 0, len = ifaces[dev].length; i < len; i++){
          if (ifaces[dev][i].family == 'IPv4') {
            return ifaces[dev][i].address;
          }  
        }
      }
  }
}