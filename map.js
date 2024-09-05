// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const mapContainer = document.getElementById('map-container');
renderer.setSize(mapContainer.clientWidth, mapContainer.clientHeight);
mapContainer.appendChild(renderer.domElement);

// Initialize the CSS2DRenderer for text labels
const labelRenderer = new THREE.CSS2DRenderer();
labelRenderer.setSize(mapContainer.clientWidth, mapContainer.clientHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
mapContainer.appendChild(labelRenderer.domElement);

// Add orbit controls to navigate the scene
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Create the ground/map with a texture
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/88.3426,22.5856,16,0/1024x1024?access_token=pk.eyJ1IjoicHJpeWFuc2h1MjMxMyIsImEiOiJjbTA5czl2emwwcDM0MnRzNGZ4M2I0bmw1In0.kDevebDg_UDAaxJu9czgDw');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(1, 1);

const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Rotate to make it flat
scene.add(ground);

// Function to create text labels
function createLabel(text, position) {
    const div = document.createElement('div');
    div.className = 'label';
    div.textContent = text;
    const label = new THREE.CSS2DObject(div);
    label.position.set(position.x, position.y, position.z);
    scene.add(label);
    return label;
}

// Load the GLTF models and add labels
const loader = new THREE.GLTFLoader();
loader.load('New folder/scene.gltf', function(gltf) {
    const model = gltf.scene;
    model.position.set(27, 0.25, 50); // Position the model
    model.scale.set(0.05, 0.05, 0.05); // Scale the model
    model.rotation.y = Math.PI / -14;
    scene.add(model);
    createLabel('Ticket Counter', new THREE.Vector3(27, 0.25, 50)); // Add label above the model
});

loader.load('New folder/scene.gltf', function(gltf) {
    const model1 = gltf.scene;
    model1.position.set(25, 0.25, 55); // Set the position as needed
    model1.scale.set(0.05, 0.05, 0.05);
    model1.rotation.y = Math.PI / -14;
    scene.add(model1);
    createLabel('Ticket Counter 2', new THREE.Vector3(25, 0.25, 55)); // Corrected position for label
});

// Platforms and labels
const platformGeometry = new THREE.BoxGeometry(2, 1, 20);
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
const platform1 = new THREE.Mesh(platformGeometry, platformMaterial);
platform1.position.set(-7, 0.5, 9);
scene.add(platform1);
platform1.rotation.y = Math.PI / 2.7;
createLabel('Platform 1', new THREE.Vector3(-7, 1.5, 9)); // Label above platform 1

const platform2 = platform1.clone();
platform2.position.set(-10, 0.25, 15);
scene.add(platform2);
platform2.rotation.y = Math.PI / 2.7;
createLabel('Platform 2', new THREE.Vector3(-10, 1.5, 15)); // Label above platform 2

const platform3 = platform1.clone();
platform3.position.set(-19, 0.25, 20);
scene.add(platform3);
platform3.rotation.y = Math.PI / 2.7;
createLabel('Platform 3', new THREE.Vector3(-19, 1.5, 20)); // Label above platform 3

// Buildings and labels
const buildingGeometry = new THREE.BoxGeometry(2, 1, 1.6);
const buildingMaterial = new THREE.MeshBasicMaterial({ color: 0xffa700 });
const building1 = new THREE.Mesh(buildingGeometry, buildingMaterial);
building1.position.set(-8, 0.25, 35);
building1.rotation.y = Math.PI / 2.59;
scene.add(building1);
createLabel('Food Court', new THREE.Vector3(-8, 1.75, 35)); // Label above building 1

const building2 = building1.clone();
building2.position.set(-7, 0.25, 29);
scene.add(building2);
createLabel('Wash Room', new THREE.Vector3(-7, 1.75, 29)); // Label above building 2

const building3 = building1.clone();
building3.position.set(-5, 0.25, 40);
scene.add(building3);
createLabel('Enquiry', new THREE.Vector3(-5, 1.75, 40)); // Label above building 3

// Security buildings and labels
const securityGeometry = new THREE.BoxGeometry(3, 1, 2);
const securityMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
const security1 = new THREE.Mesh(securityGeometry, securityMaterial);
security1.position.set(3, 0.25, 23);
security1.rotation.y = Math.PI / -6.5;
scene.add(security1);
createLabel('RPF', new THREE.Vector3(3, 1.75, 23)); // Label above security building

// Add lighting
const light = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 50, 50);
scene.add(directionalLight);

// Position the camera
camera.position.set(0, 50, 100); // Move camera up and back to avoid viewing the bottom
camera.lookAt(0, 0, 0); // Focus on the center of the scene
camera.near = 1;
camera.far = 200;
camera.updateProjectionMatrix();

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera); // Render the labels
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = mapContainer.clientWidth;
    const height = mapContainer.clientHeight;
    renderer.setSize(width, height);
    labelRenderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});


