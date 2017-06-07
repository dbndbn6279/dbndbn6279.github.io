var SUN_TYPE_1 = 1;
var SUN_TYPE_2 = 2;

var SCALAR = 70;
var UNI_WIDTH = 16 * SCALAR;
var UNI_HEIGHT = 9 * SCALAR;

var EARTH_RADIUS = 120;
var SUN_RADIUS = 200;

function setup() {
    drawUniverse();
}
function draw() {
    drawEarth(UNI_WIDTH * 0.7, UNI_HEIGHT * 0.35, 120);
    drawSun(UNI_WIDTH * 0.35, UNI_HEIGHT * 0.05, SUN_RADIUS, SUN_TYPE_2);
    drawMoon(); 
}

function drawUniverse(){
    createCanvas(UNI_WIDTH, UNI_HEIGHT);
    background(20, 20, 40);
    drawStars(10, 40, 70);
}

function drawStars(num1, num2, num3){
    for(i = 0; i < num1; i++){
        ellipse(UNI_WIDTH * Math.random(), UNI_HEIGHT * Math.random(), UNI_WIDTH * 0.007, UNI_WIDTH * 0.007)
    }
    for(i = 0; i < num2; i++){
        ellipse(UNI_WIDTH * Math.random(), UNI_HEIGHT * Math.random(), UNI_WIDTH * 0.004, UNI_WIDTH * 0.004)
    }
    for(i = 0; i < num3; i++){
        ellipse(UNI_WIDTH * Math.random(), UNI_HEIGHT * Math.random(), UNI_WIDTH * 0.002, UNI_WIDTH * 0.002)
    }
}

function drawEarth(x, y, radius){
    var EARTH_SHADOW = color(0, 88, 120);
    fill(EARTH_SHADOW);
    noStroke();
    ellipse(x, y, radius, radius);
    
    var EARTH_LIGHT = color(1, 185, 200);
    fill(EARTH_LIGHT);
    noStroke();
    ellipse(x - radius * 0.06, y - radius * 0.06, radius * 0.9, radius * 0.9);
}

function drawSun(x, y, radius, option){
    if(option == 1){
        var RED, GREEN, BLUE;
        var DIM_RATE = 20;
        var DIM_STEP = 1;
        RED = 20; GREEN = 20; BLUE = 40;
        var SUN_CENTER = color (RED, GREEN, BLUE);
        noStroke();
        for(;radius > 0; radius -= DIM_STEP){
            fill(SUN_CENTER);
            ellipse(x, y, radius, radius)
            RED += 255 / DIM_RATE;
            GREEN += 87 / DIM_RATE;
            BLUE += 50 / DIM_RATE;
            if(RED > 255)
                RED = 255;
            if(GREEN > 255)
                GREEN = 255;
            if(BLUE > 255)
                BLUE = 255;
            SUN_CENTER = color (RED, GREEN, BLUE);
        }
    }
    
    if(option == 2){
        var SUN_RIM = color(255, 85, 50);
        var SUN_INNER = color(255, 170, 75);
        var SUN_CORE = color(255, 245, 170);
        noStroke();
        fill(SUN_RIM);
        ellipse(x, y, radius, radius);
        fill(SUN_INNER);
        ellipse(x, y, radius * 0.9, radius * 0.9);
        fill(SUN_CORE);
        ellipse(x, y, radius * 0.8, radius * 0.8);
    }
}

function drawMoon(){
    function drawCrater(xRelative, yRelative, size){
        var SHADE = color (180, 180, 180);
        var LIGHT = color (230, 230, 230);
        var posX = 0 + UNI_WIDTH * xRelative;
        var posY = UNI_HEIGHT - (MOON_H / 2 - (MOON_Y - UNI_HEIGHT)) + (MOON_H / 2 - (MOON_Y - UNI_HEIGHT)) * yRelative;
        var craterW = size;
        var craterH = size * MOON_H / MOON_W * 1.2;
        //Draw Ligh
        fill(LIGHT);
        noStroke();
        ellipse(posX, posY, craterW, craterH);
        //Draw Shade
        fill(SHADE);
        noStroke();
        beginShape();
        vertex(posX - craterW / 2, posY);
        bezierVertex(posX - craterW/2, posY - craterH,
                     posX + craterW/2, posY - craterH,
                     posX + craterW/2, posY);
        bezierVertex(posX + craterW/2, posY - craterH/2,
                     posX - craterW/2, posY - craterH/2,
                     posX - craterW/2, posY);
        endShape();
    }
    var MOON_SURFACE = color (217, 217, 217);
    var MOON_X = UNI_WIDTH/2, MOON_Y = UNI_HEIGHT * 1.2, MOON_W = UNI_WIDTH * 2, MOON_H = UNI_HEIGHT * 0.8;
    //Begin Drawing
    fill(MOON_SURFACE);
    noStroke();
    ellipse(MOON_X, MOON_Y, MOON_W, MOON_H);
    drawCrater(0.2, 0.3, 60);
    drawCrater(0.3, 0.2, 20);
    drawCrater(0.4, 0.7, 100);
    drawCrater(0.6, 0.4, 70);
    drawCrater(0.7, 0.25, 40);
    drawCrater(0.8, 0.65, 130);   
}


