"use client";

import { useEffect, useRef } from "react";
import {
  NECK_PIVOT,
  samplePoses,
  type PosePoint,
  type SampledPose,
  type Vec3,
} from "@/components/particlePoses";

/** 점 하나의 화면 상태. ox·oy는 마우스에 밀려난 화면 좌표 오프셋, sx·sy는 마지막으로 그린 화면 좌표, scatter는 포즈가 바뀔 때 흩어지는 방향입니다. */
type Particle = {
  sx: number;
  sy: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  seed: number;
  scatter: Vec3;
};

const HOLD_MS = 7000;
const MORPH_MS = 3400;
const SCATTER = 0.1;
// 이름 쪽(왼쪽)을 비스듬히 바라보는 3/4 각도를 기본으로, 그 주변에서 아주 천천히 몸을 돌립니다.
const BASE_YAW = -0.3;
const SWAY = 0.15;
const SWAY_SPEED = 0.00035;
// 고개는 몸보다 크게 움직여 커서를 바라보고, 커서가 없으면 두리번거립니다.
const HEAD_YAW_LIMIT = 0.6;
const HEAD_PITCH_LIMIT = 0.3;
const HEAD_FOLLOW = 0.04;
const BREATH = 0.01;
const BREATH_SPEED = 0.0016;
const BUST_HEIGHT = 1.46;
const WAVE_ANGLE = 0.35;
const WAVE_SPEED = 0.005;
const REPEL_RADIUS = 120;
const REPEL_FORCE = 1.6;
const SPRING = 0.02;
const DAMPING = 0.88;
const BURST_FORCE = 16;
const COLOR_STEPS = 32;
const GLOW_COLOR = "rgb(236 254 255)";
const BLINK_EVERY_MS = 3800;
const BLINK_MS = 140;

function hexToRgb(hex: string): Vec3 {
  const value = hex.trim().replace("#", "");
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)) as Vec3;
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/** 한 프레임 동안 모든 점에 함께 적용하는 움직임 값 */
type FrameMotion = {
  time: number;
  still: boolean;
  headCosY: number;
  headSinY: number;
  headCosX: number;
  headSinX: number;
  breath: number;
};

/** 손 흔들기·타이핑·고개 돌리기 같은 부위별 움직임과 숨쉬기를 적용한 좌표 */
function animate(point: PosePoint, pose: SampledPose, m: FrameMotion): Vec3 {
  let [x, y, z] = point.pos;
  if (!m.still) {
    if (point.motion === "wave" && pose.pivot) {
      // 팔꿈치를 축으로 화면 평면에서 회전시킵니다.
      const angle = WAVE_ANGLE * Math.sin(m.time * WAVE_SPEED);
      const [px, py] = pose.pivot;
      const dx = x - px;
      const dy = y - py;
      x = px + dx * Math.cos(angle) - dy * Math.sin(angle);
      y = py + dx * Math.sin(angle) + dy * Math.cos(angle);
    } else if (point.motion === "type") {
      // 왼손·오른손이 엇갈려 톡톡 칩니다.
      y += 0.015 * Math.sin(m.time * 0.03 + (x > 0 ? 0 : 2));
    } else if (point.motion === "head") {
      // 목을 축으로 좌우(y축) → 위아래(x축) 순서로 돌립니다.
      const [px, py, pz] = NECK_PIVOT;
      const dx = x - px;
      const dy = y - py;
      const dz = z - pz;
      const x1 = dx * m.headCosY - dz * m.headSinY;
      const z1 = dx * m.headSinY + dz * m.headCosY;
      x = px + x1;
      y = py + dy * m.headCosX - z1 * m.headSinX;
      z = pz + dy * m.headSinX + z1 * m.headCosX;
    }
  }
  // 숨 쉬듯 몸 전체가 살짝 오르내리고, 머리를 뺀 몸통은 조금 부풉니다.
  if (point.motion !== "head") {
    x *= 1 + m.breath;
    z *= 1 + m.breath;
  }
  return [x, y - m.breath * 0.6, z];
}

/**
 * Hero 배경의 3D 파티클 휴머노이드 로봇(상반신).
 * 인사 → 팔짱 → 노트북 → 코딩 → 생각 포즈를 천천히 오가며(시작 포즈는 새로고침마다 무작위), 눈은 가끔 깜빡이고 가슴 코어는 은은하게 빛납니다.
 * 숨 쉬듯 오르내리고, 고개를 돌려 커서를 바라보며(커서가 없으면 두리번거림), 커서 근처 점은 밀려났다가 돌아옵니다. 클릭하면 터졌다가 다시 모입니다.
 * 모션 줄이기 설정에서는 무작위 포즈 하나를 정지된 장면으로 그립니다.
 */
