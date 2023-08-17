const http = require("http");
const fs = require("fs");
const path = require("path");
const mimes = {
    html: 'text/html',
css: 'text/css',
js: 'text/javascript',
png: 'image/png',
jpg: 'image/jpeg',
gif: 'image/gif',
mp4: 'video/mp4',
mp3: 'audio/mpeg',
json: 'application/json'
};


const server = http.createServer((request, response)=>{
    let {pathname}=new URL(request.url, "http://localhost");
    //console.log(pathname);
    if(pathname === "/"){
        pathname = "/page1.html"
    }
    let root = __dirname + "/htdocs";
    let filePath= path.resolve(root + pathname);
    let ext = path.extname(filePath).slice(1);
    let type = mimes[ext];
  

    fs.readFile(filePath, (error, data)=>{
        //設定error code
        if(error){
            response.setHeader("content-type", "text/html; charset=utf-8")
            switch(error.code){
                case "ENOENT":
                    response.statusCode = 404;
                    response.end("找不到文件")
                    break;
                default:
                    response.statusCode = 500;
                    response.end("<h1>網路錯誤</h1>")
            }
            return false;

            //response.statusCode=500;
            //response.setHeader("content-type", "text/html; charset=utf-8")
            //response.end("<h1>文件讀取失敗</h1>")
               
        }
        
        if(type){
            if(ext === "html"){
                response.setHeader("content-type",  type+ ";charset=utf-8")
            }
            response.setHeader("content-type", type)
        }else{
            response.setHeader("content-type", "application/octet-stream")
        }
        response.end(data);
    })
    // if(pathname === "/htdocs/page1.html"){
    //     response.setHeader("content-type", "text/html;charset=utf-8")
    //     //let file= __dirname+"/template.html"
    //     let file= path.resolve(__dirname+"/htdocs/page1.html");
    //     let data =fs.readFileSync(file);
    //    response.end(data);
    // }else if(pathname === "/htdocs/css/page1.css"){
    //     let file= path.resolve(__dirname+"/htdocs/css/page1.css");
    //     let data =fs.readFileSync(file);
    //     response.end(data);
    // }else if(pathname === "/htdocs/js/page1.js"){
    //     let file= path.resolve(__dirname+"/htdocs/js/page1.js");
    //     let data =fs.readFileSync(file);
    //     response.end(data);
    // }else if(pathname === "/htdocs/img/photo01.jpeg"){
    //     let file= path.resolve(__dirname+"/htdocs/img/photo01.jpeg");
    //     let data =fs.readFileSync(file);
    //     response.end(data);
    // }else{
    //     request.statusCode = 404;
    //     response.setHeader("content-type", "text/html;charset=utf-8")
    //     request.end("<h1>找不到!</h1>");
    // }
    
});

server.listen(9000, ()=>{
    console.log("服務器成功啟動 http://localhost:9000/");
})