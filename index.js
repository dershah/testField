const hello = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./final/modules/replaceTemplate');


//const txtIn = hello.readFileSync('./final/txt/input.txt', 'utf-8');
//console.log(txtIn);
//const txtOut = `This is what we know about Avocado: ${txtIn}.\nCreated on: ${Date.now()}`;//hello.writeFileSync('./final/txt/oputtxt.txt', txtOut);//console.log(txtOut);/*hello.readFile('./final/txt/start.txt', 'utf-8',(err, data1)=>{ console.log(data1); hello.readFile(`./final/txt/${data1}.txt`, 'utf-8',(err, data)=>{ console.log(data); }})*///Server-------------------------
//reading Data................................................................
/* const replaceTemplate = (temp, product) => { 
    let output = temp.replace(/%PRODUCTNAME%/g, product.productName); 
    output = output.replace(/%ID%/g, product.id); 
    output = output.replace(/%IMAGE%/g, product.image); 
    output = output.replace(/%FROM%/g, product.from); 
    output = output.replace(/%NUTRIENTS%/g, product.nutrients); 
    output = output.replace(/%QUANTITY%/g, product.quantity); 
    output = output.replace(/%PRICE%/g, product.price); 
    output = output.replace(/%DESCRIPTION%/g, product.description);

    if(!product.organic) output = output.replace(/%NOT_ORGANIC%/g, 'not-organic');
    
    return output;
} */

const tempOverview = hello.readFileSync(`${__dirname}/final/templates/template-overview.html`, 'utf-8');
const TempCard = hello.readFileSync(`${__dirname}/final/templates/template-card.html`, 'utf-8');
const tempProduct = hello.readFileSync(`${__dirname}/final/templates/template-product.html`, 'utf-8');
const data = hello.readFileSync(`${__dirname}/final/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el=> slugify(el.productName, {lower: true}));
console.log(slugs);

const server = http.createServer((req, res) =>{ 
    
    //console.log(req.url);
    const { query, pathname } = url.parse(req.url, true);


    //Overview Page 
    if(pathname === '/' || pathname === '/overview'){ 
        res.writeHead(200, {'content-type':'text/html'}); 
        const cardsHtml = dataObj.map(el => replaceTemplate(TempCard, el)).join(''); 
        const output = tempOverview.replace(/%PRODUCT_CARDS%/g, cardsHtml); 
        res.end(output);


        //Product Page 
    } else if(pathname === '/product'){ 
        res.writeHead(200, { 'Content-type': 'text/html'}); 
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        console.log(product);
        res.end(output);

    //Api Page 
    } else if(pathname === '/api') { 
        //Turing String into js object........ 
        res.writeHead(200, { //we cannot send the object 
            'content-type':'application/json' //we are sending the data as 'string'.
        });
        res.end(data);


    //Error Page 
    } else{ 
        res.writeHead(404, {
            'Content-type': 'text/html'
        }); 
    res.end("<h1>HTTP 404<br> Sorry, No such pages are found *-*<h1>"); 
    }
});
server.listen(8000, '127.0.0.1', () =>{ 
    console.log('Listening to the Requests on Port 8000');
});