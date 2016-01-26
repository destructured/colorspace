'use strict';

exports.generate = function () {
  let height = window.innerHeight;
  let width = window.innerWidth;

  let container;
  let camera;
  let scene;
  let renderer;
  let controls;

  init();
  animate();

  function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.OrthographicCamera(
      width / -2,
      width / 6,
      height / 2,
      height / -2,
      -500,
      600
    );

    camera.position.x = 100;
    camera.position.y = 110;
    camera.position.z = 200;

    scene = new THREE.Scene();

    let size = 1000;
    let step = 30;
    let geometry = new THREE.Geometry();

    for (let i = -size; i <= size; i += step) {
      geometry.vertices.push(new THREE.Vector3(-size, 10, i));
      geometry.vertices.push(new THREE.Vector3(size, 10, i));
    }

    let geometry2 = new THREE.Geometry();

    for (let i = -size; i <= size; i += step) {
      geometry2.vertices.push(new THREE.Vector3(i, 160, -size));
      geometry2.vertices.push(new THREE.Vector3(i, 160, size));
    }

    let material2 = new THREE.LineBasicMaterial({
      color: '#ff00e9',
      opacity: 0.9
    });

    let line2 = new THREE.LineSegments(geometry2, material2);
    scene.add(line2);

    // Cubes - y-axis
    geometry = new THREE.BoxGeometry(100, 250, 240);
    let material = new THREE.MeshLambertMaterial({
      color: '#ff00e9',
      transparent: true,
      opacity: 0.3
    });

    for (let i = 0; i < 20; i++) {
      let cube = new THREE.Mesh(geometry, material);

      cube.scale.y = Math.floor(Math.random() * 5 + 1);
      cube.position.x = Math.floor((Math.random() * 400) / 15) * 15 - 312;
      cube.position.y = (cube.scale.y * 50) / 2;
      cube.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 25 + 312;

      scene.add(cube);
    }

    // Cubes - x-axis
    let geometry3 = new THREE.BoxGeometry(250, 200, 40);
    let material3 = new THREE.MeshLambertMaterial({
      color: '#10dfe9',
      transparent: true,
      opacity: 0.2
    });

    for (let i = 0; i < 40; i++) {
      let cube3 = new THREE.Mesh(geometry3, material3);

      cube3.scale.x = Math.floor((Math.random() * 500 - 250));
      cube3.position.x = Math.floor((Math.random() * 500 - 250));
      cube3.position.y = Math.floor((Math.random() * 500 - 250));
      cube3.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 25 + 12;
      cube3.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 50;

      scene.add(cube3);
    }

    let geometry4 = new THREE.BoxGeometry(550, 550, 140);
    let material4 = new THREE.MeshLambertMaterial({
      color: '#10dfe9',
      transparent: true,
      opacity: 0.3
    });

    for (let i = 0; i < 10; i++) {
      let cube4 = new THREE.Mesh(geometry4, material4);

      cube4.scale.x = Math.floor((Math.random() * 500 - 250));
      cube4.position.x = Math.floor((Math.random() * 500 - 150));
      cube4.position.y = Math.floor((Math.random() * 500 - 250));
      cube4.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 25 + 12;
      cube4.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 50;

      scene.add(cube4);
    }

    geometry2 = new THREE.BoxGeometry(120, 450, 400);
    material2 = new THREE.MeshLambertMaterial({
      color: '#ff00e9',
      transparent: true,
      opacity: 0.1
    });

    for (let i = 0; i < 50; i++) {
      let cube2 = new THREE.Mesh(geometry2, material2);

      cube2.scale.y = Math.floor(Math.random() * 5 + 1);
      cube2.position.x = Math.floor((Math.random() * 500) / 25) * 25 + 12;
      cube2.position.y = (cube2.scale.y * 60);
      cube2.position.z = Math.floor((Math.random() * 500 - 250) / 25) * 25 - 112;

      scene.add(cube2);
    }

    // Lights
    let ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight('#fff');
    directionalLight.position.x = 0.5;
    directionalLight.position.y = 0.3;
    directionalLight.position.z = 0.2;
    directionalLight.position.normalize();
    scene.add(directionalLight);

    renderer = new THREE.WebGLRenderer({
      alpha: true
    });

    renderer.setClearColor('#fff', 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / -2;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 110);

    controls.update();
    render();
  }

  function render() {
    let timer = Date.now() * 0.00008;
    camera.rotation.y = Math.sin(timer) + 1300;
    camera.rotation.x = Math.cos(timer) + 1200;

   // camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
};
