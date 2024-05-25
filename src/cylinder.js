import * as THREE from 'three';


const geometry = new THREE.CylinderGeometry( 20, 20, 10,32 );
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff
});
const cylinder = new THREE.Mesh( geometry, material );

// cylinder.rotatey(-Math.PI / 2);
cylinder.position.set(0,-5, 0);

cylinder.castShadow = true;
export default cylinder;


