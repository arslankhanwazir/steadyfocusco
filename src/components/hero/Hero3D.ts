// Premium persistent 3D hero: "thought cloud" + labeled task objects.
// Scattered -> organized (DO NOW / DEADLINE / LATER) -> hold -> return.
// All objects stay mounted and visible. Labels are crisp canvas textures.
// Respects prefers-reduced-motion, pauses off-screen, disposes cleanly.

import * as THREE from "three";

export interface Hero3DOptions {
  container: HTMLElement;
}

interface TaskDef {
  label: string;
  zone: "now" | "deadline" | "later";
}

const TASKS: TaskDef[] = [
  { label: "Reply to email", zone: "now" },
  { label: "Doctor appt", zone: "now" },
  { label: "Study for exam", zone: "deadline" },
  { label: "Finish assignment", zone: "deadline" },
  { label: "Buy groceries", zone: "later" },
  { label: "Laundry", zone: "later" },
  { label: "Project", zone: "later" },
  { label: "Meeting", zone: "deadline" },
];

const ZONE_COLORS: Record<string, number> = {
  now: 0x4a6b5a, // sage green
  deadline: 0xd98e3f, // warm amber
  later: 0x7f77dd, // soft violet
};

const ZONE_LABELS: Record<string, string> = {
  now: "DO NOW",
  deadline: "DEADLINE",
  later: "LATER",
};

