let obj;
let textureImg;
let spinLogo = false;
let roughnessValue = 7; // Adjust the roughness value here
let obj2;
let spinLogo2 = false;
let logoScale = 0.165; // Adjust this scale factor based on your needs
let val=0;


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
  cam = createCamera();
  perspective();
}

function draw() {
  // Draw the 3D model and lights
  background("rgba(0, 0, 0, 0)");
  //orbitControl();
  vinhControl();
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

p5.prototype.vinhControl = function(sensitivityX, sensitivityY, sensitivityZ) {
  //init 3d 
  this._assert3d('vinhControl');


  // If the mouse is not in bounds of the canvas, disable all behaviors:
  const mouseInCanvas =
    this.mouseX < this.width &&
    this.mouseX > 0 &&
    this.mouseY < this.height &&
    this.mouseY > 0;
  if (!mouseInCanvas) return;

  const cam = this._renderer._curCamera;
  //default zooms

  if (typeof sensitivityX === 'undefined') {
    sensitivityX = 1;
  }
  if (typeof sensitivityY === 'undefined') {
    sensitivityY = sensitivityX;
  }
  if (typeof sensitivityZ === 'undefined') {
    sensitivityZ = 0.5;
  }
//zoom
  const scaleFactor = this.height < this.width ? this.height : this.width;
  this._renderer._curCamera._orbit(0, 0, val * scaleFactor);

  if (this.mouseIsPressed) {
    // ORBIT BEHAVIOR
    if (this.mouseButton === this.LEFT) {
      const deltaTheta =
        -sensitivityX * (this.mouseX - this.pmouseX) / scaleFactor;
      const deltaPhi =
        sensitivityY * (this.mouseY - this.pmouseY) / scaleFactor;
      this._renderer._curCamera._orbit(deltaTheta, deltaPhi, 0);
    } else if (this.mouseButton === this.RIGHT) {
      // PANNING BEHAVIOR along X/Z camera axes and restricted to X/Z plane
      // in world space
      const local = cam._getLocalAxes();

      // normalize portions along X/Z axes
      const xmag = Math.sqrt(local.x[0] * local.x[0] + local.x[2] * local.x[2]);
      if (xmag !== 0) {
        local.x[0] /= xmag;
        local.x[2] /= xmag;
      }

      // normalize portions along X/Z axes
      const ymag = Math.sqrt(local.y[0] * local.y[0] + local.y[2] * local.y[2]);
      if (ymag !== 0) {
        local.y[0] /= ymag;
        local.y[2] /= ymag;
      }

      // move along those vectors by amount controlled by mouseX, pmouseY
      const dx = -1 * sensitivityX * (this.mouseX - this.pmouseX);
      const dz = -1 * sensitivityY * (this.mouseY - this.pmouseY);

      // restrict movement to XZ plane in world space
      cam.setPosition(
        cam.eyeX + dx * local.x[0] + dz * local.z[0],
        cam.eyeY,
        cam.eyeZ + dx * local.x[2] + dz * local.z[2]
      );
    }
  }
  return this;
};


