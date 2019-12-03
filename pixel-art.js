///@author: ikal
///@date: 03.12.19
///@brief: script for pixel-art maker tool

//this function variable we will use to switch tool: pen, erase and other.
var toolFunction = function (event) {
}

//pen tool (Captain obvious: color selected pixel)
function pen(color, pixel){
    pixel.setAttribute("style", "background-color: "+color+";");
}


function createCanvas(width, height){
    canvas = document.querySelector("#canvas");
    //clear canvas
    while(canvas.firstChild){
        canvas.removeChild(canvas.firstChild);
    }
    //create rows of pixel
    for(let row_num = 0; row_num < height; row_num++){
        row = document.createElement("div");
        row.className = "pixel-row";
        for(let column_num = 0; column_num < width; column_num++){
            pixel = document.createElement("div");
            pixel.className = "pixel";
            pixel.addEventListener('click', toolFunction);
            row.appendChild(pixel);
        }
        canvas.appendChild(row);
    }
}

//change to pen
toolFunction = function(event){
    pen("rgb(255,0,0)", event.target);
}



createCanvas(64,64);
