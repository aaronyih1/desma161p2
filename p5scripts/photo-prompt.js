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
/////////IMAGE VARS///////
var royce;
var ackerman;
var sgarden;
var bgarden;
var wooden;
var fowler;

//////////////////////////

var camera;
var ypos;
var heading;
var location_list = [];
var location_counter=0;
var selfies=[];
var heightSpacing = 500;
var capturing = false;

function locationItem(name, latitude, longitude, description, image_var){
	this.name = name;
	this.latitude = latitude;
	this.longitude = longitude;
	this.description = description;
	this.image_var = image_var;
}
function preload(){
	royce = loadImage("imgs/royce.jpg");
	ackerman = loadImage("imgs/ackerman.jpg");
	sgarden = loadImage("imgs/sgarden.jpg");
	bgarden = loadImage("imgs/bgarden.jpg");
	wooden = loadImage("imgs/wooden.jpg");
	fowler = loadImage("imgs/fowler.jpg");
	uclaLogo = loadImage("imgs/ucla-logo.jpg");
	img = loadImage("imgs/white-arrow.png");
	camera = loadImage("imgs/camera.png");

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
	//console.log(location_list);
	coord1=location_list[0].latitude;
	coord2=location_list[0].longitude;
	angleMode(DEGREES);
	ellipseMode(CORNER);
	  	//if(geoCheck() == true){
			//geolocation is available
		//}else{
			//error getting geolocaion
		//}
	// // capture.size(windowWidth, windowHeight);
	// imagetest2=loadImage(imagetest1);
}


function draw() {
	//console.log(page);
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
	var location1 = new locationItem("Royce Hall", 34.0728, -118.4422, "Royce is one of UCLA's most iconic sights on campus. It acts as an event venue and language hall. Can you find the asymetry in the façade?", royce);
	var location2 = new locationItem("Ackerman Union", 34.0704, -118.4442, "Ackerman is the cornerstone of Bruin Plaza. It contains the UCLA store, an optometry store, a mail center, ATMs, and several restaurants.", ackerman);
	var location3 = new locationItem("Wooden Center", 34.0712, -118.4457, " Wooden is the main gym at UCLA. It has a rock climbing wall and almost all the weight equipment you would ever need.", wooden);
	var location4 = new locationItem("Sculpture Garden", 34.0751, -118.4401, "The sculpture garden is often cited by students as the most beautiful part of the UCLA campus. It contains important works by Auguste Rodin, Richard Serra, and more.", sgarden);
	var location5 = new locationItem("Botanical Garden", 34.0656, -118.4411, "The Mildred E. Mathias Botanical Garden is a 7.5 acre slice of serenity preserved on the outskirts of the UCLA campus. There are all kinds of amazing plants — over 3,000 to be species.", bgarden);
	var location6 = new locationItem("UCLA Herbarium", 34.0669, -118.4411, "The Herbarium is a massive collection of plant samples — around 200,000 to be more speci c. It’s mostly used for research purposes, but it’s definintely something unique to visit.", royce );
	var location8 = new locationItem("Fowler Museum", 34.0729, -118.4430, "The Fowler is a full-fledged global art and culture museum on UCLA’s campus. It focuses mostly on Asian, African, Paci c, and the Americas. They often have really cool events here including musical performances.", fowler);
	
	location_list.push(location3);
	location_list.push(location2);
	location_list.push(location1);
	location_list.push(location5);
	location_list.push(location4);
	location_list.push(location8);
	// location_list.push(location7);
	// location_list.push(location8);

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
	text(months[month()]+" "+ day()+", "+ year(), windowWidth/2, windowHeight/3.3);
	// image(imagetest1, (windowWidth/4)/4, 500, imagetest1.width/4, imagetest1.height/4);
	// image(imagetest1, (windowWidth/4)+(windowWidth/4)/2, 500, imagetest1.width/4, imagetest1.height/4);
	// image(imagetest1, windowWidth-((windowWidth/4)+(windowWidth/4)/4), 500, imagetest1.width/4, imagetest1.height/4);
	heightSpacing=500;
	for (var i = 0; i<location_list.length; i++){
		//console.log("i: "+i + " k: "+k+ " location: " + location_list[i].name);
		//console.log(heightSpacing);
		if (i%3==0){
			//image(selfies[i], ((((i%3)+1)*(windowWidth/4)/4)+(i%3*(windowWidth/4))), heightSpacing, selfies[i].width/4, selfies[i].height/4 );
			// image(selfies[i], ((((i%3)+1)*(windowWidth/4)/4)+(i%3*(windowWidth/4))), , selfies[i].width/4, selfies[i].height/4 );
			//console.log("verticality loop reached! " + i);
			if (i!=0){
				heightSpacing += 400;
			}
		}
		image(selfies[i], ((((i%3)+1)*(windowWidth/4)/4)+(i%3*(windowWidth/4))), heightSpacing, selfies[i].width/4, selfies[i].height/4 );
		// if((i%3 != 0)){
			
		// }
	}


}
function photoPrompt(){
	background("255");
	push();
	scale(-1,1);
	if(capture){
		image(capture, -(capture.width*2.2), 0, height*capture.width/capture.height, height);
	}
	pop();
	// shutterToggle(capturing);
	push();
	noFill();
	strokeWeight(4);
	stroke("white");
	ellipse((windowWidth/2)-50, 10*(windowHeight/11), 100, 100);
	pop();
	locationData =  p5.prototype.getCurrentPosition(updatePos);
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
		fill("white");
		var location_holder = location_list[location_counter];
		//console.log(location_holder.name);
		//yPos= windowHeight-royce.height;
		background("#3284BF");
		//rect(0, ypos, windowWidth, windowHeight);
		image(location_holder.image_var, 0, 0, windowWidth, windowWidth*(location_holder.image_var.height/location_holder.image_var.width));
		text(location_holder.name, windowWidth/20, windowWidth*(location_holder.image_var.height/location_holder.image_var.width)+150, 9*(windowWidth/10));
		push();
		textSize(40);
		text( location_holder.description, windowWidth/20, windowWidth*(location_holder.image_var.height/location_holder.image_var.width)+250, windowWidth-100, 9*(windowWidth/10));
		pop();
		fill("black");
		image(camera, (windowWidth)-200, 9*(windowHeight/10), 100, 100);
		//rect((windowWidth/2)-50, 9*(windowHeight/10), 100, 100);
	}
}

