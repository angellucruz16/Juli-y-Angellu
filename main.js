import './style.css'

 // Find the latest version by visiting https://cdn.skypack.dev/three.
 import * as THREE from "https://cdn.skypack.dev/three@0.135.0";
//  🍒 3 const needed
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1,1000);
 const renderer = new THREE.WebGLRenderer({
   canvas: document.querySelector("#bg"),
   alpha:true
 });
 
 renderer.setPixelRatio( window.devicePixelRatio);
 renderer.setSize( window.innerWidth, window.innerHeight );
 camera.position.setZ(30);
 renderer.render( scene, camera);
//  🍒 geometry
  
//1 add a figure
// 2 add a material
// 3 mesh the figure with the material
// 4 add to scene
// create a fuction for animate it
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.PointsMaterial( { color: 0xffff00, size: 0.1 } );
const torus = new THREE.Points( geometry, material );
scene.add( torus );
//  🍒 Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//  🍒 Create Random stars
function stars() {
 const geometry = new THREE.SphereGeometry( 0.24, 24, 24);
 const material = new THREE.MeshStandardMaterial({ color: 0x000000 });
 const star = new THREE.Mesh( geometry, material );

//  random positions
const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );
star.position.set (x, y, z);
scene.add(star);
}

Array(200).fill().forEach(stars);

// 🍒 add a background img

const spaceImage = new THREE.TextureLoader().load('spacebg.png');
scene.background = spaceImage;

function moveCamera(){
   const t = document.body.getBoundingClientRect().top;
   camera.position.x = t * -0.0002;
   camera.position.y = t * -0.0002;
   camera.position.z = t * -0.01;

}

document.body.onscroll = moveCamera;


function animate(){
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render( scene, camera);
  
}
animate();