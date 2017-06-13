var SUN_TYPE_1 = 1;
var SUN_TYPE_2 = 2;

var SCALAR = 80;
var UNI_WIDTH = 16 * SCALAR;
var UNI_HEIGHT = 9 * SCALAR;

var EARTH_RADIUS = 300;
var SUN_RADIUS = 200;

//Starts:
class Star{
	constructor(x, y, size){
		this.x = x;
		this.y = y;
		this.size = size;
	}
}
var stars = [];

//Texts:
var MAX_R = 170, MAX_G = 20, MAX_B = 255;
var DIM_TIME = 15;
var textManagers = [];
class TextManager{
	constructor(x, y, textContent){
		this.x = x;
		this.y = y;
		this.textContent = textContent;
		this.fontColor = {R : 0, G : 0, B : 0};
		this.lightUp = true;
		//For Timer
		this.currentTime = 0;
		this.lastTime = 0;
		//Destroy Flag
		this.die = false;
	}
	update_draw(){
		this.currentTime = millis();
		if(this.currentTime - this.lastTime >= DIM_TIME){
			this.lastTime = millis();
			//Dimming colors
			if(this.lightUp){
				if(this.fontColor.R < MAX_R)
					this.fontColor.R++;
				if(this.fontColor.B < MAX_B)
					this.fontColor.B++;
				if(this.fontColor.G < MAX_G)
					this.fontColor.G++;
				if((this.fontColor.R >= MAX_R) && (this.fontColor.B >= MAX_B) && (this.fontColor.G >= MAX_G)){
					this.lightUp = false;
				}
			}
			else{
				if(this.fontColor.R > 0)
					this.fontColor.R--;
				if(this.fontColor.B > 0)
					this.fontColor.B--;
				if(this.fontColor.G > 0)
					this.fontColor.G--;
				if((this.fontColor.R <= 0) && (this.fontColor.B <= 0) && (this.fontColor.G <= 0)){
					this.die = true;
				}
			}
		}
		textSize(15);
		textFont("Georgia");
		textStyle(BOLD);
		fill(this.fontColor.R, this.fontColor.G, this.fontColor.B);
		text(this.textContent, this.x, this.y);
	}
}
function displayTexts(){
	var iRemove = [];
	for(var i = 0; i < textManagers.length; i++){
		textManagers[i].update_draw();
		if(textManagers[i].die){
			iRemove.push(i);
			console.log( i + " need to be destroied!");
		}
	}
	for(var r = 0; r < iRemove.length; r++){
		textManagers.splice(iRemove[r],1);
	}
}

var EARTH_TEXT = [
	"Life needed smoothness, but it also needed direction.\nOne could not always be returning to the point of origin.",
	"Make time for civilization, \nfor civilization won't make time.",
	"Weakness and ignorance are not barriers to survival, \nbut arrogance is.",
	"						--from <Three Body Problem>"
];

var SUN_TEXT = [
	"The greatest mystery in the universe is right in front of us.\nThe answers to all our cosmological questions may be found here.\nHow can we leave?!",
	"Time is the one thing that can't be stopped. \nLike a sharp blade, it silently cuts through hard and soft, constantly advancing. \nNothing is capable of jolting it even the slightest bit, but it changes everything."
];
var pointer_EARTH = 0;
var pointer_SUN = 0;

//Coordinates:
var SUN_X = UNI_WIDTH * 0.35;
var SUN_Y = UNI_HEIGHT * 0.05;
var EARTH_X = UNI_WIDTH * 0.7;
var EARTH_Y = UNI_HEIGHT * 0.35;

//Flags:
var IN_SUN = false;
var IN_EARTH = false;

function setup() {
	var canvasMain = createCanvas(UNI_WIDTH, UNI_HEIGHT);
	canvasMain.parent(main_canvas);
	generateStars(10, 40, 70);
    drawUniverse();
}
function draw() {
	drawUniverse();
    drawEarth(EARTH_X, EARTH_Y, 120);
    drawSun(SUN_X, SUN_Y, SUN_RADIUS, SUN_TYPE_2);
    drawMoon();
	displayTexts();
}

