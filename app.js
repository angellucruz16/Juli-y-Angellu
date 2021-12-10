import * as THREE from "https://cdn.skypack.dev/three@0.135.0";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.querySelector(".webgl");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('./img/mapav.jpg');

const textureLoader2 = new THREE.TextureLoader();
const normalTexture2 = textureLoader2.load('./img/mapb.jpg');



const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// Vidrio
const geometry1 = new THREE.BoxGeometry( 2,2.8, 0.2);

const material1 = new THREE.MeshStandardMaterial();
material1.roughness = 0;
material1.metalness = 0.4;
material1.transparent = true;
material1.fog = true;
material1.opacity = 0.6;
material1.normalMap = normalTexture;
material1.color = new THREE.Color(0x7694a3); // (0x######) Color del vidrio

const cube = new THREE.Mesh( geometry1, material1 );

//Aquí se cambia la posición del vidrio (x,y,z)
cube.position.set(-0.1,0.8,0.1);

scene.add(cube);


//Esfera
const geometry = new THREE.SphereBufferGeometry(0.9, 50, 50);
const material = new THREE.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 0.9;
material.normalMap = normalTexture2;
material.color = new THREE.Color(0x144b7c); //color

const ball = new THREE.Mesh(geometry, material);
ball.position.set(1.2, 1, -1) //posición
scene.add(ball);

//Cono
const geometry2 = new THREE.ConeGeometry(0.25, 0.6, 50);
const material2 = new THREE.MeshStandardMaterial();
material2.metalness = 0.6;
material2.roughness = 0.9;
material2.color = new THREE.Color(0xadcf87); //color

const obj = new THREE.Mesh(geometry2, material2);
obj.position.set(-0.7, 1, 1.5) //posición
obj.rotation.x = 0.4;
scene.add(obj);


//Luces
const light = new THREE.PointLight(0x00ffff, 1);
light.position.set(1,1,3);
scene.add(light);



const light0 = new THREE.PointLight(0xffffff, 0.3);
light0.position.set(-2,-4,11);
scene.add(light0);


const light1 = new THREE.PointLight(0xfceea7, 1.3);
light1.position.set(-3,8,2);
scene.add(light1);


const light2 = new THREE.PointLight(0xffffff, 0.6);
light2.position.set(-2,0,-5);
scene.add(light2);

camera.position.z = 3.5; // Aqui se le puede hacer zoom a todo
camera.position.y = 1.5;

//Eventos del mouse

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX);
    mouseY = (event.clientY - windowY);
}

const updateSphere = (event) => {
    cube.position.y = window.scrollY * .002;
    ball.position.y = window.scrollY * .001;
    obj.rotation.x +=.05


}

window.addEventListener("scroll", updateSphere);


const animate = function () {


    targetX = mouseX * .001;
    targetY = mouseY * .001;
    const elapsedTime = performance.now()*0.2;
    ball.rotation.x = .002 * elapsedTime;
    obj.rotation.z = .001 * elapsedTime;

    ball.rotation.y = .8 * (targetX - ball.rotation.y);
    ball.rotation.x = 1.8 * (targetY - ball.rotation.x);
    ball.rotation.z = -.8 * (targetY - ball.rotation.x);


    renderer.render(scene, camera);
    window.requestAnimationFrame(animate)

};


animate();