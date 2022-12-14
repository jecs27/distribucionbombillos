const { 
    prepareCell,
    calculateSpaces
 } = require('./celdas');

const prepareMatrix = (matrix) => {
    let newMatrix = [];
    let rowMatrix = [];
    for (let y  = 0; y < matrix.length; y++) {
        let rowMatrix = [];
        for (let x = 0; x < matrix[y].length; x++) {

            rowMatrix.push(prepareCell(matrix[y][x], x, y, matrix)); 
        }
        newMatrix.push(rowMatrix);
    }
    assingBulb(newMatrix[0][0], newMatrix);
    newMatrix.forEach(line => {
        line.forEach(element => {
            // let bestCell = assingBulb(element, newMatrix);
            // if(bestCell){
            //     bestCell.illuminated = true;
            //     bestCell.bulb = true;

            // }
        });
    });

    newMatrix.forEach(line => {
        line.forEach(element => {
            element.matrix = null;
        });
    });
    return newMatrix;
}

const assingBulb = (element, newMatrix) => {
    let bestCell = element;
    for (let y  = 0; y < newMatrix.length; y++) {
        for (let x = 0; x < newMatrix[y].length; x++) {
            let activeCell = newMatrix?.[y]?.[x];
            if (!activeCell.illuminated && calculateSpaces(activeCell) > calculateSpaces(bestCell)){
                return activeCell;
            }   
        }
    }
}
    

module.exports = {
    prepareMatrix
}