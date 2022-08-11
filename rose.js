const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
import { txtNeon } from "./helper/glow.js";
let brickWall;
let txtFont;
window.preload = () => {
        brickWall = loadImage('../assets//blockWall.png');
        txtFont = loadFont('./assets/AlexBrush-Regular.ttf');
    }
    // Sketch parameters
const settings = {
    dimensions: [1000, 1000],
    p5: true


};
new p5();


const sketch = () => {


    imageMode(CENTER);
    colorMode(HSB, 360, 100, 100, 100);
    //rectMode(CENTER);

    textAlign(CENTER, CENTER);
    textSize(150);
    textFont(txtFont);

    return ({ context, width, height }) => {

        image(brickWall, width / 2, height / 2);

        // Gradient foreground
        const fill = context.createLinearGradient(90, 90, 300, 300);
        fill.addColorStop(0, 'cyan');
        fill.addColorStop(1, 'orange');
        context.strokeStyle = fill;

        noFill();
        strokeWeight(10);
        //stroke(fill);
        rect(90, 90, 300, 300);
        line(90, 90, 300, 300);

        // noFill();
        // stroke(255);
        // strokeWeight(3);
        // txtNeon(context, 'Hello there', fill, 500, 500);



    };

};

// Start the sketch
canvasSketch(sketch, settings);

// function textNeon(context, txt, glowColor, txtX, txtY) {

//     glow(context, glowColor, 400);
//     text(txt, txtX, txtY);
//     text(txt, txtX, txtY);
//     glow(context, glowColor, 80);
//     text(txt, txtX, txtY);
//     text(txt, txtX, txtY);
//     glow(context, glowColor, 12);
//     text(txt, txtX, txtY);
//     text(txt, txtX, txtY);


// }

// function glow(context, glowColor, blurriness) {
//     context.shadowBlur = blurriness;
//     context.shadowColor = glowColor;
// }