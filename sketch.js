const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
let img;
// Sketch parameters
const settings = {
    dimensions: [1000, 1000],
    p5: true


};
new p5();
// Artwork function

function preload() {

}

const sketch = ({ exportFrame }) => {
    // preload();
    img = loadImage('assets//fon.jpg', img => {
        image(img, 0, 0);
    });
    return ({ context, width, height }) => {

    };

};

// Start the sketch
canvasSketch(sketch, settings);