import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import gui from 'three/addons/libs/lil-gui.module.min.js';

import { render } from 'lit';
import cylinder from './cylinder.js';
import ground from './ground.js'

let camera, scene, renderer, stats;
// const clock = new Clock();
function init() {
  // 场景
  scene = new THREE.Scene();

 //添加物体
  scene.add(cylinder,ground);
  
  // 相机
  camera = new THREE.PerspectiveCamera(
    35, // 视野角度
    window.innerWidth / window.innerHeight, // 长宽比
    0.1, // 近截面（near）
    300 // 远截面（far）
  );
  camera.position.set(100, 100, 100);
  camera.lookAt(0, 0, 0);
  // 雾感效果
  // scene.fog = new THREE.FogExp2( 0x000000, 0.0008 );
  // // 光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  //点光源
  const spotLight=new THREE.SpotLight(0xffffff,50); 
  spotLight.decay=0.3 
  spotLight.angle=Math.PI/5  
  spotLight.position.set(60,10,0)  
  spotLight.penumbra=0.7  
  spotLight.castShadow=true

  const spotLightHelper=new THREE.SpotLightHelper(spotLight);  //辅助对象，用于可视化光束的位置和方向
  
  scene.add(spotLightHelper);
  scene.add(spotLight);


  // 渲染器
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // renderer.render(scene, camera);
  renderer.shadowMap.enabled=true;
  document.body.appendChild(renderer.domElement);
  
  window.onresize = onWindowResize;
  initHelper();
  initGUI(ambientLight);
  
}
function initGUI(ambientLight){
  const gui = new GUI();
  const obj = {
    x: 1,
    intensity: 1
  }
}

function animate() {
  // 浏览器刷新的时候渲染器重新渲染
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
    renderer.render(scene, camera);
    stats.update();
  
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  camera.updateProjectionMatrix();
}

function initHelper() {
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', () => {
    renderer.render(scene, camera);
  });

  // const gridHelper = new THREE.GridHelper(1000, 100);
  // scene.add(gridHelper);

  //创建stats对象
  stats = new Stats();
  document.body.appendChild(stats.domElement);

}

init();
animate();