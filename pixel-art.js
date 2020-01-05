///@author: ikal
///@date: 03.12.19
///@brief: script for pixel-art maker tool


mouseIsPressed = false

document.body.onmousedown = function(){
    mouseIsPressed = true;
}
document.body.onmouseup = function(){
    mouseIsPressed = false;
}
document.body.onmouseleave = function(){
    mouseIsPressed = false;
}

//this function variable is using to switch tool: pen, erase and other.
var toolFunction = function (event) {
}


//current color
var currentColor = "red";

//function for modifying function
function modifyPixel(pixel, event_type, color, border){
    if(event_type == "click"){
        pixel.style.backgroundColor = color;
        pixel.style.border = border;
    }
    else{
        if(mouseIsPressed){
            pixel.style.backgroundColor = color;
            pixel.style.border = border;
        }
    }
}

//pen tool (Captain obvious: color selected pixel)
function pen(event){
    pixel = event.target;
    modifyPixel(pixel, event.type, currentColor, "0px");
}
//...
function eraser(event){
    pixel = event.target;
    modifyPixel(pixel, event.type, "", "");
}


function createToolbar(){
    toolbar = document.querySelector('#toolbar');
    //clear pallete
    while(toolbar.firstChild){
        toolbar.removeChild(toolbar.firstChild);
    }
    toolbar_row = document.createElement("div");
    toolbar_row.style.display = "table-row"
    //create eraser
    pen_tool = document.createElement("div");
    pen_tool.className = "toolbar-cell";
    pen_tool.style.background= "url(img/eraser.png)"
    pen_tool.addEventListener("click", function(event) { updateTool(event, eraser); });
    toolbar_row.appendChild(pen_tool);
    toolbar.appendChild(toolbar_row);
    //create pen
    toolbar_row = document.createElement("div");
    toolbar_row.style.display = "table-row"
    pen_tool = document.createElement("div");
    pen_tool.className = "toolbar-cell";
    pen_tool.style.background= "url(img/pen.png)"
    pen_tool.addEventListener("click", function(event) { updateTool(event, pen); });
    toolbar_row.appendChild(pen_tool);
    toolbar.appendChild(toolbar_row);
    //
}

//array for storing pixels
var pixels = [];


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

            //pixel.addEventListener('click', toolFunction);
            pixel.addEventListener('mouseenter', toolFunction);
            pixel.addEventListener('click', toolFunction);
            row.appendChild(pixel);
            pixels.push(pixel);
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
    var colors = ["black", "white", "red", "green", "blue", "purple", "brown", "orange" ];
    for(let color_num = 0; color_num < colors.length; color_num++){
        color_cell = document.createElement("div");        
        color_cell.style.backgroundColor = colors[color_num];
        color_cell.className = "color-cell";
        color_cell.addEventListener("click", function(event){ currentColor = event.target.style.backgroundColor;});
        color_row.appendChild(color_cell);
    }
    pallete.appendChild(color_row);
}


//change to pen
//changeTool(pen);
//changeToPen();

toolFunction = pen;
createToolbar();
createCanvas(64,32);
createPallete();

function updateTool(event, func){
    for(let pixel_num = 0; pixel_num < pixels.length; pixel_num++){
        pixels[pixel_num].removeEventListener('mouseenter', toolFunction);
        pixels[pixel_num].removeEventListener('click', toolFunction);
        toolFunction = func;
        pixels[pixel_num].addEventListener('mouseenter', toolFunction);
        pixels[pixel_num].addEventListener('click', toolFunction);
    }
}
