const btnCreate = document.querySelector("#btn_create");

const selectFigure = document.querySelector("#figure");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const color = document.querySelector("#color");
const opacity = document.querySelector("#opacity");
const corner = document.querySelector("#corner");

const divCorner = document.querySelector(".corner-count");
divCorner.value = "";
divCorner.style.display = "none";

const leftSide = document.querySelector(".left");
const rightSide = document.querySelector(".right");

const canvas = document.querySelector("#canvas");
const canvasBackground = document.querySelector('#canvasBackground');

btnCreate.addEventListener("click", function (e) {
    e.preventDefault();
    if (selectFigure.value == "") {
        alert("Фигура не выбрана");
    } else {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", width.value);
        svg.setAttribute("height", height.value);

        if (selectFigure.value == "rectangle" || selectFigure.value == "square") {
            let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", 0);
            rect.setAttribute("y", 0);
            rect.setAttribute("width", width.value);
            rect.setAttribute("height", height.value);
            rect.setAttribute("fill", color.value);
            rect.setAttribute("fill-opacity", opacity.value);
            svg.appendChild(rect);
        } else if (selectFigure.value == "circle" || selectFigure.value == "oval") {
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", width.value / 2);
            circle.setAttribute("cy", width.value / 2);
            circle.setAttribute("r", width.value / 2);
            circle.setAttribute("fill", color.value);
            circle.setAttribute("fill-opacity", opacity.value);
            svg.appendChild(circle);
        } else if (selectFigure.value == "polygon") {
            let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            polygon.setAttribute("points", `0,${height.value} ${width.value / 2},0 ${width.value},${height.value}`);
            polygon.setAttribute("fill", color.value);
            polygon.setAttribute("fill-opacity", opacity.value);
            svg.appendChild(polygon);
        }

        const getCoords = (elem) => {
            const box = elem.getBoundingClientRect();
            return {
                top: box.top + scrollY ,
                left: box.left + scrollX ,
            };
        };

        svg.ondragstart = () => false;

        svg.addEventListener("mousedown", function (e) {
            const coords = getCoords(svg);
            const shiftX = e.pageX - coords.left;
            const shiftY = e.pageY - coords.top;

            const moveAt = (e) => {
                svg.style.left = e.pageX - shiftX + "px";
                svg.style.top = e.pageY - shiftY + "px";
            };

            const theEnd = () => {
                document.removeEventListener("mousemove", moveAt);
                document.removeEventListener("mouseup", theEnd);
            };

            svg.style.position = "absolute";
            moveAt(e);

            document.addEventListener("mousemove", moveAt);
            document.addEventListener("mouseup", theEnd);
        });

        canvas.appendChild(svg);

        if (selectFigure.value == "polygon") {
            console.log({
                selectFigure: selectFigure.value,
                width: width.value,
                height: height.value,
                color: color.value,
                opacity: opacity.value,
                corner: corner.value,
            });
        } else {
            console.log({
                selectFigure: selectFigure.value,
                width: width.value,
                height: height.value,
                color: color.value,
                opacity: opacity.value,
            });
        }
    }
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

canvasBackground.addEventListener("change", function(e) {
    if (e.target.value) {
        canvas.style.backgroundColor = e.target.value;
    }
})
