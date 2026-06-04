import * as THREE from
"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x87ceeb);

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
2000
);

const renderer =
new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.shadowMap.enabled = true;

document.body.appendChild(
renderer.domElement
);

/* LIGHTING */

const sun =
new THREE.DirectionalLight(
0xffffff,
3
);

sun.position.set(100,100,50);
scene.add(sun);

scene.add(
new THREE.AmbientLight(
0xffffff,
1.2
)
);

/* GROUND */

const ground =
new THREE.Mesh(
new THREE.PlaneGeometry(
2000,
2000
),
new THREE.MeshStandardMaterial({
color:0x2e8b57
})
);

ground.rotation.x = -Math.PI/2;
scene.add(ground);

/* PLAYER */

const player =
new THREE.Mesh(
new THREE.CapsuleGeometry(
0.5,
1.5,
4,
8
),
new THREE.MeshStandardMaterial({
color:0x00ff00
})
);

player.position.y = 1;
scene.add(player);

/* CITY */

for(let i=0;i<300;i++){

const h =
Math.random()*40+10;

const building =
new THREE.Mesh(
new THREE.BoxGeometry(
10,
h,
10
),
new THREE.MeshStandardMaterial({
color:0x888888
})
);

building.position.set(
Math.random()*1000-500,
h/2,
Math.random()*1000-500
);

scene.add(building);

}

/* NPCS */

const npcs=[];

for(let i=0;i<50;i++){

const npc =
new THREE.Mesh(
new THREE.CapsuleGeometry(
0.4,
1.3
),
new THREE.MeshStandardMaterial({
color:0xff0000
})
);

npc.position.set(
Math.random()*200-100,
1,
Math.random()*200-100
);

scene.add(npc);

npcs.push(npc);

}

/* CONTROLS */

const keys={};

window.addEventListener(
"keydown",
e=>keys[e.key.toLowerCase()]=true
);

window.addEventListener(
"keyup",
e=>keys[e.key.toLowerCase()]=false
);

/* BULLETS */

const bullets=[];

window.addEventListener(
"mousedown",
()=>{

const bullet =
new THREE.Mesh(
new THREE.SphereGeometry(
0.15
),
new THREE.MeshBasicMaterial({
color:0xffff00
})
);

bullet.position.copy(
player.position
);

bullet.userData.velocity =
new THREE.Vector3(
0,
0,
-1
);

scene.add(bullet);

bullets.push(bullet);

}
);

camera.position.set(
0,
5,
10
);

function animate(){

requestAnimationFrame(
animate
);

/* PLAYER */

const speed = 0.25;

if(keys["w"])
player.position.z -= speed;

if(keys["s"])
player.position.z += speed;

if(keys["a"])
player.position.x -= speed;

if(keys["d"])
player.position.x += speed;

/* CAMERA */

camera.position.lerp(

new THREE.Vector3(
player.position.x,
player.position.y+5,
player.position.z+10
),

0.1

);

camera.lookAt(
player.position
);

/* BULLETS */

bullets.forEach(

bullet=>{

bullet.position.add(
bullet.userData.velocity
);

}

);

/* NPC MOVEMENT */

npcs.forEach(

npc=>{

npc.position.x +=
Math.sin(
Date.now()*0.001 +
npc.id
)*0.01;

npc.position.z +=
Math.cos(
Date.now()*0.001 +
npc.id
)*0.01;

}

);

renderer.render(
scene,
camera
);

}

animate();
