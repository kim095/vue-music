var express = require('express')
var config = require('./config/index')
var axios =require('axios')

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function (req, res) {
  let url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/getSongList',function (req,res) {
  let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url,{
    headers:{
      referer:`https://y.qq.com/n/yqq/playsquare/${req.query.disstid}.html`,
      origin:'https://y.qq.com'
    },
    params:req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
apiRoutes.get('/lyric',function (req,res) {
  let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url,{
    headers:{
      referer:'https://y.qq.com',
      host:'c.y.qq.com'
    },
    params:req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})
apiRoutes.get('/search',function (req,res) {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
  axios.get(url,{
    headers:{
      referer:'https://y.qq.com/m/index.html',
      host:'c.y.qq.com'
    },
    params:req.query
  }).then((response)=>{
    res.json(response.data)
  }).catch((e)=>{
    console.log(e)
  })
})

app.use('/api',apiRoutes)

app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port
module.exports = app.listen(port,function (err) {
  if(err){
    console.log(err)
    return
  }
  console.log(`Listening at http://localhost:${port}+\n`)
})
