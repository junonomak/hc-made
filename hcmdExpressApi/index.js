const mysql = require('mysql')
const express = require('express')
const bodyParser = require('body-parser');

// 处理跨域问题的插件
const cors = require('cors');

const app = express()

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

// 获取商品列表
app.get('/getgoodslist', async (req, res) => {
  const goodsList = []
  connection.query('SELECT * FROM goodsBaseInfo', function(err, result) {
    try{
      // res.send(JSON.stringify(result , null , '  '))
      for(let i = 0;i < result.length;i++){
        goodsList.push({
          id : result[i].id,
          shelfTime : result[i].shelfTime,
          productYear: result[i].productYear,
          name: result[i].name,
          price: result[i].price,
          type: result[i].type,
          message: result[i].message,
          detailsize: result[i].detailsize,
          coverImg: result[i].coverImg,
          coverModel: result[i].coverModel,
          searchType: result[i].searchType,
          discount: result[i].discount,
          goodsInformation: [],
          goodsimg: []
        }) 
      }
    res.send(goodsList)
    }catch(err) {
      console.log("查询失败");
    }
  })
})

// 获取id对应的img图片
app.get('/getgoodsimglist', (req, res) => {
  const sql_getimg = 'select imgType, GROUP_CONCAT(imgUrl) as imgUrl from goodsimg where id=? group by imgType;'
  connection.query(sql_getimg, req.query.id, function(err, result) {
    try{
      for(let i =0; i < result.length; i++){
				result[i].imgUrl = result[i].imgUrl.split(',')
			}
      res.send(result)
    }catch(err) {
      console.log("查询失败");
    }
  })
})

// 获取id对应的尺码信息
app.get('/getgoodssizelist', (req, res) => {
  const sql_getstock = 'select colour, GROUP_CONCAT(size) as size, GROUP_CONCAT(count) as count from goodssize where id=? group by colour'
  connection.query(sql_getstock, req.query.id, function(err, result) {
    try{
      for(let i =0; i < result.length; i++){
				result[i].size = result[i].size.split(',')
				result[i].count = result[i].count.split(',')
        const stock = []
        for(let k = 0;k< result[i].size.length;k++){
					stock.push({
						size: result[i].size[k],
						count: result[i].count[k]
					})
				}
        result[i] = {
          colour: result[i].colour,
          stock: stock
        }
			}
      res.send(result)
    }catch(err) {
      console.log("查询失败");
    }
  })
})

// 通过id来获取商品列表
app.get('/getidgoodslist', async (req, res) => {
  const goodsList = []
  connection.query('SELECT * FROM goodsBaseInfo where id=?', req.query.id, function(err, result) {
    try{
      for(let i = 0;i < result.length;i++){
        goodsList.push({
          id : result[i].id,
          shelfTime : result[i].shelfTime,
          productYear: result[i].productYear,
          name: result[i].name,
          price: result[i].price,
          type: result[i].type,
          message: result[i].message,
          detailsize: result[i].detailsize,
          coverImg: result[i].coverImg,
          coverModel: result[i].coverModel,
          searchType: result[i].searchType,
          discount: result[i].discount,
          goodsInformation: [],
          goodsimg: []
        }) 
      }
      res.send(goodsList)
    }catch(err) {
      console.log("查询失败");
    }
  })
})

// 获取用户列表
app.get('/getuseraccount', (req, res) => {
  sql_getuseraccount='SELECT password FROM user where username=?'
  connection.query(sql_getuseraccount, req.query.username, function(err, result) {
    try{
      res.send(result)
    }catch(err) {
      console.log("查询失败");
    }
  })
})

// 获取lookbooks图片列表
app.get('/getlookbooks', (req, res) => {
  var sql_getlookbooksimg = 'select productYear, GROUP_CONCAT(imgUrl) as imgUrl from lookbooksimg where productYear=? group by productYear'
  connection.query(sql_getlookbooksimg, req.query.productYear, function(err, result) {
    try{
      res.send(result)
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    } 
  })
})

