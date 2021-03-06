///@author: ikal
///@file: functions.js
///@date: 25.01.20
///@brief: Functions definitions


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
    //console.log("from pen");
    pixel = event.target;
    modifyPixel(pixel, event.type, currentColor, "0px");
}
//...
function eraser(event){
    //console.log("from eraser");
    pixel = event.target;
    modifyPixel(pixel, event.type, "", "");
}

//...
function flood_fill(event){
    //console.log("from flood_fill");
    root_pixel_node = event.target;

    function get_south_node(node){
        //get num of child
        child = node;
        var child_num = 0;
        while((child = child.previousSibling) != null){
            child_num++;
        }

        ////get south pixel
        node_row = node.parentNode;
        south_node_row = node_row.nextSibling;
        if(south_node_row){
            south_pixel = south_node_row.children[child_num];
            return south_pixel;
        }
        return null;
    }

    function get_north_node(node){
        //get num of child
        child = node;
        var child_num = 0;
        while((child = child.previousSibling) != null){
            child_num++;
        }

        ////get south pixel
        node_row = node.parentNode;
        north_node_row = node_row.previousSibling;
        if(north_node_row){
            north_node = north_node_row.children[child_num];
            return north_node;
        }
        return null;
    }

    function get_west_node(node){
        if((west_node = node.previousSibling) != null){
            return west_node;
        }
        return null;
    }

    function get_east_node(node){
        if((east_node = node.nextSibling) != null){
            return east_node;
        }
        return null;
    }


    function fill(node, targetColor, replacementColor){
            
            if(targetColor == replacementColor) return;
            else if(node.style.backgroundColor != targetColor) return;
            else { 
                node.style.backgroundColor = replacementColor; 
                node.style.border = "0px"; 
            }
            if((south_node = get_south_node(node)) != null){
                fill(south_node, targetColor, replacementColor);
            }
            if((north_node = get_north_node(node)) != null){
                fill(north_node, targetColor, replacementColor);
            }
            if((west_node = get_west_node(node)) != null){
                fill(west_node, targetColor, replacementColor);
            }
            if((east_node = get_east_node(node)) != null){
                fill(east_node, targetColor, replacementColor);
            }
            return;
    }

    fill(root_pixel_node, root_pixel_node.style.backgroundColor, currentColor);
    
}

//converting rgb to hex format
function rgbToHex(rgb){
    var regexp = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi;
    var matches = regexp.exec(rgb);
    var components = [matches[1], matches[2], matches[3]];
    var hashcode = "#" + components.map(function(numstr){ hexStr = parseInt(numstr, 10).toString(16); 
                                                          if(hexStr.length < 2){ hexStr = "0" + hexStr;} 
                                                          return hexStr  }).join("");
    return hashcode;
}


function changeColor(color){
    currentColor = color;
    updateIndicator();
}

//function to update color-indicator
function updateIndicator(){
    indicator = document.querySelector("#color-indicator");
    indicator.value = rgbToHex(currentColor);
}


