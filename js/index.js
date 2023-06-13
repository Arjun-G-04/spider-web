// VARIABLES

class PuzzleItem {
    constructor(id, colour) {
        this.id = id ;
        this.colour = colour ;
    }
}

// JS objects
let squares = [] ;
let changed = true ;
squares.push(new PuzzleItem('1', "rgba(255, 0, 0, 0.7)")) ;
squares.push(new PuzzleItem('2', "rgba(255, 0, 0, 0.7)")) ;
squares.push(new PuzzleItem('3', "rgba(255, 0, 0, 0.7)")) ;
squares.push(new PuzzleItem('4', "rgba(0, 255, 0, 0.7)")) ;
squares.push(new PuzzleItem('5', "rgba(0, 255, 0, 0.7)")) ;
squares.push(new PuzzleItem('6', "rgba(0, 255, 0, 0.7)")) ;
squares.push(new PuzzleItem('7', "rgba(0, 0, 255, 0.7)")) ;
squares.push(new PuzzleItem('8', "rgba(0, 0, 255, 0.7)")) ;
squares.push(new PuzzleItem('0', "rgba(0, 0, 0, 0.7)")) ;

// Document objects
let elements = [] ;
squares.forEach((item) => {
    let gridItem = document.createElement('div') ;
    gridItem.classList.add('grid-item') ;
    gridItem.setAttribute('id', item.id) ;
    gridItem.style.backgroundColor = item.colour ;
    elements.push(gridItem) ;
}) ;

// FUNCTIONS
function isEligible(item, empty) {
    let givenIndex = elements.indexOf(item) ;
    let emptyIndex = elements.indexOf(empty) ;

    let eligible = [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [4, 6, 8], [5, 7]] ;
    if (eligible[emptyIndex].includes(givenIndex)) {
        return true ;
    } else {
        return false ;
    }
}

function randomOrder() {
    while (true) {
        let count = 0 ;
        elements.sort(() => Math.random() - 0.5) ;
        
        for (i = 0 ; i < elements.length - 1 ; i++) {
            for (j = i + 1 ; j < elements.length ; j++) {
                let first = parseInt(elements[i].id) ;
                let second = parseInt(elements[j].id) ;
                if (first != 0 && second != 0) {
                    if (second < first) {
                        count += 1 ;
                    }
                }
            }
        }

        if (count % 2 === 0) {
            break
        }
    }
}

// MAIN FUNCTION

function main() {
    window.requestAnimationFrame(main) ; 


    // Render the squares
    if (changed) {
        box.innerHTML = "" ;
        elements.forEach((item) => {
            box.appendChild(item) ;
        }) ;
    }
    changed = false ;

} 


// INPUT CONTROL

window.requestAnimationFrame(main) ;
randomOrder() ;
box.addEventListener("click", (e) => {
    clickedItem = e.target ;
    emptyItem = document.getElementById("0") ;

    if (isEligible(clickedItem, emptyItem)) {
        let i1 = elements.indexOf(clickedItem) ;
        let i2 = elements.indexOf(emptyItem) ;
        [elements[i1], elements[i2]] = [elements[i2], elements[i1]] ;
        changed = true ;
    }
}) ;