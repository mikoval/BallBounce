const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;

const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;

const div = document.querySelector('#container');

const renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled = true;
const camera =
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );
camera.position.y = 1.0;

const scene = new THREE.Scene();
var DirectionalLight  = new THREE.PointLight( 0xFFFFFF , 1, 100);
DirectionalLight.castShadow = true
DirectionalLight.shadowDarkness = 0.2;
DirectionalLight.position.y = 20;
DirectionalLight.position.x = 3;
DirectionalLight.position.z = 7;

var AmbientLight  = new THREE.AmbientLight( 0x404040 );


scene.add(camera);
scene.add(DirectionalLight)
scene.add(AmbientLight)

renderer.setSize(WIDTH, HEIGHT);

div.appendChild(renderer.domElement);

var playerTexture;
var loader = new THREE.TextureLoader();

function load(){
  loader.load('octave1.jpg', function ( texture){
      playerTexture = texture;
      console.log(playerTexture);
      if(playerTexture == undefined){
        load();
      }
      else{
        game = new Game(scene, camera);

      }


  })
}
load();


var game;
  



function update () {
  if(game){
     game.update();

     renderer.render(scene, camera);
  }
 

  requestAnimationFrame(update);
}

requestAnimationFrame(update);