// ---- Canvas texture helper: crisp readable label ----
function makeLabelTexture(
  text: string,
  color: string,
  bg: string,
  w = 512,
  h = 128,
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  // rounded pill background
  const r = h / 2;
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.arcTo(w, 0, w, h, r);
  ctx.arcTo(w, h, 0, h, r);
  ctx.arcTo(0, h, 0, 0, r);
  ctx.arcTo(0, 0, w, 0, r);
  ctx.closePath();
  ctx.fill();
  // text
  ctx.fillStyle = color;
  ctx.font = `700 ${Math.floor(h * 0.42)}px Inter, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, w / 2, h / 2 + 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 4;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function initHero3D({ container }: Hero3DOptions) {
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
    return null; // WebGL unavailable -> graceful fallback
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xf6f1e8, 0.012);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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

  // ---- Central "thought cloud" ----
  const cloudGroup = new THREE.Group();
  const blobGeo = new THREE.IcosahedronGeometry(1.5, 3);
  const blobMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.05,
    roughness: 0.15,
    transmission: 0.6,
    transparent: true,
    opacity: 0.85,
    clearcoat: 1,
  });
  const blob = new THREE.Mesh(blobGeo, blobMat);
  blob.scale.set(1, 1.05, 0.9);
  cloudGroup.add(blob);

  const glowGeo = new THREE.SphereGeometry(1.05, 24, 24);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x6b8f7b,
    transparent: true,
    opacity: 0.12,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  cloudGroup.add(glow);
  scene.add(cloudGroup);

  // ---- Task objects with readable labels ----
  const taskMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.2,
    transmission: 0.4,
    transparent: true,
    opacity: 0.92,
    clearcoat: 0.8,
  });

  const tasks: {
    group: THREE.Group;
    spin: THREE.Group;
    scatter: THREE.Vector3;
    target: THREE.Vector3;
    speed: number;
  }[] = [];

  const zonePositions: Record<string, THREE.Vector3> = {
    now: new THREE.Vector3(-2.7, 0.5, 1),
    deadline: new THREE.Vector3(0, -0.3, 0.5),
    later: new THREE.Vector3(2.7, 0.5, 1),
  };

  TASKS.forEach((def, i) => {
    const group = new THREE.Group();

    // spin: holds only the body, so its continuous rotation never
    // carries the label out of view (labels stay direct children of
    // `group`, which only translates/floats — it never spins)
    const spin = new THREE.Group();
    group.add(spin);

    // rounded capsule body
    const bodyGeo = new THREE.CapsuleGeometry(0.34, 0.5, 4, 12);
    const body = new THREE.Mesh(bodyGeo, taskMat);
    body.castShadow = true;
    body.receiveShadow = true;
    spin.add(body);

    // label plane (crisp text, always readable) — not part of `spin`
    const labelTex = makeLabelTexture(def.label, "#1C1D1F", "#ffffff");
    const labelMat = new THREE.MeshBasicMaterial({
      map: labelTex,
      transparent: true,
      depthWrite: false,
    });
    const label = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.4), labelMat);
    label.position.z = 0.36;
    group.add(label);

    // scatter position
    const angle = (i / TASKS.length) * Math.PI * 2;
    const radius = 3 + (i % 3) * 0.5;
    const scatter = new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle * 1.7) * 1.4,
      Math.sin(angle) * 0.8,
    );

    const target = zonePositions[def.zone].clone();
    const zoneSiblings = TASKS.filter((t) => t.zone === def.zone);
    const zoneIndex = zoneSiblings.indexOf(def);
    const zoneCount = zoneSiblings.length;
    // Spread siblings in the same zone around a small ring instead of
    // stacking them in a straight vertical column at identical x/z.
    // A pure y-offset put every task in a zone on the same x/z axis,
    // so bodies and labels lined up in front of/behind each other and
    // clipped/overlapped on screen. A ring gives each task its own
    // x, y, and z offset so neighbors don't sit on the same sightline.
    const ringAngle = (zoneIndex / zoneCount) * Math.PI * 2;
    const ringRadiusXY = 0.85;
    target.x += Math.cos(ringAngle) * ringRadiusXY;
    target.y += Math.sin(ringAngle) * ringRadiusXY * 0.55;
    target.z += Math.sin(ringAngle * 1.3) * 0.5;

    group.position.copy(scatter);
    scene.add(group);

    tasks.push({ group, spin, scatter, target, speed: 0.6 + (i % 4) * 0.15 });
  });

  // ---- Zone platforms with labels ----
  const zones: { group: THREE.Group; spin: THREE.Group }[] = [];
  Object.entries(zonePositions).forEach(([key, pos]) => {
    const group = new THREE.Group();

    // spin: holds only the platform disc — zoneLabel stays a direct,
    // non-rotating child of `group` for the same reason as task labels
    const spin = new THREE.Group();
    group.add(spin);

    // frosted platform
    const platformGeo = new THREE.CylinderGeometry(1.15, 1.35, 0.08, 24);
    const platformMat = new THREE.MeshPhysicalMaterial({
      color: ZONE_COLORS[key],
      metalness: 0.1,
      roughness: 0.3,
      transparent: true,
      opacity: 0.35,
      clearcoat: 0.6,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.95;
    platform.castShadow = true;
    spin.add(platform);

    // zone label
    const zoneTex = makeLabelTexture(
      ZONE_LABELS[key],
      "#ffffff",
      `#${ZONE_COLORS[key].toString(16).padStart(6, "0")}`,
    );
    const zoneLabelMat = new THREE.MeshBasicMaterial({
      map: zoneTex,
      transparent: true,
      depthWrite: false,
    });
    const zoneLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(1.6, 0.4),
      zoneLabelMat,
    );
    zoneLabel.position.y = -0.55;
    group.add(zoneLabel);

    group.position.copy(pos);
    group.scale.setScalar(0.001); // hidden until organized
    scene.add(group);
    zones.push({ group, spin });
  });

  // ---- State machine ----
  let state: "scatter" | "organize" | "hold" | "return" = "scatter";
  let stateTime = 0;
  let targetT = 0;
  let currentT = 0;
  const HOLD_MS = 4000;
  const SCATTER_MS = 6000;

  function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // ---- Pointer parallax ----
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

    currentT += (targetT - currentT) * 0.02;

    // central cloud: breathe + rotate
    const breathe = 1 + Math.sin(now * 0.0008) * 0.03;
    cloudGroup.scale.set(breathe, breathe * 1.05, breathe * 0.9);
    cloudGroup.rotation.y += dt * 0.1;
    cloudGroup.rotation.x = Math.sin(now * 0.0004) * 0.05;

    // tasks: interpolate scatter <-> target, always visible
    tasks.forEach((task) => {
      const t = easeInOut(Math.max(0, Math.min(1, currentT)));
      const pos = new THREE.Vector3().lerpVectors(task.scatter, task.target, t);
      pos.y += Math.sin(now * 0.001 * task.speed + task.scatter.x) * 0.08;
      task.group.position.lerp(pos, 0.05);
      task.spin.rotation.x += dt * task.speed * 0.1;
      task.spin.rotation.y += dt * task.speed * 0.15;
    });

    // zones scale in/out with organization
    zones.forEach((z, i) => {
      const s = easeInOut(Math.max(0, Math.min(1, currentT)));
      z.group.scale.setScalar(0.001 + s * 1);
      z.spin.rotation.y += dt * 0.05 * (i + 1);
    });

    // camera parallax
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
    // static organized composition, everything visible
    tasks.forEach((task) => task.group.position.copy(task.target));
    zones.forEach((z) => z.group.scale.setScalar(1));
    cloudGroup.scale.set(1, 1.05, 0.9);
    renderer.render(scene, camera);
  } else {
    animId = requestAnimationFrame(animate);
  }

  // ---- Pause when off-screen ----
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
        mats.forEach((m) => {
          if (m instanceof THREE.MeshBasicMaterial && m.map) m.map.dispose();
          m.dispose();
        });
      }
    });
    renderer?.dispose();
    if (renderer?.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}
