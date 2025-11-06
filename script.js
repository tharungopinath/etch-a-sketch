function createGrid(size) {
    if(size > 0 && size <= 100 && Number.isInteger(Number(size))){
        grid.innerHTML = "";
        dimensions = 100/size;
        for (let i = 0; i < size * size; i++) {
            const box = document.createElement('div');
            box.classList.add('gridBox');
            box.id = `${i}`;
            box.style.width = `${dimensions}%`;
            box.style.height = `${dimensions}%`;
            grid.appendChild(box);
        }
    }
    else {
        alert("Incorrect value for Grid size. Please make sure it is an integer between 1-100 (inclusive).")
        console.log("" + size + " " + typeof(size));
    }
}

const grid = document.querySelector("#gridContainer");
const gridSubmit = document.querySelector("#gridSubmit");
const gridInput = document.querySelector("#gridInput");
gridSubmit.addEventListener("click", (event) => {
    const gridSize = gridInput.value;
    createGrid(gridSize);
});

const colorInput = document.querySelector("#colorInput");
const colorSubmit = document.querySelector("#colorSubmit");
let color = "black";

colorSubmit.addEventListener("click", (event) => {
    let input = colorInput.value;
    if (input.indexOf(' ') != -1){
        input = input.replace(" ", "");
    } 
    if (input.indexOf('-') != -1) {
        input = input.replace("-", "");
    }
    if (CSS.supports('color', input)){
        color=input;
        coloringMode="constant";
    }
    else {
        alert("Invalid color. Please enter a valid color.");
    }
});

grid.addEventListener("mouseover", (event) => {
    const target = event.target;
   
    if (target && target.classList && target.classList.contains("gridBox")) {
        
        if (coloringMode === "random"){
            const target = event.target;
            const r = Math.floor(Math.random() * 256); 
            const g = Math.floor(Math.random() * 256); 
            const b = Math.floor(Math.random() * 256); 
            color = `rgb(${r}, ${g}, ${b})`;
        }
        target.style.backgroundColor = color;
    }
});

const erase = document.querySelector("#erase");
erase.addEventListener("click", (event)=>{
    coloringMode="constant";
    color = "white";
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", (event) => {
    const boxes = grid.querySelectorAll('.gridBox');
    boxes.forEach(box => {
        box.style.backgroundColor = 'white';
    });
});

const random = document.querySelector("#random");
random.addEventListener("click", (event)=>{
    coloringMode = "random";
});

createGrid(16);
let coloringMode = "constant";