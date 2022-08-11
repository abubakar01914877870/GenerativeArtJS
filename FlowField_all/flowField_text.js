const canvasSketch = require('canvas-sketch');
const { onCircle } = require('canvas-sketch-util/random');
const p5 = require('p5');


//import random from 'canvas-sketch-util/random';
let openSansBold;
let backgroundColor = '#E4D192';
//let artColors = ['#80558C', '#E4D192', '#AF7AB3', '#CBA0AE', '#F5F0BB'];
let artColors = ['#FFB5B5', '#FF7272', '#9B0000'];
//let artColors = ['#323643', '#606470', '#F7F7F7', '#000000'];


let slider;
//All Sliders;
let numberOfAgents = 1000,
    numberOfAgentsSlider;
let noiseScale = 10,
    noiseScaleSlider;
let noiseStrength = 10,
    noiseStrengthSlider;
let len = 10,
    lenSlider;
let speed = 10,
    speedSlider;
let size = 10,
    sizeSlider;
//let noiseStrengthSlider;
let agents = [];

new p5()

const settings = {
    dimensions: [1000, 1000],
    animate: false,
    p5: true
};



const sketch = () => {


    slider = new Sliders();

    slider.createNewSliderLabel('Noise Scale', 0);
    noiseScaleSlider = slider.createNewSlider(1, 500, 50);
    noiseScaleSlider.input(() => { noiseScale = noiseScaleSlider.value(); })
    noiseScaleSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Noise Strength', 100);
    noiseStrengthSlider = slider.createNewSlider(1, 500, 150);
    noiseStrengthSlider.input(() => { noiseStrength = noiseStrengthSlider.value(); })
    noiseStrengthSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Length of wave', 200);
    lenSlider = slider.createNewSlider(1, 100, 250);
    lenSlider.input(() => { len = lenSlider.value(); })
    lenSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Speed Slider', 300);
    speedSlider = slider.createNewSlider(1, 20, 350);
    speedSlider.input(() => { speed = speedSlider.value(); })
    speedSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Stroke Weight', 400);
    sizeSlider = slider.createNewSlider(1, 50, 450);
    sizeSlider.input(() => { size = sizeSlider.value(); })
    sizeSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Number Of Agents(More agents slower performance)', 500);
    numberOfAgentsSlider = slider.createNewSlider(1, 10000, 550);
    numberOfAgentsSlider.input(() => { numberOfAgents = numberOfAgentsSlider.value(); })
    numberOfAgentsSlider.changed(() => { reDrawSketch(); })


    for (let i = 0; i < numberOfAgents; i++) {
        agents.push(new Agent());
    }



    background(backgroundColor);

    return ({ context, width, height }) => {

        openSansBold = loadFont('assets//OpenSans-ExtraBold.ttf', drawText);


        agents.forEach(agent => {
            agent.display();
        })

        noStroke();
        fill(51);
        rect(100, 100, width - 200, height / 2);

        triangle(100, height / 2, width / 2, height / 2, 100, height - 100);

        triangle(width / 2, height / 2, width - 100, height / 2, width - 100, height - 100);
    };
};

canvasSketch(sketch, settings);

//Redraw sketch again when any slider is changed

function reDrawSketch() {

    background(backgroundColor);
    agents = [];
    for (let i = 0; i < numberOfAgents; i++) {
        agents.push(new Agent());
    }
    redraw();


}

function drawText() {
    textSize(100);
    stroke(0);
    fill(255)
    textAlign(CENTER, CENTER);
    textFont(openSansBold);
    text('August', width / 2, height / 2);
}



class Agent {

    constructor() {
        this.posX = random(width);
        this.posY = random(height);
        this.speed = random(-speed, speed);
        this.noiseStrength = 50;
        this.len = random(len);
        this.strokeSize = random(size);
        this.artColor = color(artColors[floor(random(artColors.length))]);
    }

    display() {

        fill(this.artColor);
        noStroke();
        beginShape();
        for (let i = 0; i < this.len; i++) {
            this.update();
        }
        endShape();

    }
    update() {
        let angle = noise(this.posX / noiseScale, this.posY / noiseScale) * this.noiseStrength;
        this.posX += cos(angle) * this.speed;
        this.posY += sin(angle) * this.speed;
        vertex(this.posX, this.posY);

    }

}

class Sliders {
    constructor() {
        // this.noiseSclSlider.input(() => { noiseScale = noiseSclSlider.value(); })
        // this.noiseSclSlider.changed(() => { reDrawSketch(); })
    }
    createNewSliderLabel(sliderName, sliderPosY) {
        this.sliderLabel = createElement('h5', sliderName);
        this.sliderLabel.style('color', 'black');
        this.sliderLabel.position(50, sliderPosY);
    }
    createNewSlider(sliderStart, sliderStop, sliderPosY) {
        this.newSlider = createSlider(sliderStart, sliderStop, 1, 1);
        this.newSlider.position(50, sliderPosY);
        this.newSlider.style('width', '300px');
        return this.newSlider;
    }
}

class MyText {
    constructor() {
        this.txt = txt;
        this.fontFullPath = fontFullPath;
        this.textLocation = textLocation;
        this.textAlignment = textAlignment;
    }


}