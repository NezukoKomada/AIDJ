var song = "";
lx = 0;
ly = 0;
rx = 0;
ry = 0;

function preload(){
    song  = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 500, 500);
}

function playmusic(){
    song.play();
    song.setVolume(1);
    song.rate(3);
}

function stopmusic(){
    song.stop();
}

function modelLoaded(){
    console.log("PoseNet is initilised!");
}

function gotPoses(results){
    console.log(results);
    if(results.length > 0){
        console.log(results);
        lx = results[0].pose.leftWrist.x;
        ly = results[0].pose.leftWrist.y;
        rx = results[0].pose.rightWrist.x;
        ry = results[0].pose.rightWrist.y;
    }
}