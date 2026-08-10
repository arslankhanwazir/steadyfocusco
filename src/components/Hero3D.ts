// Three.js hero scene: a persistent "thought cloud" with floating task objects.
// Scattered state -> organized zones (DO NOW / DEADLINE / LATER) -> hold -> return.
// Fully self-contained, GPU-accelerated, respects prefers-reduced-motion.

import * as THREE from "three";

export interface Hero3DOptions {
  container: HTMLElement;
}

export function initHero3D({ container }: Hero3DOptions) {
  // ---- Detect reduced motion / WebGL support ----
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let renderer: THREE.WebGLRenderer | null = null;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null; // WebGL unavailable -> graceful fallback (CSS stays visible)
  }

  // ---- Scene ----
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xf6f1e8, 0.012);

  // ---- Camera ----
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  // ---- Renderer setup ----
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); // capped DPR
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // ---- Lighting ----
  const ambient = new THREE.AmbientLight(0xf6f1e8, 0.9);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(4, 6, 6);
  key.castShadow = true;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x6b8f7b, 0.7);
  rim.position.set(-5, -2, -4);
  scene.add(rim);

  const fill = new THREE.PointLight(0xffffff, 0.4, 20);
  fill.position.set(0, 2, 3);
  scene.add(fill);

  // ---- Materials ----
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.15,
    transmission: 0.6,
    transparent: true,
    opacity: 0.85,
    clearcoat: 1,
  });

  const taskMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.4,
    transparent: true,
    opacity: 0.9,
    clearcoat: 0.8,
  });

  const accentMat = new THREE.MeshPhysicalMaterial({
    color: 0xd98e3f,
    metalness: 0.1,
    roughness: 0.3,
    transparent: true,
    opacity: 0.85,
    clearcoat: 0.6,
  });

  const sageMat = new THREE.MeshPhysicalMaterial({
    color: 0x6b8f7b,
    metalness: 0.1,
    roughness: 0.3,
    transparent: true,
    opacity: 0.7,
    clearcoat: 0.6,
  });

  // ---- Central "thought cloud" (organic sculptural form) ----
  const cloudGroup = new THREE.Group();
  const blobGeo = new THREE.IcosahedronGeometry(1.6, 3);
  const blob = new THREE.Mesh(blobGeo, glassMat);
  blob.scale.set(1, 1.05, 0.9);
  cloudGroup.add(blob);

  // inner glow
  const glowGeo = new THREE.SphereGeometry(1.1, 24, 24);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x6b8f7b,
    transparent: true,
    opacity: 0.12,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  cloudGroup.add(glow);

  scene.add(cloudGroup);

  // ---- Task objects (small physical floating objects) ----
  // Each task: { mesh, targetZone, basePosition, scatterOffset, speed }
  const taskDefs = [
    { label: "Reply to email", zone: "now", color: 0xffffff },
    { label: "Doctor appointment", zone: "now", color: 0xffffff },
    { label: "Study for exam", zone: "deadline", color: 0xffffff },
    { label: "Finish assignment", zone: "deadline", color: 0xffffff },
    { label: "Buy groceries", zone: "later", color: 0xffffff },
    { label: "Laundry", zone: "later", color: 0xffffff },
    { label: "Project", zone: "later", color: 0xffffff },
    { label: "Meeting", zone: "deadline", color: 0xffffff },
  ];

  const tasks: {
    mesh: THREE.Mesh;
    scatter: THREE.Vector3;
    target: THREE.Vector3;
    home: THREE.Vector3;
    speed: number;
  }[] = [];

  const zonePositions: Record<string, THREE.Vector3> = {
    now: new THREE.Vector3(-2.6, 0.4, 1),
    deadline: new THREE.Vector3(0, -0.4, 0.5),
    later: new THREE.Vector3(2.6, 0.4, 1),
  };

  taskDefs.forEach((def, i) => {
    const geo = new THREE.BoxGeometry(0.5, 0.34, 0.12);
    geo.translate(0, 0, 0.06); // bevel-ish
    const mesh = new THREE.Mesh(
      geo,
      def.color === 0xffffff ? taskMat : accentMat,
    );
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    // Scatter position - spread around the cloud
    const angle = (i / taskDefs.length) * Math.PI * 2;
    const radius = 3 + (i % 3) * 0.5;
    const scatter = new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle * 1.7) * 1.4,
      Math.sin(angle) * 0.8,
    );

    const target = zonePositions[def.zone].clone();
    // offset tasks within their zone
    const zoneIndex = taskDefs.filter((t) => t.zone === def.zone).indexOf(def);
    target.y += zoneIndex * 0.55;

    mesh.position.copy(scatter);
    const home = scatter.clone();
    scene.add(mesh);

    tasks.push({ mesh, scatter, target, home, speed: 0.6 + (i % 4) * 0.15 });
  });

  // ---- Zone labels (glass platforms) ----
  const zones: { label: string; group: THREE.Group; pos: THREE.Vector3 }[] = [];
  Object.entries(zonePositions).forEach(([key, pos]) => {
    const group = new THREE.Group();
    const platformGeo = new THREE.CylinderGeometry(1.1, 1.3, 0.08, 24);
    const platform = new THREE.Mesh(platformGeo, sageMat);
    platform.position.y = -0.9;
    platform.castShadow = true;
    group.add(platform);
    group.position.copy(pos);
    scene.add(group);
    zones.push({ label: key, group, pos });
  });

  // Animate zones to be hidden initially (they fade in when organized)
  zones.forEach((z) => z.group.scale.setScalar(0.001));

  // ---- State machine ----
  let state: "scatter" | "organize" | "hold" | "return" = "scatter";
  let stateTime = 0;
  let targetT = 0; // 0 = scattered, 1 = organized
  let currentT = 0;
  const HOLD_MS = 4000;
  const SCATTER_MS = 6000;

  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // ---- Mouse parallax ----
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let pointerActive = false;

  container.addEventListener("pointermove", (e) => {
    const rect = container.getBoundingClientRect();
    targetMouseX = (e.clientX - rect.left) / rect.width - 0.5;
    targetMouseY = (e.clientY - rect.top) / rect.height - 0.5;
    pointerActive = true;
  });

  container.addEventListener("pointerleave", () => {
    pointerActive = false;
    targetMouseX = 0;
    targetMouseY = 0;
  });

  // ---- Resize ----
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer!.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", onResize);

  // ---- Animation loop ----
  let animId = 0;
  let last = performance.now();

  function animate(now: number) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    stateTime += dt * 1000;

    // State transitions
    if (state === "scatter" && stateTime > SCATTER_MS) {
      state = "organize";
      stateTime = 0;
    } else if (state === "organize") {
      targetT = Math.min(1, stateTime / 2500);
      if (stateTime >= 2500) {
        state = "hold";
        stateTime = 0;
      }
    } else if (state === "hold" && stateTime > HOLD_MS) {
      state = "return";
      stateTime = 0;
    } else if (state === "return") {
      targetT = Math.max(0, 1 - stateTime / 2500);
      if (stateTime >= 2500) {
        state = "scatter";
        stateTime = 0;
      }
    }

    // Smooth currentT
    currentT += (targetT - currentT) * 0.02;

    // Central cloud: slow breathe + rotate
    const breathe = 1 + Math.sin(now * 0.0008) * 0.03;
    cloudGroup.scale.set(breathe, breathe * 1.05, breathe * 0.9);
    cloudGroup.rotation.y += dt * 0.1;
    cloudGroup.rotation.x = Math.sin(now * 0.0004) * 0.05;

    // Task movement: interpolate between scatter and target
    tasks.forEach((task) => {
      const t = easeInOut(Math.max(0, Math.min(1, currentT)));
      const pos = new THREE.Vector3().lerpVectors(task.scatter, task.target, t);
      // gentle idle float
      pos.y += Math.sin(now * 0.001 * task.speed + task.scatter.x) * 0.08;
      task.mesh.position.lerp(pos, 0.05);
      task.mesh.rotation.x += dt * task.speed * 0.1;
      task.mesh.rotation.y += dt * task.speed * 0.15;
    });

    // Zones fade in/scale with organization
    zones.forEach((z, i) => {
      const s = easeInOut(Math.max(0, Math.min(1, currentT)));
      const scale = 0.001 + s * 1;
      z.group.scale.setScalar(scale);
      z.group.rotation.y += dt * 0.05 * (i + 1);
    });

    // Camera parallax
    mouseX += (targetMouseX - mouseX) * 0.03;
    mouseY += (targetMouseY - mouseY) * 0.03;
    if (!pointerActive) {
      mouseX += (0 - mouseX) * 0.01;
      mouseY += (0 - mouseY) * 0.01;
    }
    camera.position.x = mouseX * 1.2;
    camera.position.y = -mouseY * 1.2;
    camera.lookAt(0, 0, 0);

    renderer!.render(scene, camera);
    animId = requestAnimationFrame(animate);
  }

  if (prefersReduced) {
    // Static organized composition (no movement)
    tasks.forEach((task) => task.mesh.position.copy(task.target));
    zones.forEach((z) => z.group.scale.setScalar(1));
    cloudGroup.scale.set(1, 1.05, 0.9);
    renderer.render(scene, camera);
  } else {
    animId = requestAnimationFrame(animate);
  }

  // ---- Pause when off-screen (IntersectionObserver) ----
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!prefersReduced) animId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animId);
        }
      });
    },
    { threshold: 0.05 },
  );
  observer.observe(container);

  // ---- Cleanup ----
  return function dispose() {
    cancelAnimationFrame(animId);
    observer.disconnect();
    window.removeEventListener("resize", onResize);
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mats = Array.isArray(obj.material)
          ? obj.material
          : [obj.material];
        mats.forEach((m) => m.dispose());
      }
    });
    renderer?.dispose();
    if (renderer?.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}
