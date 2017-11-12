var capture;
var imagetest1;
var imagetest2;
var page ="navigation";
var months = { 1:"January", 2:"February", 3:"March", 4:"April", 5:"May", 6:"June", 7:"July", 8:"August", 9:"September", 10:"October", 11:"November", 12:"December" };
var locationData;
var distance="";
var heightAngle;
var widthAngle;
var coord1;
var coord2;
var img;
var text1;
var royce;
var ypos;
var heading;
var location_list = [];
var location_counter=0;

function locationItem(name, latitude, longitude, description, image_var){
	this.name = name;
	this.latitude = latitude;
	this.longitude = longitude;
	this.description = description;
	this.image_var = image_var;
}
function preload(){
	royce = loadImage("imgs/royce.jpg");
	uclaLogo = loadImage("imgs/ucla-logo.jpg");
	img = loadImage("imgs/white-arrow.png");
	locationData =  p5.prototype.getCurrentPosition(updatePos);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	var constraints = { video: { facingMode: "user" } }; // environment or user
	capture = createCapture(constraints);
	capture.elt.setAttribute('playsinline', true);
	capture.elt.setAttribute('autoplay', true);
	capture.hide();
	initLocations();
	console.log(location_list);
	coord1=location_list[0].latitude;
	coord2=location_list[0].longitude;
	angleMode(DEGREES);
	  	//if(geoCheck() == true){
			//geolocation is available
		//}else{
			//error getting geolocaion
		//}
	// // capture.size(windowWidth, windowHeight);
	// imagetest2=loadImage(imagetest1);
}


function draw() {
	console.log(page);
	switch(page) {
		case "navigation":
			navigation();
		    break;
		case "site-info":
			//console.log(location_list[location_counter]);
			siteInfo(location_list[location_counter]);
			break;
	    case "photo-prompt":
	        photoPrompt();
	        break;
	    case "album":
	    	launchAlbum();
	    	break;
	    default:
	        // home();
	}
	if(mouseIsPressed){

		ypos=constrain(mouseY,0,windowHeight);

	}

}
function initLocations(){
	var location1 = new locationItem("Royce Hall", 34.0728, -118.4422, "this is the description woo", royce);
	var location2 = new locationItem("Ackerman Union", 34.0728, -118.4422, "is the cornerstone of Bruin Plaza. It contains the UCLA store, an optometry store, a mail center, ATMs, and several restaurants.", royce);
	var location3 = new locationItem("Wooden Center", 34.0728, -118.4422, "is the main gym at UCLA. It has a rock climbing wall and almost all the weight equipment you would ever need.", royce);
	location_list.push(location1);
	location_list.push(location2);
	location_list.push(location3);

}
function launchAlbum(){
	page="album";
	background("#3284BF");
	//document.getElementsByTagName("video").remove();
	fill("white");
	textSize(50);
	push();
	scale(windowWidth/uclaLogo.width);
	image(uclaLogo, 0,0);
	pop();
	textAlign(CENTER);
	text(months[month()]+" "+ day()+", "+ year(), windowWidth/2, windowHeight/4);
	image(imagetest1, (windowWidth/4)/4, 500, imagetest1.width/4, imagetest1.height/4);
	image(imagetest1, (windowWidth/4)+(windowWidth/4)/2, 500, imagetest1.width/4, imagetest1.height/4);
	image(imagetest1, windowWidth-((windowWidth/4)+(windowWidth/4)/4), 500, imagetest1.width/4, imagetest1.height/4);


}
function photoPrompt(){
	background("255");
	push();
	scale(-1,1);
	if(capture){
		image(capture, -(capture.width*2.2), 0, height*capture.width/capture.height, height);
	}
	pop();
	fill("black");
	rect(30, 20, 55, 55);
	//image(imagetest1, 0, 0);
	// image(imagetest1, 0, 0, windowWidth, windowHeight);
	//siteInfo();
}
function navigation(){
	if (locationData.latitude) {
		background("#3284BF");
		// updatePos(p5.prototype.getCurrentPosition());
		//console.log(locationData);
		// text(locationData.latitude, 100, 100);
		fill("white");
		textSize(100);
		//console.log(locationData);
		//console.log(locationData.heading);
		text(distance + " mi", 350, 200);
		window.addEventListener('deviceorientation', function(e) {
			heading = e.webkitCompassHeading;
		 }, false);
		var a = atan(height/width);
		//console.log(a);
		translate(width/2, height/2);
		//text("value: " + a-heading, 0, 250);
		push();
		imageMode(CENTER);
		rotate(a-heading);
		image(img, 0,0);
		//rect(-20, -5, 40, 10);  Larger rectangle is rotating in degrees
		pop();

	}
}

function siteInfo(){
	if (location_list[location_counter]){
		var location_holder = location_list[location_counter];
		//console.log(location_holder.name);
		//yPos= windowHeight-royce.height;
		background("#3284BF");
		//rect(0, ypos, windowWidth, windowHeight);
		text("You made it to "+ location_holder.name + "!", 0, windowHeight/7);
		image(location_holder.image_var, 0, windowHeight/6, royce.width, royce.height);
		push();
		textSize(40);
		text( location_holder.description + "!", 0, windowHeight/2, windowWidth-100);
		pop();
		fill("black");
		rect(100, 20, 55, 55);
	}
}

function updatePos(location) {
	locationData = location;
	// console.log("wooo");
	//console.log(locationData);
	distance=Math.round(100*calcGeoDistance(locationData.latitude,locationData.longitude, coord1,coord2))/100;
	heightAngle = abs((coord2)-locationData.longitude);
	widthAngle = abs(coord1-locationData.latitude);
}
function mousePressed() {
	if ((mouseX <= 85 && mouseX>=30)&&(mouseY>=20 && mouseY<=75) && page=="photo-prompt") {
	  console.log("click!");
	  // saveFrames("out", "png", 1, 1, function(data){
	  //   print(data);
	  //   imagetest1= loadImage(data);
	  // });
	  //console.log(c);
	  imagetest1=get();
	  console.log("location counter: "+location_counter);
	  //capture.remove();
	  if(location_counter < location_list.length){
	  	location_counter++;
	  	page="navigation";
	  }
	  else{
	  	page="album";
	  }
	  
	} 
	else if ((mouseY>=2*height/3)&&(page=="navigation")){
	  page="site-info";
	}
	else if ((mouseX <= 155 && mouseX>=100)&&(mouseY>=20 && mouseY<=75) && page=="site-info") {
		// console.log("clicked");
		page="photo-prompt";
	}
}
