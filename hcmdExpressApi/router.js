const express = require('express')

const router = express.Router() 

router.get('/aaa', (req, res) => {
  res.send('我是路由器中间件')
})

module.exports = router