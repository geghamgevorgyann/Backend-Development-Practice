 const http = require('http')
 const url = require('url')

 const {handeleReade,handleCreate,handleUpdate,handleDelete} = require('./methods')

 const server = http.createServer((req,res) => {
   const parsedURL = url.parse(req.url,true)
   const resource = parsedURL.pathname
   const method =  req.method

   if(resource === '/items' && method === 'GET' ){
    handeleReade(req,res)
   }
   else if(resource === '/items' && method === 'POST'){
    handleCreate(req,res)
   }
   else if(resource.startsWith('/items') && method === 'PUT'){
    handleUpdate(req,res,parsedURL)
   }
   else if(resource.startsWith('/items') && method === 'DELETE'){
    handleDelete(req,res,parsedURL)
   }
   else {
    res.writeHead(404, {'Content-type': 'application/json'})
    res.end(JSON.stringify({message: 'Not found!!!'}))
   }
 })


 const PORT = 3001
 server.listen(PORT,() => {
    console.log(`Server is runing on http://localhost:${PORT}`);
 })