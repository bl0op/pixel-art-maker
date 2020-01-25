///@author: ikal
///@date: 03.12.19
///@brief: script for pixel-art maker tool

document.body.onmousedown = function(){
    mouseIsPressed = true;
}
document.body.onmouseup = function(){
    mouseIsPressed = false;
}
document.body.onmouseleave = function(){
    mouseIsPressed = false;
}

toolFunction = pen;
createToolbar();
createCanvas(64,32);
createPallete();


