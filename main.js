import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

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
  "./shiba.glb",

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
  controls.update(); // Update controls with damping
  renderer.render(scene, camera);
}

//coordinations of dog and where user clicks on screen
//Raycasting used to determine what objects in the 3d space the mouse is over
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// handle mouse-down events to detect clicks on dog to trigger a jump
function onDocumentMouseDown(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const jumpHeight = 1.5;
    const jumpDuration = 0.4;
    gsap.to(shiba.position, {
      y: jumpHeight,
      duration: jumpDuration,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });
  }
}

document.addEventListener("mousedown", onDocumentMouseDown, false);
//recursively is called
animate();
