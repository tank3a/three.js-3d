import * as THREE from "three"
import { FontLoader, TextGeometry } from "three";

import {
    WEBGL
} from './webgl'

if(WEBGL.isWebGLAvailable()) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    //화각, 종횡비, 근, 원
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias : true
    });
 
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);


//도형 추가
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(500, 500),
        new THREE.MeshStandardMaterial({color: 0x4e8f8f})
    );
    scene.add(ground);
    ground.rotateX(-Math.PI/2);
    ground.position.y = -5;
    ground.receiveShadow = true;

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(-5, 5, 10);
    scene.add(pointLight);

    const geometryCube = new THREE.BoxGeometry(2, 2, 2);
    const materialCube = new THREE.MeshStandardMaterial({
        roughness: 0.5,
        color:0x000000
    });

    const cube = new THREE.Mesh(geometryCube, materialCube);
    cube.position.x = -7;
    scene.add(cube);

    const geometrySphere = new THREE.SphereGeometry(1.5, 64, 32);
    const materialSphere = new THREE.MeshStandardMaterial({
        color:0x999999,
        wireframe: true
    });

    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.x = -3;
    scene.add(sphere);

    const geometryTetra = new THREE.TetrahedronGeometry(2, 0);
    const materialTetra = new THREE.MeshStandardMaterial({
        metalness: 0.1,
        roughness: 0.3,
        color:0x999999
    });

    const tetrahedron = new THREE.Mesh(geometryTetra, materialTetra);
    tetrahedron.position.x = 1;
    scene.add(tetrahedron);


    let text = "김종원";
    let textMesh;

    const loader = new FontLoader();

    loader.load("NanumGothic_Regular.json", (font) => {
        const geometryText = new TextGeometry(text, {
            font: font,
            size: 1.5,  
            height: 0.5,  
        });

        textMesh = new THREE.Mesh(geometryText, [
            new THREE.MeshStandardMaterial({color: 0x999999, roughness: 1}),
            new THREE.MeshStandardMaterial({color: 0xEDEDED})
        ]);

        scene.add(textMesh);
        
        textMesh.position.x = 3;
    })




    function render(time) {
        time *= 0.001;  // convert time to seconds
       
        cube.rotation.x = time;
        cube.rotation.y = time;

        sphere.rotation.x = time;
        sphere.rotation.y = time;

        tetrahedron.rotation.x = time;
        tetrahedron.rotation.y = time;


        renderer.render(scene, camera);
       
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);

    //   function onWindowResize() {
    //     camera.aspect = window.innerWidth / window.innerHeight;
    //     camera.updateProjectionMatrix();
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //   }

    //   window.addEventListener("resize", onWindowResize);

}
else {
    var warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}