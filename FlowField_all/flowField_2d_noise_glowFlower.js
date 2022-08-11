const canvasSketch = require('canvas-sketch');
const { onCircle } = require('canvas-sketch-util/random');
const p5 = require('p5');
//import random from 'canvas-sketch-util/random';
let bgImage;
let openSansBold;
let openSansRegular;
let backgroundColor = '#23101c';
let artColors = ['#ff04ff', '##ffe66d', '#AF7AB3'];
let artColors2 = ["#1a535c"]; //Mixed color
//let artColors = ["#ffe66d", "#F5F0BB", "#E4D192", "#F5F0BB", "#FFFFFFFF'", "#F7F7F7", "red"];
//let artColors = [
//   [136, 8, 8, 50]
//];
//let artColors = ['#323643', '#606470', '#F7F7F7', '#000000'];
//let artColors = ['#D90429', '#EF233C', '#ff4d6d', '#ff758f']

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
window.preload = () => {
    bgImage = loadImage('../assets/blockWall.png');
}
const settings = {
    dimensions: [1000, 1000],
    animate: true,
    p5: true
};

const sketch = () => {

    slider = new Sliders();
    openSansBold = loadFont('..//assets//OpenSans-ExtraBold.ttf');
    openSansRegular = loadFont('..//assets/OpenSans-Regular.ttf');

    slider.createNewSliderLabel('Noise Scale', 0);
    noiseScaleSlider = slider.createNewSlider(1, 500, 50);
    noiseScaleSlider.input(() => { noiseScale = noiseScaleSlider.value(); })
    noiseScaleSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Noise Strength', 100);
    noiseStrengthSlider = slider.createNewSlider(1, 500, 150);
    noiseStrengthSlider.input(() => { noiseStrength = noiseStrengthSlider.value(); })
    noiseStrengthSlider.changed(() => { reDrawSketch(); })

    slider.createNewSliderLabel('Size', 200);
    sizeSlider = slider.createNewSlider(1, 100, 250);
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


        // stroke(255);
        // strokeWeight(size);
        // line(width, 0, 0, height);

        agents.forEach(agent => {
            agent.update(context);
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

class Agent {

    constructor() {
        // this.context = context;
        this.posX = random(width);
        this.posY = random(height);
        this.speed = random(-speed, speed);
        this.noiseStrength = noiseStrength;
        this.size = size;

        this.artColor = color(artColors[floor(random(artColors.length))]);


    }

    display() {
        strokeWeight(this.size);
        stroke(this.artColor);
        noFill();
        // if (this.posX > 0 + width / 4 && this.posX < width - width / 4 && this.posY < height / 2) {
        //let c = img.get(this.posX, this.posY);
        stroke(this.artColor, 10);

        if (this.size < 1) {
            stroke(0, 255, 0, 10);
        }
        point(this.posX, this.posY);


    }
    update(context) {
        let angle = noise(this.posX / noiseScale, this.posY / noiseScale) * this.noiseStrength;
        this.posX += cos(angle) * this.speed;
        this.posY += sin(angle) * this.speed;
        if (this.size == size) {
            context.shadowBlur = random(8);
            context.shadowColor = this.artColor;
            this.size -= 0.5;
        } else if (this.size > 0.5) {
            this.size -= 0.5;


        } else if (this.size == 0.5 || this.size < 0.5) {
            this.artColor = color(artColors2[0]);
            this.size = 0.5;
            context.shadowBlur = 0;
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

    drawText() {

        textSize(width / 6);
        stroke(0);
        fill(255);
        textAlign(CENTER, CENTER);
        textFont(openSansBold)
            // text('15', width / 2, height / 4);
    }
}