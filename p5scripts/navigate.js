var locationData;
var distance="";
var heightAngle;
var widthAngle;
var coord1;
var coord2;
var img;
var text1;

// function preload() {
// 	watchPosition(positionChanged);

//     locationData =  getCurrentPosition();
// }
function preload(){
    locationData =  getCurrentPosition();
}

function setup() {
	createCanvas(windowWidth,windowHeight-100);
	getCurrentPosition(updatePos);
	angleMode(DEGREES);
	coord1=34.0689;
	coord2=-118.4452;
	  	//if(geoCheck() == true){
			//geolocation is available
		//}else{
			//error getting geolocaion
		//}
	img = loadImage("imgs/white-arrow.png"); 
	console.log(rotationY);
}

function updatePos(location) {
	locationData = location;
	// console.log("wooo");
	console.log(locationData.longitude);
	distance=Math.round(100*calcGeoDistance(locationData.latitude,locationData.longitude, coord1,coord2))/100;
	heightAngle = abs((coord2)-locationData.longitude);
	widthAngle = abs(coord1-locationData.latitude);
}

function draw() {
	background("green");
	fill("black");
	textSize(40);
	text(distance, 100, 50, 50);
	var a = atan(height/width);
	translate(width/2, height/2);
	push();
	rotate(a);
	image(img, -187.5,-265.5);
	//rect(-20, -5, 40, 10);  Larger rectangle is rotating in degrees
	pop();
	// textSize(32);
	// text(rotationX, 10, 30);
	// fill(0, 102, 153);
	// text(rotationY, 10, 60);
	fill(0, 102, 153, 100);
	text(rotationZ, 10, 90);

	// text(deviceOrientation, 0, 50, 50);
	// push();
	// translate(200, 100);
	// rotate(atan(height/width));
	// pop();
	/////
	// translate(500,700);
	// push();
	// translate(-500,-700);
	// rotate(30);
	// image(img, 0,0);
	// pop();
  	// triangle(30, 75, 58, 20, 86, 75);
}
