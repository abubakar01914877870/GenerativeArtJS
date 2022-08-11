const canvasSketch = require('canvas-sketch');
const { onCircle } = require('canvas-sketch-util/random');
const p5 = require('p5');
import rand from 'canvas-sketch-util/random';

let openSansBold;
let backgroundColor = '#FFFFFFFF';
let artColors = ['#9B0000'];
//let artColors = ['#80558C', '#E4D192', '#AF7AB3', '#CBA0AE', '#F5F0BB'];
//let artColors = ['#FFB5B5', '#FF7272', '#9B0000'];
//let artColors = ['#323643', '#606470', '#F7F7F7', '#000000'];

let numberOfAgents = 1000,
    numberOfAgentsSlider;
let slider;
//All Sliders;
let noiseScale = 1,
    noiseScaleSlider;
let noiseStrength = 1,
    noiseStrengthSlider;
let size = 1,
    sizeSlider;
let speed = 1,
    speedSlider;
let noiseZ = 0.1,
    noiseZSlider;
//let noiseStrengthSlider;
let agents = [];

new p5()

const settings = {
    dimensions: [1000, 1000],
    animate: true,
    p5: true
};

const sketch = () => {

    slider = new Sliders();

    slider.createNewSliderLabel('Noise Scale', 0);
    noiseScaleSlider = slider.createNewSlider(1, 3000, 50);
    noiseScaleSlider.input(() => { noiseScale = noiseScaleSlider.value(); })
    noiseScaleSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Noise Strength', 100);
    noiseStrengthSlider = slider.createNewSlider(1, 500, 150);
    noiseStrengthSlider.input(() => { noiseStrength = noiseStrengthSlider.value(); })
    noiseStrengthSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Size', 200);
    sizeSlider = slider.createNewSlider(1, 20, 250);
    sizeSlider.input(() => { size = sizeSlider.value(); })
    sizeSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Speed Slider', 300);
    speedSlider = slider.createNewSlider(1, 20, 350);
    speedSlider.input(() => { speed = speedSlider.value(); })
    speedSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Noise Z Slider', 400);
    noiseZSlider = slider.createNewSlider(1, 100, 450);
    noiseZSlider.input(() => { noiseZ = noiseZSlider.value(); })
    noiseZSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Number Of Agents(More agents slower performance)', 500);
    numberOfAgentsSlider = slider.createNewSlider(1, 10000, 550);
    numberOfAgentsSlider.input(() => { numberOfAgents = numberOfAgentsSlider.value(); })
    numberOfAgentsSlider.changed(() => { reDrawSketch(); })


    for (let i = 0; i < numberOfAgents; i++) {
        agents.push(new Agent());
    }
    noLoop();

    background(backgroundColor);

    return ({ context, width, height }) => {

        // noStroke();
        // fill(0, 10);
        // rect(0 + width / 4, 0 + 100, width / 2, height / 2);
        // //fill(0, 255, 0);
        // triangle(0 + width / 4, height / 2 + 100, width / 2, height / 2 + 100, 0 + width / 4, height - 100);
        // //fill(0, 0, 255);
        // triangle(width / 2, height / 2 + 100, width / 4 * 3, height / 2 + 100, width / 4 * 3, height - 100);

        openSansBold = loadFont('assets//OpenSans-ExtraBold.ttf', drawText);





        agents.forEach(agent => {
            agent.update();
            agent.display();
        })




    };
};

canvasSketch(sketch, settings);

//Redraw sketch again when any slider is changed

function reDrawSketch() {
    redraw();
    background(backgroundColor);
    agents = [];
    for (let i = 0; i < numberOfAgents; i++) {
        agents.push(new Agent());
    }
}

function drawText() {
    textSize(350);
    stroke(0);
    fill(255)
    textAlign(CENTER, CENTER);
    textFont(openSansBold);
    text('15', width / 2, height / 4);
}
class Agent {

    constructor() {
        this.posX = random(width);
        this.posY = random(height);
        this.speed = random(-speed, speed);
        this.noiseStrength = noiseStrength;
        this.size = random(size);

        this.artColor = color(random(artColors));

        this.z = random(0.1, 0.3);
        this.noiseZInc = noiseZ / 1000;

    }

    display() {
        strokeWeight(this.size);
        stroke(this.artColor);
        noFill();
        point(this.posX, this.posY);
    }
    update() {
        let angle = noise(this.posX / noiseScale, this.posY / noiseScale, this.z) * this.noiseStrength;
        this.posX += cos(angle) * this.speed;
        this.posY += sin(angle) * this.speed;
        this.z += this.noiseZInc;

        if (this.posX > width) {
            this.posX = random(width);
        }
        if (this.posY > height) {
            this.posY = random(height);
        }
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