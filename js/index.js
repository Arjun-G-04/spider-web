// VARIABLES

class PuzzleItem {
    constructor(id, position, colour) {
        this.id = id ;
        this.position = position ;
        this.colour = colour ;
    }
}

let squares = [] ;
let changed = true ;
squares.push(new PuzzleItem('1', {r:1, c:1}, "rgba(255, 0, 0, 0.7)")) ;
squares.push(new PuzzleItem('2', {r:1, c:2}, "rgba(255, 0, 0, 0.7)")) ;
squares.push(new PuzzleItem('3', {r:1, c:3}, "rgba(255, 0, 0, 0.7)")) ;
squares.push(new PuzzleItem('4', {r:2, c:1}, "rgba(0, 255, 0, 0.7)")) ;
squares.push(new PuzzleItem('5', {r:2, c:2}, "rgba(0, 255, 0, 0.7)")) ;
squares.push(new PuzzleItem('6', {r:2, c:3}, "rgba(0, 255, 0, 0.7)")) ;
squares.push(new PuzzleItem('7', {r:3, c:1}, "rgba(0, 0, 255, 0.7)")) ;
squares.push(new PuzzleItem('8', {r:3, c:2}, "rgba(0, 0, 255, 0.7)")) ;
squares.push(new PuzzleItem('9', {r:3, c:3}, "rgba(0, 0, 255, 0.7)")) ;

// FUNCTIONS
function isEligible(p1, p2) {
    if (p1.r === p2.r) {
        if (Math.abs(p1.c - p2.c) === 1) {
            return true ;
        } else {
            return false ;
        }
    } else if (p1.c === p2.c) {
        if (Math.abs(p1.r - p2.r) === 1) {
            return true ;
        } else {
            return false ;
        }
    } else {
        return false
    }
}

// MAIN FUNCTION

function main() {
    window.requestAnimationFrame(main) ; 


    // Render the squares
    if (changed) {
        box.innerHTML = "" ;
        squares.forEach((item) => {
            let gridItem = document.createElement('div') ;
            gridItem.classList.add('grid-item') ;
            gridItem.setAttribute('id', item.id) ;
            gridItem.style.backgroundColor = item.colour ;
            gridItem.style.gridRowStart = item.position.r ;
            gridItem.style.gridColumnStart = item.position.c ;
            box.appendChild(gridItem) ;
        }) ;
    }
    changed = false ;

} 


// INPUT CONTROL

window.requestAnimationFrame(main) ;

let prevItem = null ;
box.addEventListener("click", (e) => {
    clickedItem = e.target ;

    if (prevItem != null) {
        id1 = prevItem.id ;
        id2 = clickedItem.id ;

        if (id1 != id2) {
            item1 = null ;
            item2 = null ;
            console.log(id1, id2)
            console.log(squares)
            squares.forEach((item) => {
                if (item.id === id1) {
                    item1 = item ;
                }

                if (item.id === id2) {
                    item2 = item ;
                }
            }) ;

            p1 = item1.position
            p2 = item2.position
            if (isEligible(p1, p2)) {
                item1.position = p2 ;
                item2.position = p1 ;
                changed = true ;
            }
        }

        prevItem = null ;
    } else {
        prevItem = clickedItem ;
    }
}) ;