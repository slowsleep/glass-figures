const btnCreate = document.querySelector("#btn_create");

const selectFigure = document.querySelector("#figure");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const color = document.querySelector("#color");
const opacity = document.querySelector("#opacity");
const corner = document.querySelector("#corner");

const divCorner = document.querySelector(".corner-count");
divCorner.style.display = "none";

const leftSide = document.querySelector(".left");
const rightSide = document.querySelector(".right");

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let w = (canvas.width = rightSide.offsetWidth * 0.9);
let h = (canvas.height = window.innerHeight * 0.9);
// canvas.style.backgroundColor = 'transparent';
canvas.style.backgroundColor = "white";

let x = 0;
let y = 0;

let listFigures = [];


btnCreate.addEventListener("click", function (e) {
    e.preventDefault();
    let newFigure;
    if (selectFigure.value == "polygon") {
        newFigure = makeFigure(selectFigure.value, x, y, width.value, height.value, color.value, opacity.value, corner.value);

    } else {
        newFigure = makeFigure(selectFigure.value, x, y, width.value, height.value, color.value, opacity.value);
    }
    drawFigure(newFigure)
});

selectFigure.addEventListener("change", function (e) {
    if (e.target.value == "polygon") {
        divCorner.style.display = "flex";
    } else {
        divCorner.style.display = "none";
    }
});

width.addEventListener("focus", function () {
    if (selectFigure.value == "square" || selectFigure.value == "circle") {
        height.value = width.value;
    }
});

height.addEventListener("focus", function () {
    if (selectFigure.value == "square" || selectFigure.value == "circle") {
        width.value = height.value;
    }
});


function getTextRGBA(color, opacity) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);
    const rgba = [red, green, blue, opacity];
    return `rgba(${rgba.join(", ")})`;
}


function drawRect(figure) {
    ctx.fillRect(10, 10, figure.width, figure.height);
}


function drawCircle(figure) {
    ctx.arc(figure.width / 2, figure.width / 2, figure.width / 2, 0, 2 * Math.PI);
    ctx.fill();
}


function drawPolygon(figure) {
    ctx.beginPath();
    ctx.moveTo(160, 50);
    ctx.lineTo(15, 250);
    ctx.lineTo(315, 250);
    ctx.closePath();
    ctx.fill();
}


function drawFigure(figure) {
    ctx.fillStyle = figure.color;

    if (figure.shape == "rectangle" || figure.shape == "square") {
        drawRect(figure);
    } else if (figure.shape == "circle" || figure.shape == "oval") {
        drawCircle(figure);
    } else if (figure.shape == "polygon") {
        drawPolygon(figure);
    }
}


function makeFigure(shape, x=0, y=0, width, height, color="#ffffff", opacity=1, corner=false) {
    let figure = {
        shape: shape,
        x: Number(x),
        y: Number(y),
        width: Number(width),
        height: Number(height),
        right: Number(x) + Number(width),
        bottom: Number(y) + Number(height),
        color: getTextRGBA(color, opacity),
        corner: Number(corner)
    };
    listFigures.push(figure);
    return figure;
}