function updatePos(location) {
	locationData = location;
	// console.log("wooo");
	//console.log(locationData);
	console.log(location_list[location_counter].longitude);
	distance=Math.round(100*calcGeoDistance(locationData.latitude,locationData.longitude, location_list[location_counter].latitude,location_list[location_counter].longitude))/100;
	console.log(distance);
	heightAngle = abs((location_list[location_counter].longitude)-locationData.longitude);
	widthAngle = abs(location_list[location_counter].latitude-locationData.latitude);
}
// function shutterToggle(capturing){
// 	if (capturing = true){
// 		noFill();
// 		rect(30, 20, 55, 55);
// 		capturing = false;
// 	}
// 	else{
// 		fill("black");
// 		rect(30, 20, 55, 55);
// 	}

// }
function mousePressed() {
	if ((mouseX <= (windowWidth/2)+50 && mouseX>=(windowWidth/2)-100) && (mouseY>=9*(windowHeight/10) && mouseY<=9*(windowHeight/10)+100) && page=="photo-prompt") {
	  //console.log("click!");
	  // saveFrames("out", "png", 1, 1, function(data){
	  //   print(data);
	  //   imagetest1= loadImage(data);
	  // });
	  //console.log(c);
	  capturing = true;
	  //shutterToggle(capturing);
	  selfies.push(get());
	  console.log("location counter: "+location_counter);
	  //capture.remove();
	  if(location_counter < location_list.length-1){
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
	else if ((mouseX <= (windowWidth)-100 && mouseX>=(windowWidth)-200)&&(mouseY>=9*(windowHeight/10) && mouseY<=9*(windowHeight/10)+100) && page=="site-info") {
		// console.log("clicked");
		page="photo-prompt";
	}
}