function drawUniverse(){
    createCanvas(UNI_WIDTH, UNI_HEIGHT);
    background(20, 20, 40);
    drawStars();
}

function drawStars(){
	for(i = 0; i < stars.length; i++){
		ellipse(stars[i].x, stars[i].y, stars[i].size, stars[i].size);
	}
}

function generateStars(num1, num2, num3){
	for(i = 0; i < num1; i++){
        var x = UNI_WIDTH * Math.random();
		var y = UNI_HEIGHT * Math.random();
		var size = UNI_WIDTH * 0.007;
		stars.push(new Star(x, y, size));
    }
    for(i = 0; i < num2; i++){
        var x = UNI_WIDTH * Math.random();
		var y = UNI_HEIGHT * Math.random();
		var size = UNI_WIDTH * 0.004;
		stars.push(new Star(x, y, size));
    }
    for(i = 0; i < num2; i++){
        var x = UNI_WIDTH * Math.random();
		var y = UNI_HEIGHT * Math.random();
		var size = UNI_WIDTH * 0.002;
		stars.push(new Star(x, y, size));
    }
} 

function drawEarth(x, y, radius){
    var EARTH_SHADOW = color(0, 88, 120);
	if (IN_EARTH)
		EARTH_SHADOW = color(30, 120, 150);
    fill(EARTH_SHADOW);
    noStroke();
    ellipse(x, y, radius, radius);
    
    var EARTH_LIGHT = color(1, 185, 200);
	if (IN_EARTH)
		EARTH_LIGHT = color (30, 220, 240);
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
		if(IN_SUN){
			SUN_RIM = color (255, 120, 80);
			SUN_INNER = color(255, 190, 100);
			SUN_CORE = color(255, 255, 200);
		}
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

function mouseClicked(){
	
	if (isInCircule(SUN_X, SUN_Y, SUN_RADIUS)){
		console.log("Mouse inside the sun");
		textManagers.push(new TextManager(UNI_WIDTH * 0.03 + UNI_WIDTH * 0.015 * pointer_SUN, UNI_HEIGHT * 0.265 + UNI_HEIGHT * 0.11 * pointer_SUN, SUN_TEXT[pointer_SUN]));
		pointer_SUN++;
		if(pointer_SUN == SUN_TEXT.length)
			pointer_SUN = 0;
	}
	if (isInCircule(EARTH_X, EARTH_Y, EARTH_RADIUS)){
		console.log("Mouse inside the earth")
		textManagers.push(new TextManager(UNI_WIDTH * 0.5 + UNI_WIDTH * 0.03 * pointer_EARTH, UNI_HEIGHT * 0.52 + UNI_HEIGHT * 0.08 * pointer_EARTH, EARTH_TEXT[pointer_EARTH]));
		pointer_EARTH++;
		if(pointer_EARTH == EARTH_TEXT.length)
			pointer_EARTH = 0;
	}
	return false;
}

function mouseMoved(){
	if (isInCircule(SUN_X, SUN_Y, SUN_RADIUS)){
		if(!IN_SUN){
			IN_SUN = true;
			console.log("Move in SUN");
		}
	}
	else{
		if(IN_SUN){
			IN_SUN = false;
			console.log("Move out SUN");
		}
	}
	if (isInCircule(EARTH_X, EARTH_Y, EARTH_RADIUS)){
		if(!IN_EARTH){
			IN_EARTH = true;
			console.log("Move in Earth");
		}
	}
	else{
		if(IN_EARTH){
			IN_EARTH = false;
			console.log("Move out Earth");
		}
	}
	return false;
}

function isInCircule(x, y, radius){
	//Center is a array center[x,y]
	//radius is a number
	var distance = Math.sqrt(Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2));
	if (distance < radius/2)
		return true;
	else
		return false;
}

