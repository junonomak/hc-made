const express = require('express')
const fs = require('fs')
const { getDb , savedb } = require('./getgoodslist')

const app = express()
const router = require('./router')

// 解析post的表单请求体
app.use(express.json())
// 解析form key value的表单请求体
app.use(express.urlencoded())


// 中间件
// req 请求对象
// res 响应对象
// next 下一个中间件
// 会匹配所有的请求

// 函数中间件
// const function fn(req, res, next) {
//   console.log('我是函数中间件');
// }
// app.use(fn)

// 限定路径的中间件
// app.use('/test/:id', ()req, res, next() => {})

// 限定请求方法的中间件  限定get方法
// app.get((req, res, next) => {})

app.use((req, res, next) => {
  console.log('我是中间件');
  console.log(req.method, req.url);

  // 交出执行权,然后继续匹配执行
  next()
})


// req:请求对象  res:响应对象 



//请求json文件数据
app.get('/goodsList', async (req, res) => {
  try{
    const db = await getDb()
    res.status(200).json(db.goodsList)
  } catch(err){
    next(err)
  }
})

//根据id请求json文件数据
app.get('/goodsList/:id', async (req, res) => {
  try {
    const db = await getDb()
    const goodslist = db.goodsList.find(goodslist => goodslist.id === req.params.id)
    res.status(200).json(goodslist)
  }catch(err) {
    next(err)
  }
})


// app.post()
// 1.获取客户端请求体参数
// 2.数据验证
// 3.数据验证通过,把数据存储到db中
app.post('/test', async (req, res) => {
  try {
      const testdata = req.body
    //  判断传入是否有name
      if(!testdata.name){
      return res.status(402).json({
        error: 'name is required'
      })
      }
    //  获取json文件数据
      const db = await getDb()
    //  设置test的id
      const lastid = db.test[db.test.length - 1]
      testdata.id = lastid ? lastid.id + 1 : 1
    //  将testdata传入db.test中
      db.test.push(testdata)
    //  保存新的db到json文件中
      await savedb(db)
    //  发送结束响应
      res.status(200).json(db.test)
  } catch(err) {
    next(err)
  }
})


// 修改数据
app.patch('/test/:id', async (req, res) => {
  try {
    const patchData = req.body
    const db = await getDb()
    const dbtestdata = db.test.find(testdata => testdata.id === Number.parseInt(req.params.id))

    if(!dbtestdata){
      return res.status(404).end()
    }

    // 有的话就覆盖,没有的话就新增
    Object.assign(dbtestdata, patchData)

    await savedb(db)

    res.status(200).json(dbtestdata)

  } catch(err) {
    next(err)
  }
})

// 删除数据
app.delete('/test/:id', async (req, res) => {
  try {
    const db = await getDb()
    const dataindex = db.test.findIndex(data => data.id === Number.parseInt(req.params.id))

    if(dataindex === -1){
      return res.status(404).end()
    }

    db.test.splice(dataindex, 1)

    await savedb(db)

    res.status(204).json(db.test)

  } catch(err) {
    next(err)
  } 
})


// 路由中间件
// 可以给路由强行增加一个前缀
// app.use('/aaa', router)
app.use(router)


// 错误中间件
app.use((err, req, res, next) => {
  console.log('错误', err);
  return res.status(500).json({
    error: err.message
  })
})


app.listen(3000, () => {
  console.log('server run iat http://localhost:3000/');
})

