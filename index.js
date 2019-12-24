const PDFDocument = require('pdfkit');
const fs = require('fs');
const express = require('express');
const app = express();
const doc =new PDFDocument;
const addPDF = require('./functions/function')


app.get('/',addPDF,(req,res)=>{
    



})

app.listen(3000,()=>{
    console.log('server run')
})