// 获取用户购物车数据
app.get('/getcart', (req, res) => {
  const sql_getcart = 'select username, GROUP_CONCAT(goodsid) as goodsid , GROUP_CONCAT(colour) as colour, GROUP_CONCAT(size) as size,GROUP_CONCAT(count) as count from cart where username=?'
  connection.query(sql_getcart, req.query.username, function(err, result) {
    try{

      const group_goodsid = result[0].goodsid.split(',')
      const group_colour = result[0].colour.split(',')
      const group_size = result[0].size.split(',')
      const group_count = result[0].count.split(',')
      const list = []
      for(let i=0;i<group_goodsid.length;i++){
        list.push({
          username: result[0].username,
          goodsid: group_goodsid[i],
          colour: group_colour[i],
          size: group_size[i],
          count: group_count[i]
        })
      }
      res.send(list)
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    } 
  })
})

// 获取用户地址信息
app.get('/getaddresslist', (req, res) => {
  const sql_getaddress = 'select username, GROUP_CONCAT(province) as province , GROUP_CONCAT(city) as city, GROUP_CONCAT(area) as area,GROUP_CONCAT(address) as address from address where username=?'
  connection.query(sql_getaddress, req.query.username, function(err, result) {
    try{
      const group_province = result[0].province.split(',')
      const group_city = result[0].city.split(',')
      const group_area = result[0].area.split(',')
      const group_address = result[0].address.split(',')
      const list = []
      for(let i=0;i<group_province.length;i++){
        list.push({
          province: group_province[i],
          city: group_city[i],
          area: group_area[i],
          address: group_address[i]
        })
      }
      res.send(list)
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    } 
  })
})

// 获取订单列表
app.get('/getorderlist', (req, res) => {
console.log(req.query.username);
  connection.query('select * from goodsorder where username=?', req.query.username, function(err, result) {
    try{
      res.send(result)
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    } 
  })
})

// 添加lookbooks图片
app.post('/addlookbooks', (req, res) => {
  var sql_lookbooksimg = 'insert into lookbooksimg set productYear=?, imgUrl=?'
  for(let i=0;i<req.body.length;i++){
    var data_lookbooksimg = [req.body[i].productYear, req.body[i].imgUrl]
    console.log(data_lookbooksimg);
    connection.query(sql_lookbooksimg, data_lookbooksimg, function(err, result) {
      try{
        console.log('商品图片传入成功');
      }catch(err) {
        return res.status(500).json({
          error: err.message
        })
      } 
    })
  }
  res.send('图片的传入成功!')
})

// 添加商品数据
app.post('/addgoods', (req, res) => {
  var sql_baseinfo = 'insert into goodsbaseinfo set shelfTime=?, productYear=?, name=?, price=?, type=?, message=? , detailsize=?, coverImg=?, coverModel=?, searchType=?'
  var sql_goodssize = 'insert into goodssize set id=?, colour=?,  size=?, count=?'
  var sql_goodsimg = 'insert into goodsimg set id=?, imgType=?, imgUrl=?'
  // 根据id跨表传输数据
  var postId = null

  for(let i = 0; i<req.body.fileList.length; i++){
    if(req.body.fileList[i].type === 'cover'){
      var coverUrl = req.body.fileList[i].url
      console.log(req.body.fileList[i]);
    }else if(req.body.fileList[i].type === 'covermodel'){
      var covermodelUrl = req.body.fileList[i].url
      console.log(req.body.fileList[i]);
    }
  }
  var data_baseinfo = [req.body.shelfTime, req.body.productYear, req.body.name, req.body.price, req.body.type, req.body.message, req.body.detailsize, coverUrl, covermodelUrl, req.body.searchType]
  var data_goodssize
  var data_goodsimg

  // console.log(req.body);
// 传入goodsbaseinfo数据
  connection.query(sql_baseinfo, data_baseinfo, function(err, result) {
    try {
      postId = result.insertId
      console.log(result.insertId);
      res.send('传入数据成功');
    } catch (err) {
      console.log(req.body);
        console.log('新增数据失败');
        return res.status(500).json({
          error: err.message
        })
    }
  });


  
  // 写入尺码数据
  setTimeout(() => {
    for(let i =0;i<req.body.colouSizeCountList.length;i++){
      for(let j =0;j<req.body.colouSizeCountList[i].stock.length;j++){
        data_goodssize = [postId, req.body.colouSizeCountList[i].colour,  req.body.colouSizeCountList[i].stock[j].size, req.body.colouSizeCountList[i].stock[j].count]
        console.log(data_goodssize);
        connection.query(sql_goodssize, data_goodssize, function(err, result) {
          try{
            console.log('尺码信息传入成功');
          }catch(err) {
            return res.status(500).json({
              error: err.message
            })
          } 
        })
      }
    }  
  }, 50);

  // 写入图片数据
  setTimeout(() => {
    for(let i = 0; i<req.body.fileList.length; i++){
      data_goodsimg = [postId, req.body.fileList[i].type, req.body.fileList[i].url]
      // console.log(data_goodsimg);
      connection.query(sql_goodsimg, data_goodsimg, function(err, result) {
        try{
          console.log('图片地址传入成功');
        }catch(err) {
          return res.status(500).json({
            error: err.message
          })
        }
      })
    }
  }, 50);


})