export default function ParticleField({
  className = "",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const styles = getComputedStyle(document.documentElement);
    const colorA = hexToRgb(styles.getPropertyValue("--accent"));
    const colorB = hexToRgb(styles.getPropertyValue("--accent-2"));
    // 머리(보라)에서 허리(시안)로 내려가는 색을 미리 계산해 둡니다.
    const palette = Array.from({ length: COLOR_STEPS }, (_, i) => {
      const t = i / (COLOR_STEPS - 1);
      const [r, g, b] = colorA.map((c, k) =>
        Math.round(c + (colorB[k] - c) * t),
      );
      return `rgb(${r} ${g} ${b})`;
    });

    let width = 0;
    let height = 0;
    let poses: SampledPose[] = [];
    let particles: Particle[] = [];
    let glow: CanvasGradient | null = null;
    // 형상 중심·크기·전체 투명도는 화면 너비에 따라 resize에서 정합니다.
    let cx = 0;
    let cy = 0;
    let scale = 0;
    let baseAlpha = 1;

    let firstPose = 0;
    let startTime: number | null = null;
    const pointer = { x: 0, y: 0, active: false };
    let tiltX = 0;
    let tiltY = 0;
    let headYaw = 0;
    let headPitch = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const wide = width >= 1024;
      // 넓은 화면에선 오른쪽 절반에 크게, 좁은 화면에선 위쪽 가운데에 흐리게 둡니다.
      // 흉상은 안테나 끝(y≈-1.08)부터 가슴 아래(y≈0.38)까지라, 이 높이를 헤더 아래 공간의 세로 가운데에 맞춥니다.
      const header =
        parseFloat(styles.getPropertyValue("--header-h")) * 16 || 56;
      scale = wide
        ? Math.min((height - header) * 0.62, width * 0.34)
        : Math.min((height - header) * 0.42, width * 0.62);
      cx = wide ? width * 0.71 : width * 0.5;
      cy = wide
        ? header + (height - header - BUST_HEIGHT * scale) / 2 + 1.08 * scale
        : header + 0.04 * height + 1.08 * scale;
      baseAlpha = wide ? 1 : 0.4;

      const count = width < 768 ? 1600 : 4200;
      if (particles.length !== count) {
        poses = samplePoses(count);
        firstPose = Math.floor(Math.random() * poses.length);
        particles = Array.from({ length: count }, () => {
          const u = Math.random() * 2 - 1;
          const phi = Math.random() * Math.PI * 2;
          const s = Math.sqrt(1 - u * u);
          return {
            sx: 0,
            sy: 0,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
            seed: Math.random() * Math.PI * 2,
            scatter: [s * Math.cos(phi), u, s * Math.sin(phi)],
          };
        });
      }

      const glowY = cy - 0.35 * scale;
      glow = ctx.createRadialGradient(cx, glowY, 0, cx, glowY, scale * 1.3);
      glow.addColorStop(0, `rgb(${colorA.join(" ")} / ${0.2 * baseAlpha})`);
      glow.addColorStop(0.5, `rgb(${colorB.join(" ")} / ${0.05 * baseAlpha})`);
      glow.addColorStop(1, "transparent");

      if (reduceMotion) draw(0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.shadowColor = `rgb(${colorB.join(" ")})`;
      if (glow) {
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      // 지금 어느 포즈에서 어느 포즈로 넘어가는 중인지 계산합니다.
      startTime ??= time;
      const elapsed = reduceMotion ? 0 : time - startTime;
      const cycle = HOLD_MS + MORPH_MS;
      const step = Math.floor(elapsed / cycle);
      const within = elapsed - step * cycle;
      const from = poses[(firstPose + step) % poses.length];
      const to = poses[(firstPose + step + 1) % poses.length];
      const morph =
        within < HOLD_MS ? 0 : easeInOut((within - HOLD_MS) / MORPH_MS);
      // 이동 중간에 살짝 흩어졌다가 다시 모입니다.
      const spread = Math.sin(Math.PI * morph) * SCATTER;

      // 몸은 마우스 쪽으로 조금만 기울고, 부드럽게 따라갑니다.
      const targetX = pointer.active ? (pointer.y / height - 0.5) * 0.15 : 0;
      const targetY = pointer.active ? (pointer.x / width - 0.5) * 0.35 : 0;
      tiltX += (targetX - tiltX) * 0.05;
      tiltY += (targetY - tiltY) * 0.05;

      const yaw =
        BASE_YAW +
        (reduceMotion ? 0 : SWAY * Math.sin(time * SWAY_SPEED)) +
        tiltY;

      // 고개는 몸 방향을 기준으로 커서 쪽을 향하도록 따로 돌립니다.
      const clamp = (v: number, limit: number) =>
        Math.min(Math.max(v, -limit), limit);
      const faceY = cy - 0.7 * scale;
      const lookYaw = pointer.active
        ? clamp((pointer.x - cx) / (scale * 2.2) - yaw, HEAD_YAW_LIMIT)
        : 0.22 * Math.sin(time * 0.0004);
      const lookPitch = pointer.active
        ? clamp((pointer.y - faceY) / (scale * 3), HEAD_PITCH_LIMIT)
        : 0.05 * Math.sin(time * 0.0005);
      if (reduceMotion) {
        headYaw = 0;
        headPitch = 0;
      } else {
        headYaw += (lookYaw - headYaw) * HEAD_FOLLOW;
        headPitch += (lookPitch - headPitch) * HEAD_FOLLOW;
      }
      const motion: FrameMotion = {
        time,
        still: reduceMotion,
        headCosY: Math.cos(headYaw),
        headSinY: Math.sin(headYaw),
        headCosX: Math.cos(headPitch),
        headSinX: Math.sin(headPitch),
        breath: reduceMotion ? 0 : BREATH * Math.sin(time * BREATH_SPEED),
      };
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const a = animate(from.points[i], from, motion);
        const b = morph > 0 ? animate(to.points[i], to, motion) : a;
        const x = a[0] + (b[0] - a[0]) * morph + p.scatter[0] * spread;
        const y = a[1] + (b[1] - a[1]) * morph + p.scatter[1] * spread;
        const z = a[2] + (b[2] - a[2]) * morph + p.scatter[2] * spread;
        // 점마다 살짝 떨리며 반짝이는 느낌을 줍니다.
        const jitter = 0.004 * Math.sin(time * 0.002 + p.seed);

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // z가 클수록(멀수록) 작고 흐리게 그립니다.
        const perspective = 3 / (3 + z2);
        const sx = cx + (x1 + jitter) * scale * perspective;
        const sy = cy + (y1 + jitter) * scale * perspective;

        if (pointer.active && !reduceMotion) {
          const dx = sx + p.ox - pointer.x;
          const dy = sy + p.oy - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < REPEL_RADIUS) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
        p.vx = (p.vx - p.ox * SPRING) * DAMPING;
        p.vy = (p.vy - p.oy * SPRING) * DAMPING;
        p.ox += p.vx;
        p.oy += p.vy;

        // 가슴 아래로 갈수록 서서히 사라져 흉상만 남깁니다.
        const fade = y > 0.1 ? Math.max(0, 1 - (y - 0.1) / 0.28) : 1;
        const near = Math.min(Math.max(0.5 - z2 * 1.2, 0), 1);
        const size = (0.6 + 1.3 * near) * perspective;
        p.sx = sx + p.ox;
        p.sy = sy + p.oy;

        // 눈·코어는 이동 중 절반을 넘기면 도착 포즈 기준으로 바꿔, 빛나는 점이 함께 옮겨 갑니다.
        const glow = (morph < 0.5 ? from : to).points[i].glow;
        if (glow) {
          const blink =
            !reduceMotion && time % BLINK_EVERY_MS < BLINK_MS ? 0.15 : 1;
          const pulse = reduceMotion ? 1 : 0.7 + 0.3 * Math.sin(time * 0.003);
          ctx.globalAlpha = (glow === "eye" ? blink : pulse) * fade * baseAlpha;
          ctx.fillStyle = GLOW_COLOR;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          continue;
        }

        const colorIndex = Math.round(
          Math.min(Math.max((y + 1) / 2, 0), 1) * (COLOR_STEPS - 1),
        );
        ctx.globalAlpha = (0.2 + 0.8 * near) * fade * baseAlpha;
        ctx.fillStyle = palette[colorIndex];
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || frame || !visible || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // 캔버스는 pointer-events: none이라 window에서 좌표를 받아 캔버스 기준으로 바꿉니다.
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) pointer.active = false;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (reduceMotion) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (y < 0 || y > rect.height) return;
      // 클릭 지점에서 가까운 점일수록 세게 튕겨 냅니다.
      for (const p of particles) {
        const dx = p.sx - x;
        const dy = p.sy - y;
        const dist = Math.hypot(dx, dy) || 1;
        const force = BURST_FORCE * Math.exp(-dist / 260);
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    };

    const onVisibilityChange = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // 화면 밖으로 스크롤되면 애니메이션을 멈춥니다.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
