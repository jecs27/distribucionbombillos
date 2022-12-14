/**
 * It takes a value, x and y coordinates, and returns an object with the cell's id, whether it's
 * illuminated, whether it's a bulb, whether it's a wall, and an object with the cell's neighbors
 * @param value - The value of the cell.
 * @param x - The x coordinate of the cell.
 * @param y - The y coordinate of the cell.
 */
const prepareCell = (value, x, y, matrix) => {
    let cell = {};
    cell.matrix = matrix;
    cell.id = x + ',' + y; // donde se encuentra la celda
    cell.illuminated = false; //bandera para saber si la celda ya se iluminó
    cell.bulb = false; //bandera para saber si es bombillo 
    cell.wall = value == '1'; //Cuando value sea 1 marcamos como pared
    cell.neighbor = {
        top: {
            value: matrix?.[y-1]?.[x], //valor de la celda vecina
            wasCounted: false, //si ya fue contada
            x: x, //posicion en x
            y: y - 1//posicion en y
        },
        bottom: {
            value: matrix?.[y+1]?.[x],
            wasCounted: false,
            x: x,
            y: y + 1
        },
        left: {
            value: matrix?.[y]?.[x-1],
            wasCounted: false,
            x: x - 1,
            y: y
        },
        right: {
            value: matrix?.[y]?.[x+1],
            wasCounted: false,
            x: x + 1,
            y: y
        }
    };

    return cell;
}

/**
 * If the cell is a wall or already illuminated, return 0. Otherwise, return the sum of the distances
 * of the top, bottom, left, and right neighbors
 * @param cell - the cell we're calculating the distance for
 * @returns The distance from the cell to the nearest wall.
 */
const calculateSpaces = async (cell) => {
    if (cell.wall || cell.bulb) return 0;

    
    await countNeighbors(cell, 'top');
    //Conteo de vecino para poder identificar el mejor punto de referencia
    // let numSpaces = await countNeighbors(cell, 'top') + await countNeighbors(cell, 'bottom') +
    // await countNeighbors(cell, 'left' ) + await countNeighbors(cell, 'right');
    // return numSpaces; 
}

const countNeighbors = async (cell, direction) => {
    let newCell = cell;
    let spaces = 0;
    while(newCell){
        let neighborCell = getNeighborData(cell, direction);
        if (!neighborCell || neighborCell.wall){ return 0;}
        newCell = cell.matrix?.[neighborCell.y]?.[neighborCell.x];
        spaces += 1
    }
    console.log('spaces',spaces);
    return spaces;
    // let neighborCell = getNeighborData(cell, direction);
    // if (!neighborCell || neighborCell.wall || neighborCell.wasCounted){ return 0;}
    // let newCell = cell.matrix?.[neighborCell.y]?.[neighborCell.x]
    // let spaces = countNeighbors(newCell, direction) + 1;
}

const getNeighborData = (cell, direction) => {
    let neighbor = cell?.neighbor[direction];
    if (!neighbor || neighbor.wasCounted || neighbor.value == undefined){
        return neighbor?.cell;
    }
    neighbor.wasCounted = true; //Evitar que se vuelva a contar
    return cell.matrix?.[neighbor.y]?.[neighbor.x];
}

module.exports = {
    prepareCell,
    calculateSpaces,
}