// 添加账户
app.post('/adduser', (req, res) => {
  connection.query('insert into user set username=?, password=?', [req.body.userName, req.body.pass], function(err, result) {
    try{
      console.log('账号创建成功!');
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    } 
  })
  const a = {userName:req.body.userName, pass:req.body.pass}
  res.send(a)
})

// 添加进购物车
app.post('/addcart', (req, res) => {
  const data_addcart = [req.body.username, req.body.goodsid, req.body.colour, req.body.size]
  connection.query('insert into cart set username=?, goodsid=?, colour=?, size=?', data_addcart, function(err, result) {
    try{
      console.log('成功添加进购物车!');
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    } 
  })
  const a = {username:req.body.username, goodsid:req.body.goodsid, colour:req.body.colour, size:req.body.size}
  res.send(a)
})

// 添加用户地址
app.post('/addaddress', (req, res) => {
  const data_addaddress = [req.body.username, req.body.province, req.body.city, req.body.area, req.body.address]
  connection.query('insert into address set username=?, province=?, city=?, area=?, address=?', data_addaddress, function(err, result) {
    try{
      console.log('成功添加用户地址!');
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    } 
  })
  const a = {username:req.body.username, goodsid:req.body.goodsid, colour:req.body.colour, size:req.body.size}
  res.send(a)
})

// 删除用户地址
app.post('/deleteaddress', (req, res) => {
  const data_deleteaddress = [req.body.username, req.body.province, req.body.city, req.body.area, req.body.address]
  connection.query('delete from address where username=? and province=? and city=? and area=? and address=?', data_deleteaddress, function(err, result) {
    try{
      console.log('成功删除用户地址!');
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    } 
  })
})

// 删除购物车信息
app.post('/deletecart', (req, res) => {
  const data_deletecart = [req.body.username, req.body.goodsid, req.body.colour, req.body.size]
  console.log(req.body);
  connection.query('delete from cart where username=? and goodsid=? and colour=? and size=?', data_deletecart, function(err, result) {
    try{
      console.log('成功删除该购物车信息!');
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    } 
  })
})

// count变化
app.post('/changecartcount', (req, res) => {
  const data_deletecart = [req.body.count, req.body.username, req.body.goodsid, req.body.colour, req.body.size]
  connection.query('update cart set count=? where username=? and goodsid=? and colour=? and size=?', data_deletecart, function(err, result) {
    try{
      console.log('成功更改count!');
    }catch(err) {
      return res.status(500).json({
        error: err.message
      })
    } 
  })
})

// 提交订单
app.post('/addorder', (req, res) => {
  console.log(req.body);
  for(let i=0;i<req.body.length;i++){
    const data_addorder = [req.body[i].username, req.body[i].goodsid, req.body[i].colour, req.body[i].size, req.body[i].count, req.body[i].province, req.body[i].city, req.body[i].area, req.body[i].address, req.body[i].paytime, req.body[i].trackingnumber]
    const sql_addorder = 'insert into goodsorder set username=?, goodsid=?, colour=?, size=?, count=?, province=?, city=?, area=?, address=?, paytime=?, trackingnumber=?'
    
    connection.query(sql_addorder, data_addorder, function(err, result) {
      try{
        console.log('提交订单成功');
      }catch(err) {
        return res.status(500).json({
          error: err.message
        })
      } 
    })
  }
  res.send('aa')
})

// connection.end()

app.listen(3000, () => {
  console.log('server run iat http://localhost:3000/');
})