const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser');

// 处理跨域问题的插件
const cors = require('cors');

const app = express()

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost', //数据库地址
  port: '3306',//端口号
  user: 'root',//用户名
  password: 'Ab123456',//密码
  database: 'hc-made'//数据库名称
})

  //处理POST请求的
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

connection.connect()

app.get('/getgoodslist', (req, res) => {
  connection.query('SELECT * FROM goodsBaseInfo', function(err, result) {
    try{
      res.send(JSON.stringify(result , null , '  '))
    }catch(err) {
      console.log("查询失败");
    }
  })
})

// 添加数据
app.post('/addgoods', function(req, res){
  var sql_baseinfo = 'insert into goodsbaseinfo set shelfTime=?, productYear=?, name=?, price=?, type=?, coverImg=?, coverModel=?, searchType=?'
  var sql2 = 'insert into goodsimg set id=?, imgType=?,  imgUrl=?'
  var sql3 = 'insert into goodsimg set id=?, imgType=?,  imgUrl=?'
  var sql4 = 'insert into goodsimg set id=?, imgType=?,  imgUrl=?'
  var postId = null
  var data_baseinfo = [req.body.shelfTime, req.body.productYear, req.body.name, req.body.price, req.body.type, req.body.coverImg, req.body.coverModel, req.body.searchType]
  var data2 = [req.body.imgList]
  var data3 = [req.body.sizeList]
  // console.log(req.body);
  connection.query(sql_baseinfo, data_baseinfo, function(err, result) {
    try {
      postId = result.insertId
      console.log(result.insertId);
      res.send('传入数据成功');
    } catch (err) {
        console.log('新增数据失败');
        return res.status(500).json({
          error: err.message
        })
    }
  });

  connection.query(sql2, data2, function(err, result) {
    try{
      
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    }
  })


})

// connection.end()

app.listen(3000, () => {
  console.log('server run iat http://localhost:3000/');
})