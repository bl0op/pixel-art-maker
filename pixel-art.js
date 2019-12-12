///@author: ikal
///@date: 03.12.19
///@brief: script for pixel-art maker tool

//this function variable is using to switch tool: pen, erase and other.
var toolFunction = function (event) {
}

//current color
var currentColor = "red";

//pen tool (Captain obvious: color selected pixel)
function pen(color, pixel){
    pixel.style.backgroundColor = color;
    pixel.style.border = "0px";
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
            //if it is left ramp pixel don't show left border
            if(column_num == 0){
                pixel.style.borderLeft = '0px';
            }
            //and so on...
            if(column_num == width-1){
                pixel.style.borderRight = '0px'
            }
            if(row_num == 0){
                pixel.style.borderTop = '0px'
            }
            if(row_num == height-1){
                pixel.style.borderBottom = '0px'
            }

            pixel.addEventListener('click', toolFunction);
            row.appendChild(pixel);
        }
        canvas.appendChild(row);
    }
}

function createPallete(){
    var colors_count = 2;
    pallete = document.querySelector('#pallete');
    //clear pallete
    while(pallete.firstChild){
        pallete.removeChild(pallete.firstChild);
    }
    color_row = document.createElement("div");
    color_row.className = "color-row";
    /*for(let color_num = 0; color_num < colors_count; color_num++){
        color_cell = document.createElement("div");        
        color_cell.className = "color-cell";
        color_row.appendChild(color_cell);
        }*/
        color_cell = document.createElement("div");        
        color_cell.style.backgroundColor = "white";
        color_cell.className = "color-cell";
        color_cell.addEventListener("click", function(event){ currentColor = event.target.style.backgroundColor;});
        color_row.appendChild(color_cell);
        color_cell = document.createElement("div");        
        color_cell.style.backgroundColor = "red";
        color_cell.className = "color-cell";
        color_cell.addEventListener("click", function(event){ currentColor = event.target.style.backgroundColor;});
        color_row.appendChild(color_cell);
    pallete.appendChild(color_row);
}

//change to pen
toolFunction = function(event){
    pen(currentColor, event.target);
}



createCanvas(64,32);
createPallete();
