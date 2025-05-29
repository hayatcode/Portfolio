const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
const group = new THREE.Group();
const loader = new THREE.TextureLoader();

// ICON NAMES (no extensions needed)
const iconNames = [
  "AWS", "Ansible", "Azure", "Docker", "Git", "Github", "Google Cloud",
  "Grafana", "JFrog", "Jenkins", "Kubernetes", "Maven", "Packer",
  "Prometheus", "Python", "SAP ABAP", "Snyk", "SonarQube"
];

// Build full GitHub raw URLs
const icons = iconNames.map(name =>
  `https://raw.githubusercontent.com/hayatcode/Portfolio/main/Organize%20Icons%20(SVGs)/${encodeURIComponent(name)}.svg`
);

// Set renderer size
renderer.setSize(375, 375);
document.querySelector(".skill-tag-cloud").appendChild(renderer.domElement);
renderer.setClearColor(0x000000, 0);

const radius = 27;
const scale = 6;
const sprites = [];

icons.forEach((url, i) => {
  loader.load(url, (texture) => {
    const phi = Math.acos(-1 + (2 * i) / icons.length);
    const theta = Math.sqrt(icons.length * Math.PI) * phi;

    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
    sprite.scale.set(scale, scale, 1);
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

let mouseX = 0;
let mouseY = 0;

renderer.domElement.addEventListener('mousemove', e => {
  const rect = renderer.domElement.getBoundingClientRect();
  mouseX = 2 * (e.clientX - rect.left) / 375 - 1;
  mouseY = 2 * -(e.clientY - rect.top) / 375 + 1;
});

// Animate rotation
function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.005 + mouseX * 0.02;
  group.rotation.x += mouseY * 0.02;
  group.children.forEach(sprite => sprite.lookAt(camera.position));
  renderer.render(scene, camera);
}

animate();
