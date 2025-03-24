import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from 'https://cdn.skypack.dev/gsap'
// import { gsap } from 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js'

const camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 15;

const scene = new THREE.Scene();
let guitar;

const loader = new GLTFLoader();
loader.load(
  './assets/guitar.glb',
  function (gltf) {
    guitar = gltf.scene;
    modelMove()
    scene.add(guitar)
  },
  function (xhr) { },
  function (error) { }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement)

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambientLight);
const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(500, 500, 500)
scene.add(topLight)


const reRender3D = () => {
  requestAnimationFrame(reRender3D)
  renderer.render(scene, camera)
}

reRender3D();

let arrPositionModel = [
  {
    id: "numb_header",
    position: { x: window.innerWidth < 768 ? 0.5 : 1, y: 0, z: -2 },
    rotation: { x: 0, y: 0.3, z: 1 },
  },
  {
    id: "about",
    position: { x: window.innerWidth < 768 ? -0.5 : -1, y: 0, z: -2 },
    rotation: { x: 0, y: 1.5, z: 1 },
  },
  {
    id: "contact",
    position: { x: window.innerWidth < 768 ? 0.5 : 1, y: 0, z: -2 },
    rotation: { x: 0, y: 0.3, z: 1 },
  },
]

const modelMove = () => {
  const sections = document.querySelectorAll(".section");
  let currentSection;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2) {
      currentSection = section.id
    }
  })
  console.log(currentSection)
  let position_active = arrPositionModel.findIndex((val) => val.id == currentSection);
  if (position_active >= 0) {
    let new_coordinates = arrPositionModel[position_active];
    gsap.to(guitar.position, {
      x: new_coordinates.position.x,
      y: new_coordinates.position.y,
      z: new_coordinates.position.z,
      duration: 1,
      ease: "power1.out"
    })
    gsap.to(guitar.rotation, {
      x: new_coordinates.rotation.x,
      y: new_coordinates.rotation.y,
      z: new_coordinates.rotation.z,
      duration: 1,
      ease: "power1.out"
    })
    // guitar.position.x = new_coordinates.position.x
    // guitar.position.y = new_coordinates.position.y
    // guitar.position.z = new_coordinates.position.z
  }

}

window.addEventListener('scroll', () => {
  if (guitar) {
    modelMove();
  }
})


window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})






