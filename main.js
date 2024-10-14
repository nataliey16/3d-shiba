import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//Use Three.js Renderer to render model on page using querySelector
//set colour and size
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xffffff)); // hex for white //white

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // damping makes camera movements smoother - slows does cameras motion when usr stops interacting with control

const loader = new GLTFLoader();

let shiba;
loader.load(
  "./public/shiba.glb",

  function (gltf) {
    shiba = gltf.scene;
    scene.add(shiba);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
