song = "";

function preload()
{
    song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
  canvas =  createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    console.log(results);
  if(results.length > 0)
  {
    console.log(results);

    scoreRightWrist =  results[0].pose.keypoints[10].score;
    scoreLeftWrist =  results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
        
  }
}

function draw(){
  image(video, 0, 0, 500, 500);
  fill("red");
  stroke("red");
  if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    numberly = Number(leftWristY);
    removedes = floor(numberly);
    volume = removedes/500;
    document.getElementById("volume").innerHTML = "Volume is " + volume;
    song.setVolume(volume);
  }
}

function playmusic(){
  song.play();
  song.setVolume(1);
  song.rate(3);
}

function stopmusic(){
    song.stop();
}