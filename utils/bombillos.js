'use strict';
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../uploads');

const { prepareMatrix } = require('./matriz');

const matrixDistribution = (filename) => {
    let matrix = [];
    let correctData = '';
    const fileStream = `${directoryPath}/${filename}`;
    let data = fs.readFileSync(fileStream, 'utf8');
    const lines = data.split("\n");
    lines.forEach(line => {
        if(lines[0].length != line.length)
            return;
        const values = line.split("").map(a => {
            if(a == '0' || a == '1'){
                return a.trim();
            } else {
                return '0'
            }
        }); 
        correctData += values.toString()+' \n';
        matrix.push(values);
    });
    let response = prepareMatrix(matrix);
    fs.writeFileSync(fileStream, correctData.replaceAll(',',' ').toString());
    return response;
}

module.exports = {
    matrixDistribution,
}