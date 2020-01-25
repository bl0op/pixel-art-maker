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


window.addEventListener("load", function(event){ console.log("there"); restoreImage(); });

window.addEventListener("unload", function(event){ saveToLocalStorage();});


toolFunction = pen;
createToolbar();
createCanvas(32,32);
createPallete();

