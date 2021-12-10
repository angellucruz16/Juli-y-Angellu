
import * as THREE from "https://cdn.skypack.dev/three@0.135.0";

const canvas = document.getElementById("background");


//INSERTAR CODIGO AQUI XD

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer(
{
    canvas: canvas,
    alpha: true
}
);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//cubo
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xc4c4c4 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


const animate = function () {
    requestAnimationFrame( animate );

    //animación cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();

