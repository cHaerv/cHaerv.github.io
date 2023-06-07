import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

renderer.render(scene, camera);



// const torus = new THREE.Mesh(geometry, material);

const sunTexture = new THREE.TextureLoader().load('sunTexture.jpg')

const homeSun = new THREE.Mesh(
  new THREE.SphereGeometry( 6, 50, 50),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  }),
);

scene.add(homeSun);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// const controls = new OrbitControls(camera, renderer.domElement);



function makeAsteroid() {
  
  const asteroidTexture = new THREE.TextureLoader().load('asteroidTexture.jpg')
  const asteroid = new THREE.Mesh( 
    new THREE.SphereGeometry(0.25, 24, 24),
    new THREE.MeshStandardMaterial({
      map: asteroidTexture,
    })
    );

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  asteroid.position.set(x,y,z);

  scene.add(asteroid)

};

Array(200).fill().forEach(makeAsteroid);

const backgroundTexture = new THREE.TextureLoader().load('newBackground.webp');
scene.background = backgroundTexture;




const planetOneTexture = new THREE.TextureLoader().load('planetOneTexture.png')
const PlanetOneNormalMap = new THREE.TextureLoader().load('planetOneNormalMap')

const planetOne = new THREE.Mesh(
  new THREE.SphereGeometry(3, 35, 35),
  new THREE.MeshStandardMaterial({
    map: planetOneTexture,
    normalMap: PlanetOneNormalMap,
  })
);

scene.add(planetOne);

planetOne.position.z = 55;
planetOne.position.x = -10;

const planetTwoTexture = new THREE.TextureLoader().load('planetTwoTexture.png')
const PlanetTwoNormalMap = new THREE.TextureLoader().load('planetOneNormalMap')

const planetTwo = new THREE.Mesh(
  new THREE.SphereGeometry(4, 40, 40),
  new THREE.MeshStandardMaterial({
    map: planetTwoTexture,
    normalMap: PlanetTwoNormalMap
  })
);

scene.add(planetTwo);

planetTwo.position.z = 80;
planetTwo.position.x = -15;

const planetTwoRingTexture = new THREE.TextureLoader().load('spaceStationTextureFive.jpg');

const planetTwoRing = new THREE.Mesh(
  new THREE.TorusGeometry(10, 1, 8, 50),
  new THREE.MeshStandardMaterial({
    map: planetTwoRingTexture,
    normalMap: PlanetOneNormalMap
  })
);

scene.add(planetTwoRing);

planetTwoRing.position.z = 80;
planetTwoRing.position.x = -15;

const planetThreeTexture = new THREE.TextureLoader().load('planetThreeTexture.webp');

const planetThree = new THREE.Mesh(
  new THREE.SphereGeometry(5, 40, 40),
  new THREE.MeshStandardMaterial({
    map: planetThreeTexture,
    normalMap: PlanetOneNormalMap
  })
);

scene.add(planetThree);

planetThree.position.z = 110;
planetThree.position.x = -25;

// spaceTexture.jpg
// spaceStationTextureFour.jpg

function animate() {
  requestAnimationFrame( animate);
  
  homeSun.rotation.y += 0.002;
  
  planetOne.rotation.y += 0.003

  planetTwo.rotation.y += 0.003

  planetTwoRing.rotation.x += 0.01;
  planetTwoRing.rotation.y += 0.002;

  planetThree.rotation.y += 0.005;

  
  
  

  // controls.update();
 renderer.render(scene, camera);
};




animate();


function scrollCamera() {
  const t = document.body.getBoundingClientRect().top;

  
    camera.position.z = (t * -0.05) + 30;
  
  // camera.position.x = top * -0.002;
  // camera.rotation.y = top * -0.002;
  
};

document.body.onscroll = scrollCamera

