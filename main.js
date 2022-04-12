function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelLoaded)
}
function modelLoaded(){
  console.log("model is loaded")

}

function draw(){
   image(video,0,0,300,300)
   classifier.classify(video,gotresult)

  }
previousresult = ""

function gotresult(error,results)
{
if(error){
  console.log(error)
  
}
else{
  if ((results[0].confidence > 0.5)&&(previousresult!= results[0].label)){
console.log(results)
previousresult = results[0].label
  document.getElementById("Results_label").innerHTML = results[0].label
  document.getElementById("Results_accuracy").innerHTML = results[0].confidence.toFixed(3)
synth = window.speechSynthesis
sd = "Object Detected is" + results[0].label
utterThis = new SpeechSynthesisUtterance(sd)
synth.speak(utterThis)
}
}
}
