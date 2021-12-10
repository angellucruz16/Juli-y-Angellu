
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
const geometry = new THREE.TorusGeometry( 10, 5, 16, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0xd5d5d5 } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

camera.position.z = 5;


const animate = function () {
    requestAnimationFrame( animate );

    //animación cubo
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();

