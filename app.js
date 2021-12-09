import * as THREE from "https://cdn.skypack.dev/three@0.135.0";

const canvas = document.querySelector("canvas.webgl");

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

const geometry1 = new THREE.BoxGeometry( 2,2.8, 0.2);

const material1 = new THREE.MeshStandardMaterial();
material1.roughness = 0;
material1.metalness = 0.4;
material1.transparent = true;
material1.fog = true;
material1.opacity = 0.6;
material1.normalMap = normalTexture;
material1.color = new THREE.Color(0xbff1fd);

const cube = new THREE.Mesh( geometry1, material1 );
cube.position.set(-0.1,0.6,0.1);

scene.add(cube);

const geometry = new THREE.SphereBufferGeometry(0.9, 50, 50);
const material = new THREE.MeshStandardMaterial();
material.metalness = 0;
material.roughness = 0.9;
material.normalMap = normalTexture2;
material.color = new THREE.Color(0x003a0e);

const ball = new THREE.Mesh(geometry, material);
ball.position.set(1.2, 1, -1)
scene.add(ball);

const light = new THREE.PointLight(0x00ffff, 1);
light.position.set(1,1,3);
scene.add(light);

const light0 = new THREE.PointLight(0xffffff, 0.1);
light0.position.set(1,1.2,10);
scene.add(light0);


const light1 = new THREE.PointLight(0xfceea7, 1.5);
light1.position.set(-3,8,2);
scene.add(light1);


const light2 = new THREE.PointLight(0x3200d4, 0.6);
light2.position.set(-2,0,-5);
scene.add(light2);

camera.position.z = 4;


const animate = function () {
    requestAnimationFrame(animate);

    ball.rotation.x += 0.01;
    ball.rotation.y += 0.01;

    renderer.render(scene, camera);
};


animate();