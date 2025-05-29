console.log("✅ script.js loaded");

const iconNames = [
  "AWS", "Ansible", "Azure DevOps", "Azure cloud",
  "Docker icon", "Docker", "Git", "Github",
  "Google Cloud", "Grafana", "JFrog", "Jenkins"
];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(375, 375);

const container = document.querySelector('.skill-tag-cloud');
container.appendChild(renderer.domElement);
renderer.setClearColor(0x000000, 0);

const group = new THREE.Group();
const loader = new THREE.TextureLoader();
const sprites = [];
const radius = 27;
const size = 6;

const icons = iconNames.map(name =>
  `https://raw.githubusercontent.com/hayatcode/Portfolio/main/Asset/${encodeURIComponent(name)}.svg`
);

icons.forEach((url, i) => {
  loader.load(url, texture => {
    const phi = Math.acos(-1 + (2 * i) / icons.length);
    const theta = Math.sqrt(icons.length * Math.PI) * phi;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
    sprite.scale.set(size, size, 1);
    sprite.position.set(
      radius * Math.cos(theta) * Math.sin(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(phi)
    );
    group.add(sprite);
    sprites.push(sprite);
  });
});

scene.add(group);
camera.position.z = 50;

function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();
