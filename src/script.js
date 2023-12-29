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
const canvasBackground = document.querySelector("#canvasBackground");
const figureList = document.querySelector(".figure-list");

btnCreate.addEventListener("click", function (e) {
    e.preventDefault();

    if (selectFigure.value == "") {
        alert("Фигура не выбрана");
    } else {
        let figureInfo = addFigureToFigureList();
        let svg = addFigureToCanvas(figureInfo);

        canvas.appendChild(svg);
        figureList.appendChild(figureInfo);
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
    if (selectFigure.value == "square" || selectFigure.value == "circle" || selectFigure.value == "ellipse") {
        height.value = width.value;
    }
});

height.addEventListener("focus", function () {
    if (selectFigure.value == "square" || selectFigure.value == "circle" || selectFigure.value == "ellipse") {
        width.value = height.value;
    }
});

canvasBackground.addEventListener("change", function (e) {
    if (e.target.value) {
        canvas.style.backgroundColor = e.target.value;
    }
});



function getTextRGBA(color, opacity) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);
    const rgba = [red, green, blue, opacity];
    return `rgba(${rgba.join(", ")})`;
}

function addFigureToFigureList() {
    let figureInfo = document.createElement("div");
    figureInfo.classList = "border border-purple-500 p-2 m-2 w-100";
    figureInfo.style.backgroundColor = getTextRGBA(color.value, opacity.value);
    figureInfo.innerHTML = `
    <p>figure: ${selectFigure.value}</p>
    <p>width: ${width.value}</p>
    <p>height: ${height.value}</p>
    <p class="flex flex-row">color: <div style="block:absolute; width:10px; height:10px; background-color:${color.value}"></div>${color.value}</p>
    <p>opacity: ${opacity.value}</p>
    <p>left: <span class="figure-left">---</span></p>
    <p>top: <span class="figure-top">---</span></p>
    `;

    return figureInfo;
}

function addFigureToCanvas(figureInfo) {
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
    } else if (selectFigure.value == "circle") {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", width.value / 2);
        circle.setAttribute("cy", width.value / 2);
        circle.setAttribute("r", width.value / 2);
        circle.setAttribute("fill", color.value);
        circle.setAttribute("fill-opacity", opacity.value);
        svg.appendChild(circle);
    } else if (selectFigure.value == "ellipse") {
        let ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", width.value / 2);
        ellipse.setAttribute("cy", width.value / 2);
        ellipse.setAttribute("rx", width.value / 2);
        ellipse.setAttribute("ry", (width.value / 2) - width.value * 0.2);
        ellipse.setAttribute("fill", color.value);
        ellipse.setAttribute("fill-opacity", opacity.value);
        svg.appendChild(ellipse);
    } else if (selectFigure.value == "polygon") {
        let polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", `0,${height.value} ${width.value / 2},0 ${width.value},${height.value}`);
        polygon.setAttribute("fill", color.value);
        polygon.setAttribute("fill-opacity", opacity.value);
        svg.appendChild(polygon);
        figureInfo.innerHTML += `<p>corners: ${corner.value}</p>`;
    }

    const getCoords = (elem) => {
        const box = elem.getBoundingClientRect();
        return {
            top: box.top + scrollY,
            left: box.left + scrollX,
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
            figureInfo.querySelector(".figure-left").innerHTML = svg.style.left;
            figureInfo.querySelector(".figure-top").innerHTML = svg.style.top;
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

    return svg;
}
