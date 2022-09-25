const hello = require('fs');
const http = require('http');
const url = require('url');

//Reading Data ____________________o________

const replacetemplate = (temp, product) => {
    let output = temp.replace(/%PRODUCTNAME%/g, product.productName);
    output = output.replace(/%ID%/g, product.id);
    output = output.replace(/%IMAGE%/g, product.image);
    output = output.replace(/%FROM%/g, product.from);
    output = output.replace(/%NUTRIENTS%/g, product.nutrients);
    output = output.replace(/%QUANTITY%/g, product.quantity);
    output = output.replace(/%PRICE%/g, product.price);
    output = output.replace(/%DISCRIPTION%/g, product.discription);

    if(product.organic) output = output.replace(/%NOT_ORGANIC%/g, 'not-organic');

    return output;
}

const tempOverview = hello.readFileSync(`${__dirname}/final/templates/template-overview.html`,'utf-8');
const tempCard = hello.readFileSync(`${__dirname}/final/templates/template-card.html`,'utf-8');
const tempProduct = hello.readFileSync(`${__dirname}/final/templates/template-product.html`,'utf-8');
const data = hello.readFileSync(`${__dirname}/final/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) =>{
    const pathName = req.url;

    //overview-----------------------------------------------------------------------------------

    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200,{
            'content-type' : 'text/html'
        });
        const cardshtml = dataObj.map(el => replacetemplate(tempCard, el)).join('');
        
    }
})

