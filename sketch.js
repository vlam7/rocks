let obj;
let textureImg;
let spinLogo = false;
let roughnessValue = 7; // Adjust the roughness value here
let obj2;
let spinLogo2 = false;
let logoScale = 0.165; // Adjust this scale factor based on your needs


function preload() {
  // Load the 3D model during the preload phase
  obj = loadModel('VL Logo.obj', true);
  textureImg = loadImage('texture5.jpg');
  obj2 = loadModel('logo.obj', true);
  img2 = loadImage('light2.gif');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  noStroke();
}

function draw() {
  // Draw the 3D model and lights
  background("rgba(0, 0, 0, 0)");

  
  orbitControl();
  rotateX(PI);
  rotateY(PI);
  //rotateZ(PI * -0.02);

  // Reduce the intensity of directional light
  directionalLight(255, 255, 255, 0, 0, 1);

  // Reduce the intensity of ambient light
  ambientLight(100);

  // Set the color of the 3D model
  normalMaterial(37, 46, 44);
  //ambientMaterial(37, 46, 44);

  specularMaterial(92, 81, 55);
  shininess(roughnessValue);

  // Adjust the position of the point light to the front
  pointLight(255, 255, 255, 0, 0, 200);
  translate(50, height / -5);
  scale(-3.1, 3.1, 3.1);
  texture(textureImg);
  model(obj);

  

  //let locX = mouseX - width / 2;
  //let locY = mouseY - height / 2;

  // Display the 3D model
  
  // if (spinLogo) {
  //   rotateY(frameCount * 0.01); // Rotate the model for animation
  // }
  directionalLight(255, 255, 255, 0, 0, 1);

  ambientLight(100);

  // Set the color of the 3D model to 8C7853
  //ambientMaterial(140, 120, 83);
  specularMaterial(55, 44, 30); // Orange color
  shininess(4); // Adjust the shininess for a metallic look
  pointLight(255, 255, 255, -40, -20, 200);

  // Scale the model based on the predefined scale factor
  translate(23, height / 5.8 - 100);
  scale(logoScale);
  texture(img2);
  model(obj2);

}



