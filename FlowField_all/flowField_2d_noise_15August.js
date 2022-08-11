const canvasSketch = require('canvas-sketch');
const { onCircle } = require('canvas-sketch-util/random');
const p5 = require('p5');
//import random from 'canvas-sketch-util/random';
let img;
let openSansBold;
let openSansRegular;
let backgroundColor = '#FFFFFFFF';
//let artColors = ['#80558C', '#E4D192', '#AF7AB3', '#CBA0AE', '#F5F0BB'];
//let artColors = ["#1a535c", "#4ecdc4", "#f7fff7", "#ff6b6b", "#ffe66d"]; //Mixed color
let artColors = [
    [136, 8, 8, 50]
];
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

//let noiseStrengthSlider;
let agents = [];

new p5()

const settings = {
    dimensions: [1000, 1000],
    animate: true,
    p5: true
};

const sketch = () => {
    img = loadImage('../assets/sun-500Artboard 1.png');
    slider = new Sliders();
    openSansBold = loadFont('..//assets//OpenSans-ExtraBold.ttf');
    openSansRegular = loadFont('..//assets/OpenSans-Regular.ttf');

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

    slider.createNewSliderLabel('Number Of Agents', 400);
    numberOfAgentsSlider = slider.createNewSlider(1, 10000, 450);
    numberOfAgentsSlider.input(() => { numberOfAgents = numberOfAgentsSlider.value(); })
    numberOfAgentsSlider.changed(() => { reDrawSketch(); })




    for (let i = 0; i < numberOfAgents; i++) {
        agents.push(new Agent());
    }
    background(backgroundColor);





    return ({ context, width, height }) => {


        slider.drawText();

        text('15', width / 2, height / 3.5);


        textSize(width / 15);
        noStroke();
        fill(244, 42, 65);
        textAlign(CENTER, CENTER);
        textFont(openSansBold)
        text('AUGUST', width / 2, height / 2.5);

        textSize(width / 25);
        fill(255);
        stroke(51);
        text('National Mourning Day', width / 2, height / 2);

        textSize(width / 18);
        fill(0, 106, 78);
        noStroke();
        text('BANGLADESH', width / 2, height / 2 + 50);

        // agents.forEach(agent => {
        //     agent.update();
        //     agent.display();
        // })

        noStroke();
        fill(0, 10);
        rect(0 + width / 4, 100, width / 2, height / 2);
        // fill(0, 255, 0);
        triangle(0 + width / 4, height / 2 + 100, width / 2, height / 2 + 100, 0 + width / 4, height - 100);
        //fill(0, 0, 255);
        triangle(width / 2, height / 2 + 100, width / 4 * 3, height / 2 + 100, width / 4 * 3, height - 100);



    };
};

canvasSketch(sketch, settings);

//Redraw sketch again when any slider is changed

function reDrawSketch() {
    redraw();
    background(255);
    agents = [];
    for (let i = 0; i < numberOfAgents; i++) {
        agents.push(new Agent());
    }
}

class Agent {

    constructor() {
        this.posX = random(width);
        this.posY = random(height);
        this.speed = random(-speed, speed);
        this.noiseStrength = noiseStrength;
        this.size = random(size);

        this.artColor = color(artColors[floor(random(artColors.length))]);


    }

    display() {
        strokeWeight(this.size);
        stroke(this.artColor);
        noFill();
        if (this.posX > 0 + width / 4 && this.posX < width - width / 4 && this.posY < height / 2) {
            let c = img.get(this.posX - width / 4, this.posY);
            stroke(c, 50);
            point(this.posX, this.posY);
        } else {
            point(this.posX, this.posY);
        }

    }
    update() {
        let angle = noise(this.posX / noiseScale, this.posY / noiseScale) * this.noiseStrength;
        this.posX += cos(angle) * this.speed;
        this.posY += sin(angle) * this.speed;

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

    drawText() {

        textSize(width / 6);
        stroke(0);
        fill(255);
        textAlign(CENTER, CENTER);
        textFont(openSansBold)
            // text('15', width / 2, height / 4);
    }
}