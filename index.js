var express = require('express');
var app = express();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.get('/:key', function(req, res){
    console.log(req.params.key);
    var key = req.params.key;
    var svg = generateSVG(key);
    res.send(svg);
});


function generateSVG(key) {
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    
    global.window = {document: {createElementNS: () => {return {}} }};
    global.navigator = {};
    global.document = dom.window.document;
    global.btoa = () => {};
    
    var boleto = require('boleto.js');
  
    var number = key;
    var result = new boleto(number);

    delete global.window;
    delete global.navigator;
    delete global.btoa;

    return result.toSVG();

}


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});