function createToolbar(){
    toolbar = document.querySelector('#toolbar');
    //clear pallete
    while(toolbar.firstChild){
        toolbar.removeChild(toolbar.firstChild);
    }
    //create pen
    toolbar_row = document.createElement("div");
    toolbar_row.style.display = "table-row"
    pen_tool = document.createElement("div");
    pen_tool.className = "toolbar-cell";
    pen_tool.style.background= "url(img/pen.png)"
    pen_tool.addEventListener("click", function(event) { updateTool(event, pen); });
    toolbar_row.appendChild(pen_tool);
    toolbar.appendChild(toolbar_row);
    //create eraser
    toolbar_row = document.createElement("div");
    toolbar_row.style.display = "table-row"
    eraser_tool = document.createElement("div");
    eraser_tool.className = "toolbar-cell";
    eraser_tool.style.background= "url(img/eraser.png)"
    eraser_tool.addEventListener("click", function(event) { updateTool(event, eraser); });
    toolbar_row.appendChild(eraser_tool);
    toolbar.appendChild(toolbar_row);
    //create flood filler
    toolbar_row = document.createElement("div");
    toolbar_row.style.display = "table-row"
    filler = document.createElement("div");
    filler.className = "toolbar-cell";
    filler.style.background= "url(img/flood_fill.png)"
    filler.addEventListener("click", function(event) { updateTool(event, flood_fill); }); //to do
    toolbar_row.appendChild(filler);
    toolbar.appendChild(toolbar_row);
    //
    //create save
    toolbar_row = document.createElement("div");
    toolbar_row.style.display = "table-row"
    save = document.createElement("div");
    save.className = "toolbar-cell";
    save.style.background= "url(img/save.png)"
    save.addEventListener("click", function(event) {}); //to do
    toolbar_row.appendChild(save);
    toolbar.appendChild(toolbar_row);
    //
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
            //pixel.addEventListener('click', toolFunction);
            pixel.addEventListener('mouseenter', toolFunction);
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
    var colors = ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff"];
    for(let color_num = 0; color_num < colors.length; color_num++){
        color_cell = document.createElement("div");        
        color_cell.style.backgroundColor = colors[color_num];
        color_cell.className = "color-cell";
        color_cell.addEventListener("click", function(event){  changeColor(event.target.style.backgroundColor);});
        pallete.appendChild(color_cell);
    }
    //create color indicator
    color_indicator = document.createElement("div");
    color_indicator.style.display = "table-cell";
    color_indicator.style.textAlign = "right";

    color_indicator.textContent = "color indicator";
    color_cell = document.createElement("input");
    color_cell.type = "color";
    color_cell.id = "color-indicator";
    color_cell.value = currentColor;
    color_cell.addEventListener("change", function(event){  var hexcode = event.target.value;
                                                            var red = parseInt(hexcode[1] + hexcode[2], 16).toString(10);
                                                            var blue = parseInt(hexcode[3] + hexcode[4], 16).toString(10);
                                                            var green = parseInt(hexcode[5] + hexcode[6], 16).toString(10);
                                                            var components = [red, blue, green];
                                                            var rgbstr = "rgb(" + components.join(" ,") + ")"; 
                                                            changeColor(rgbstr);
                                                            });
    //



    pallete.appendChild(color_indicator);
    pallete.appendChild(color_cell);
}

//foreach pixel element unbinds event listener and bind new function
function updateTool(event, func){
    //console.log(toolFunction);
    var pixels = document.querySelector("#canvas").getElementsByClassName("pixel");
    for(let pixel_num = 0; pixel_num < pixels.length; pixel_num++){
        //removing listeners
        pixel_clone = pixels[pixel_num].cloneNode(true);
        pixels[pixel_num].parentNode.replaceChild(pixel_clone, pixels[pixel_num]);
        
        //add new listener
        toolFunction = func;
        if(toolFunction != flood_fill)
            pixels[pixel_num].addEventListener('mouseenter', toolFunction);
        pixels[pixel_num].addEventListener('click', toolFunction);
    }
}

function setImage(pixel_colors){
    var pixels = document.querySelector("#canvas").getElementsByClassName("pixel");
    //console.assert(pixel_colors.length < pixels.length, "in setImage func length doesn't match");
    var pixel_storage = []; //translate to object with size property
    for(let pixel_num = 0; pixel_num < pixel_colors.length; pixel_num++){
        pixels[pixel_num].style.backgroundColor = pixel_colors[pixel_num];
        if(pixels[pixel_num].style.backgroundColor != ""){
            pixels[pixel_num].style.border = "0px";
        }
    }
}


//saving pixels values functions
function saveToLocalStorage(){
    var pixels = document.querySelector("#canvas").getElementsByClassName("pixel");
    var pixel_storage = []; //translate to object with size property
    for(let pixel_num = 0; pixel_num < pixels.length; pixel_num++){
        pixel_storage.push(pixels[pixel_num].style.backgroundColor);
    }
    localStorage.setItem("pixels", JSON.stringify(pixel_storage));
}

function restoreImage(){
    setImage(JSON.parse(localStorage.getItem("pixels")));
}
