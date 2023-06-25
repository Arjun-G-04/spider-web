// VARIABLES

let squares = [] ;
let changed = true ;
let started = false ;
let uploaded = false ;
let imgURL = "../assets/cat.jpeg" ;
let refImage = document.getElementById('refImage') ;
let dataURL = null ;
let images = [] ;
let saved = false ;
let keys = Object.keys(localStorage) ;

class PuzzleItem {
    constructor(id, position) {
        this.id = id ;
        this.position = position ;
    }
}

// JS objects
squares.push(new PuzzleItem('1', "top 0vmin left 0vmin")) ;
squares.push(new PuzzleItem('2', "top 0vmin left -28.33vmin")) ;
squares.push(new PuzzleItem('3', "top 0vmin left -56.66vmin")) ;
squares.push(new PuzzleItem('4', "top -28.33vmin left 0vmin")) ;
squares.push(new PuzzleItem('5', "top -28.33vmin left -28.33vmin")) ;
squares.push(new PuzzleItem('6', "top -28.33vmin left -56.66vmin")) ;
squares.push(new PuzzleItem('7', "top -56.66vmin left 0vmin")) ;
squares.push(new PuzzleItem('8', "top -56.66vmin left -28.33vmin")) ;
squares.push(new PuzzleItem('0', "top -56.66vmin left -56.66vmin")) ;

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

function createElementsList(imgURL) {
    let elements = [] ;
    squares.forEach((item) => {
        let gridItem = document.createElement('div') ;
        gridItem.classList.add('grid-item') ;
        gridItem.setAttribute('id', item.id) ;
        gridItem.style.backgroundPosition = item.position ;
        gridItem.style.backgroundImage = `url(${imgURL})` ;
        if (item.id === '0') {
            gridItem.style.background = 'none' ;
            gridItem.style.backgroundColor = 'rgba(225,225,225,0.8)' ;
        }
        elements.push(gridItem) ;
    }) ;

    return elements ;
}

// MAIN FUNCTION

function main() {
    window.requestAnimationFrame(main) ; 

    // Render the squares
    if (changed) {
        box.innerHTML = "" ;
        elements.forEach((item) => {
            if (item.id === '0') {
                item.style.background = 'none' ;
                item.style.backgroundColor = 'rgba(225,225,225,0.8)' ;
            }
            box.appendChild(item) ;
        }) ;
        
        let solved = true ;
        for (i = 0 ; i <= 7 ; i++) {
            if (parseInt(elements[i].id) != (i+1)) {
                solved = false ;
            }
        }

        if (solved && started) {
            alert("Awesome!!! You have solved the puzzle :)") ;
            changed = false ;
            started = false ;
        }

        if (!started) {
            savedImages.innerHTML = "<h3>Saved Images</h3>" ;
            let i = 1 ;
            images.forEach((url) => {
                imageElem = document.createElement('button') ;
                imageElem.textContent = "Image " + i.toString() ;
                imageElem.classList.add("options") ;
                savedImages.appendChild(imageElem) ;

                imageElem.addEventListener('click', () => {
                    imgURL = url ;
                    uploaded = true ;
                })

                i += 1 ;
            })
        }
    }
    changed = false ;

    if (saved) {
        savedImages.innerHTML = "<h3>Saved Images</h3>" ;
        let i = 1 ;
        images.forEach((url) => {
            imageElem = document.createElement('button') ;
            imageElem.textContent = "Image " + i.toString() ;
            imageElem.classList.add("options") ;
            savedImages.appendChild(imageElem) ;

            imageElem.addEventListener('click', () => {
                imgURL = url ;
                uploaded = true ;
            })

            i += 1 ;
        })
        saved = false ;
    }

    if (uploaded) {
        elements = createElementsList(imgURL) ;
        box.style.backgroundImage = `url(${imgURL})` ;
        refImage.src = `${imgURL}`
        changed = true ;
        uploaded = false ;
        started = false ;
    }
} 


// INPUT CONTROL

let elements = createElementsList(imgURL) ;
let randButton = document.getElementById("randomize") ;
let imageUpload = document.getElementById("imageUpload") ;
let saveButton = document.getElementById("save") ;

keys.forEach((key) => {
    images.push(localStorage.getItem(key)) ;
})

window.requestAnimationFrame(main) ;

box.addEventListener("click", (e) => {
    clickedItem = e.target ;
    emptyItem = document.getElementById("0") ;

    if (isEligible(clickedItem, emptyItem)) {
        let i1 = elements.indexOf(clickedItem) ;
        let i2 = elements.indexOf(emptyItem) ;
        [elements[i1], elements[i2]] = [elements[i2], elements[i1]] ;
        changed = true ;
        started = true ;
    }
}) ;

randButton.addEventListener("click", (e) => {
    randomOrder() ;
    changed = true ;
}) ;

imageUpload.addEventListener('change', (e) => {
    let uploadedImage = imageUpload.files[0] ;
    imgURL = URL.createObjectURL(uploadedImage) ;
    uploaded = true ;

    let fr = new FileReader() ;
    fr.readAsDataURL(uploadedImage) ;

    fr.addEventListener('load', () => {
        dataURL = fr.result ; 
    }) ;
}) ;

saveButton.addEventListener('click', () => {
    if (dataURL != null) {
        if (!images.includes(dataURL)) {
            images.push(dataURL) ;
            localStorage.setItem("image" + (images.length).toString(), dataURL) ;
            saved = true ;
        }
    }
}) ;

/*
imageUploadLinkButton.addEventListener('click', (e) => {
    let imageUploadLink = document.getElementById('imageUploadLink') ;
    imgURL = imageUploadLink.value ;
    uploaded = true ;
}) ;
*/