'use strict';
const path = require('path');
const fs = require('fs');

const {
    matrixDistribution
} = require('../utils/bombillos')
const directoryPath = path.join(__dirname, '../uploads');

const uploadFile = async(req, res) => {
    try {
        if (req.files == undefined) {
            return res.status(404).send({ status: 404, message: 'A file is required.', data: {} });
        }
        let response;
        if (req.files.length > 0) {
            for(let file of req.files) {
                response = matrixDistribution(file.filename)
            };
            return res.status(200).send({ status: 200, message: '_OK_.', data: response });
        } else {
            return res.status(404).send({ status: 404, message: 'A file is required.', data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 500, message: 'An error was generated when trying to upload File.', data: { error: error.toString() } });
    }
}
function censor(censor) {
    var i = 0;
    
    return function(key, value) {
      if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
        return '[Circular]'; 
      
      if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
        return '[Unknown]';
      
      ++i; // so we know we aren't using the original object anymore
      
      return value;  
    }
  }

const showPage = async(req, res) => {
    let dataPage = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf8');
    if(req.query?.filename != undefined){
        dataPage = dataPage.replace('{{title}}',`<button onclick="history.back()">Go Back</button><br>Solución al archivo ${req.query?.filename}`);

        const fileStream = `${directoryPath}/${req.query?.filename}`;
        const data = fs.readFileSync(fileStream, 'utf8');
        const lines = data.split("\n");
        let matrix = '';
        lines.forEach(line => {
            matrix += '<tr>';
            line.split(" ").forEach(a => {
                if(a.trim() == '1'){
                    matrix += '<th style="background-color:black; width:50px; height:40px">'+a.trim()+'</th>';
                } else if(a.trim() == '0'){
                    matrix += '<th style="width:50px; height:40px"></th>';
                } else if(a.trim() == '2'){
                    matrix += '<th style="background-color:yellow; width:50px; height:40px"></th>';
                }
               
            });
            matrix +=('</tr>');
        });
        dataPage = dataPage.replace('{{body}}','<table>'+matrix+'</table>')
    } else{
        let arrFiles = [];


        const files = fs.readdirSync(directoryPath);
        files.map(file => {
            if(file.substring(0,1)!='.')
                arrFiles.push(`<a href="?filename=${file}"> ${file}</a>`);
        });
        dataPage = dataPage.replace('{{title}}','Listado de archivos');
        dataPage = dataPage.replace('{{body}}',arrFiles)
    }
    res.send( dataPage ); 
}

module.exports = {
    uploadFile,
    showPage
}