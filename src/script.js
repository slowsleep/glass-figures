const btnCreate = document.querySelector("#btn_create");

const figure = document.querySelector("#figure");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const color = document.querySelector("#color");
const opacity = document.querySelector("#opacity");

const cornerCount = document.querySelector(".corner-count");
cornerCount.style.display = "none";

const canvas = document.querySelector("#canvas");

btnCreate.addEventListener("click", function (e) {
    e.preventDefault();
    let newFigure;
    if (e.target.value == "polygon") {
        newFigure = createFigure(
            figure.value,
            width.value,
            height.value,
            color.value,
            opacity.value,
            corner.value,
        );
    } else {
        newFigure = createFigure(
            figure.value,
            width.value,
            height.value,
            color.value,
            opacity.value,
        );
    }

    const getCoords = (elem) => {
        const box = elem.getBoundingClientRect();
        return {
            top: box.top + scrollY - canvas.offsetTop,
            left: box.left + scrollX - canvas.offsetLeft,
        };
    }

    newFigure.ondragstart = () => false;

    newFigure.addEventListener("mousedown", function (e) {
        const coords = getCoords(newFigure);
        const shiftX = e.pageX - coords.left;
        const shiftY = e.pageY - coords.top;


        const moveAt = (e) => {
            newFigure.style.left = e.pageX - shiftX + "px";
            newFigure.style.top = e.pageY - shiftY + "px";
        };

        const theEnd = () => {
            document.removeEventListener("mousemove", moveAt);
            document.removeEventListener("mouseup", theEnd);
        };

        newFigure.style.position = "absolute";
        moveAt(e);

        document.addEventListener("mousemove", moveAt);
        document.addEventListener("mouseup", theEnd);
    });
    canvas.appendChild(newFigure);
});

figure.addEventListener("change", function (e) {
    if (e.target.value == "polygon") {
        cornerCount.style.display = "flex";
    } else {
        cornerCount.style.display = "none";
    }

    if (e.target.value == "square" || e.target.value == "oval") {
        width.addEventListener("change", function (e) {
            height.value = width.value;
        });
        height.addEventListener("change", function (e) {
            width.value = height.value;
        });
    }
});

function createFigure(
    figure,
    width,
    height,
    color = "white",
    opacity = 1,
    corner = null,
) {
    let div = document.createElement("div");
    div.style.width = width.toString() + "px";
    div.style.height = height.toString() + "px";
    div.style.backgroundColor = color;
    div.classList += "figure";
    return div;
}


