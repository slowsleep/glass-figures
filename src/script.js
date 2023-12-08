const btnCreate = document.querySelector("#btn_create");

const selectFigure = document.querySelector("#figure");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const color = document.querySelector("#color");
const opacity = document.querySelector("#opacity");

const cornerCount = document.querySelector(".corner-count");
cornerCount.style.display = "none";

const leftSide = document.querySelector(".left");
const rightSide = document.querySelector(".right");


const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let w = canvas.width = rightSide.offsetWidth * 0.9;
let h = canvas.height = window.innerHeight * 0.9;
// canvas.style.backgroundColor = 'transparent';
canvas.style.backgroundColor = 'white';


btnCreate.addEventListener("click", function (e) {
    e.preventDefault();
    let newFigure;
    if (e.target.value == "polygon") {
        newFigure = createFigure(selectFigure.value, width.value, height.value, color.value, opacity.value, corner.value);
    } else {
        newFigure = createFigure(selectFigure.value, width.value, height.value, color.value, opacity.value);
    }

    // const getCoords = (elem) => {
    //     const box = elem.getBoundingClientRect();
    //     return {
    //         top: box.top + scrollY - canvas.offsetTop,
    //         left: box.left + scrollX - canvas.offsetLeft,
    //     };
    // };

    // newFigure.ondragstart = () => false;

    // newFigure.addEventListener("mousedown", function (e) {
    //     const coords = getCoords(newFigure);
    //     const shiftX = e.pageX - coords.left;
    //     const shiftY = e.pageY - coords.top;

    //     const moveAt = (e) => {
    //         newFigure.style.left = e.pageX - shiftX + "px";
    //         newFigure.style.top = e.pageY - shiftY + "px";
    //     };

    //     const theEnd = () => {
    //         document.removeEventListener("mousemove", moveAt);
    //         document.removeEventListener("mouseup", theEnd);
    //     };

    //     newFigure.style.position = "absolute";
    //     moveAt(e);

    //     document.addEventListener("mousemove", moveAt);
    //     document.addEventListener("mouseup", theEnd);
    // });
    // canvas.appendChild(newFigure);
});


selectFigure.addEventListener("change", function (e) {
    if (e.target.value == "polygon") {
        cornerCount.style.display = "flex";
    } else {
        cornerCount.style.display = "none";
    }
});

width.addEventListener("focus", function() {
    if (selectFigure.value == "square" || selectFigure.value == "circle") {
        height.value = width.value;
    } 
})

height.addEventListener("focus", function() {
    if (selectFigure.value == "square" || selectFigure.value == "circle") {
        width.value = height.value;
    } 
})

// function createFigure(figure, width, height, color = "white", opacity = 1, corner = null) {
//     let div = document.createElement("div");
//     div.style.width = width.toString() + "px";
//     div.style.height = height.toString() + "px";
//     div.style.backgroundColor = color;
//     div.classList += "figure";
//     return div;
// }

function getRGB(hex) {
    const red = parseInt(hex.substring(1, 3), 16);
    const green = parseInt(hex.substring(3, 5), 16);
    const blue = parseInt(hex.substring(5, 7), 16);

    const rgb = [red, green, blue];
    return rgb;
}

function createFigure(figure, width, height, color = "white", opacity = 1, corner = null) {
    let rgb = getRGB(color);
    rgb.push(opacity);
    let textRGBA = `rgba(${rgb.join(", ")})`;
    ctx.fillStyle = textRGBA;

    if (figure == "rectangle" || figure == "square") {
        ctx.fillRect(10, 10, width, height);
    } else if (figure == "circle" || figure == "oval") {
        ctx.arc(width / 2, width / 2, width / 2, 0, 2*Math.PI);
        ctx.fill();
    } else if (figure == "polygon") {
        ctx.beginPath();
        ctx.moveTo(160,50);
        ctx.lineTo(15,250);
        ctx.lineTo(315,250);
        ctx.fill();
    }
}
