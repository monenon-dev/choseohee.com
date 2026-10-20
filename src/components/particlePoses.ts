/**
 * Hero 파티클 휴머노이드 로봇의 흉상(가슴 아래까지) 포즈 데이터.
 * 좌표는 머리 위가 y=-1 근처이고 y는 아래가 +, z는 화면 안쪽이 +(보는 사람 쪽이 -)입니다.
 * 왼쪽/오른쪽은 화면 기준입니다.
 */

export type Vec3 = [number, number, number];

/**
 * wave: 팔꿈치(pivot)를 축으로 손 흔들기
 * type: 키보드 치듯 위아래로 톡톡
 * head: 목(NECK_PIVOT)을 축으로 고개 돌리기·끄덕이기
 */
export type Motion = "wave" | "type" | "head";

/** 밝게 빛나는 점. eye는 가끔 깜빡이고, core는 천천히 맥박 치듯 밝아졌다 어두워집니다. */
export type Glow = "eye" | "core";

/** 고개가 돌아가는 축(목 위쪽) */
export const NECK_PIVOT: Vec3 = [0, -0.46, 0];

/** density는 넓이 대비 점 밀도 배율입니다(기본 1). 팔처럼 또렷해야 하는 부위는 높이고, 넓은 면은 낮춥니다. */
type Common = { motion?: Motion; glow?: Glow; density?: number };

/**
 * ellipsoid의 band는 중심 기준 y 범위로 그 띠만 남기고, front는 앞쪽(보는 사람 쪽)만 남깁니다.
 * box의 edges는 모서리에 놓을 점 비율(기본 0.4)로, 각진 윤곽을 만듭니다.
 * ring의 axis는 고리 면에 수직인 축(0=x, 1=y, 2=z)입니다.
 */
type Shape = Common &
  (
    | { kind: "capsule"; a: Vec3; b: Vec3; r: number }
    | {
        kind: "ellipsoid";
        center: Vec3;
        radii: Vec3;
        band?: [number, number];
        front?: boolean;
      }
    | { kind: "box"; center: Vec3; size: Vec3; edges?: number }
    | { kind: "ring"; center: Vec3; radius: number; axis: 0 | 1 | 2 }
    | { kind: "code"; center: Vec3; width: number; height: number }
  );

type Pose = { name: string; shapes: Shape[]; pivot?: Vec3 };

export type PosePoint = { pos: Vec3; motion?: Motion; glow?: Glow };
export type SampledPose = { name: string; points: PosePoint[]; pivot?: Vec3 };

const SHOULDER_L: Vec3 = [-0.38, -0.27, 0];
const SHOULDER_R: Vec3 = [0.38, -0.27, 0];

/** 네모난 머리와 매끈한 몸에 바이저·눈·귀·안테나·목 마디·관절 고리·가슴 코어로 로봇 느낌을 냅니다. 고개를 숙이려면 headOffset을 넘깁니다. */
function robotBody(headOffset: Vec3 = [0, 0, 0]): Shape[] {
  const head = (x: number, y: number, z: number): Vec3 => [
    headOffset[0] + x,
    headOffset[1] - 0.7 + y,
    headOffset[2] + z,
  ];
  return [
    // 가슴: 형상에서 가장 넓어 반올림 차이를 채울 때도 씁니다.
    {
      kind: "ellipsoid",
      center: [0, -0.06, 0],
      radii: [0.32, 0.3, 0.19],
      density: 0.9,
    },
    // 네모난 머리와 바이저, 두 눈
    {
      kind: "box",
      center: head(0, 0, 0),
      size: [0.38, 0.38, 0.36],
      edges: 0.5,
      motion: "head",
    },
    {
      kind: "box",
      center: head(0, -0.005, -0.185),
      size: [0.3, 0.09, 0.01],
      edges: 0.6,
      motion: "head",
      density: 2.5,
    },
    {
      kind: "capsule",
      a: head(-0.075, -0.005, -0.195),
      b: head(-0.075, -0.005, -0.195),
      r: 0.022,
      motion: "head",
      glow: "eye",
      density: 6,
    },
    {
      kind: "capsule",
      a: head(0.075, -0.005, -0.195),
      b: head(0.075, -0.005, -0.195),
      r: 0.022,
      motion: "head",
      glow: "eye",
      density: 6,
    },
    // 귀 쪽 원판과 안테나
    {
      kind: "ring",
      center: head(-0.2, 0, 0),
      radius: 0.07,
      axis: 0,
      motion: "head",
    },
    {
      kind: "ring",
      center: head(0.2, 0, 0),
      radius: 0.07,
      axis: 0,
      motion: "head",
    },
    {
      kind: "capsule",
      a: head(0.08, -0.19, 0),
      b: head(0.1, -0.33, 0),
      r: 0.01,
      motion: "head",
      density: 3,
    },
    {
      kind: "capsule",
      a: head(0.1, -0.35, 0),
      b: head(0.1, -0.35, 0),
      r: 0.02,
      motion: "head",
      glow: "core",
      density: 6,
    },
    // 마디진 목
    {
      kind: "capsule",
      a: [0, -0.48, 0],
      b: [0, -0.36, 0],
      r: 0.045,
      density: 0.6,
    },
    { kind: "ring", center: [0, -0.46, 0], radius: 0.065, axis: 1 },
    { kind: "ring", center: [0, -0.41, 0], radius: 0.075, axis: 1 },
    { kind: "ring", center: [0, -0.36, 0], radius: 0.065, axis: 1 },
    // 목에서 어깨로 내려오는 선
    {
      kind: "capsule",
      a: [-0.1, -0.36, 0],
      b: [-0.33, -0.29, 0],
      r: 0.07,
      density: 0.9,
    },
    {
      kind: "capsule",
      a: [0.1, -0.36, 0],
      b: [0.33, -0.29, 0],
      r: 0.07,
      density: 0.9,
    },
    // 어깨 관절과 그 둘레의 고리
    { kind: "capsule", a: SHOULDER_L, b: SHOULDER_L, r: 0.1, density: 1.2 },
    { kind: "capsule", a: SHOULDER_R, b: SHOULDER_R, r: 0.1, density: 1.2 },
    { kind: "ring", center: SHOULDER_L, radius: 0.13, axis: 0, density: 1.5 },
    { kind: "ring", center: SHOULDER_R, radius: 0.13, axis: 0, density: 1.5 },
    // 가슴 코어(빛나는 고리)
    {
      kind: "ring",
      center: [0, -0.1, -0.19],
      radius: 0.065,
      axis: 2,
      glow: "core",
      density: 2,
    },
    {
      kind: "capsule",
      a: [0, -0.1, -0.195],
      b: [0, -0.1, -0.195],
      r: 0.022,
      glow: "core",
      density: 6,
    },
    // 허리(화면 아래에서 서서히 사라집니다)
    {
      kind: "ellipsoid",
      center: [0, 0.28, 0],
      radii: [0.25, 0.12, 0.16],
      density: 0.6,
    },
  ];
}

/** 어깨 → 팔꿈치 → 손목 순서로 팔을 만듭니다. 팔꿈치는 공 관절이고, 손은 아래팔 방향으로 조금 더 뻗습니다. motion은 팔꿈치 아래에만 붙습니다. */
function arm(
  shoulder: Vec3,
  elbow: Vec3,
  wrist: Vec3,
  motion?: Motion,
): Shape[] {
  const dir = wrist.map((v, i) => v - elbow[i]);
  const length = Math.hypot(...dir) || 1;
  const hand = wrist.map((v, i) => v + (dir[i] / length) * 0.09) as Vec3;
  return [
    { kind: "capsule", a: shoulder, b: elbow, r: 0.07, density: 1.6 },
    { kind: "capsule", a: elbow, b: elbow, r: 0.075, motion, density: 1.6 },
    { kind: "capsule", a: elbow, b: wrist, r: 0.065, motion, density: 1.8 },
    { kind: "capsule", a: wrist, b: hand, r: 0.055, motion, density: 2 },
  ];
}

const POSES: Pose[] = [
  {
    name: "wave",
    pivot: [0.68, -0.12, 0],
    shapes: [
      ...robotBody(),
      ...arm(SHOULDER_L, [-0.46, 0.15, 0.03], [-0.48, 0.55, 0]),
      ...arm(SHOULDER_R, [0.68, -0.12, 0.02], [0.74, -0.56, -0.04], "wave"),
    ],
  },
  {
    name: "crossed-arms",
    shapes: [
      ...robotBody(),
      ...arm(SHOULDER_R, [0.42, 0.18, -0.16], [-0.26, 0.04, -0.32]),
      ...arm(SHOULDER_L, [-0.42, 0.18, -0.16], [0.26, 0.12, -0.36]),
    ],
  },
  {
    // 화면이 보는 사람 쪽을 향하도록 노트북을 펼쳐 들고 있는 모습
    name: "laptop",
    shapes: [
      ...robotBody(),
      ...arm(SHOULDER_L, [-0.44, 0.16, -0.1], [-0.36, 0.12, -0.5]),
      ...arm(SHOULDER_R, [0.44, 0.16, -0.1], [0.36, 0.12, -0.5]),
      {
        kind: "box",
        center: [0, 0.14, -0.53],
        size: [0.78, 0.03, 0.4],
        edges: 0.5,
        density: 0.8,
      },
      {
        kind: "box",
        center: [0, -0.11, -0.33],
        size: [0.78, 0.48, 0.03],
        edges: 0.6,
        density: 0.4,
      },
      { kind: "code", center: [0, -0.11, -0.35], width: 0.66, height: 0.38 },
    ],
  },
  {
    // 고개를 살짝 숙이고 노트북으로 코딩하는 모습
    name: "coding",
    shapes: [
      ...robotBody([0, 0.04, -0.07]),
      ...arm(SHOULDER_L, [-0.44, 0.16, -0.08], [-0.17, 0.27, -0.5], "type"),
      ...arm(SHOULDER_R, [0.44, 0.16, -0.08], [0.17, 0.27, -0.5], "type"),
      {
        kind: "box",
        center: [0, 0.3, -0.5],
        size: [0.7, 0.03, 0.36],
        edges: 0.5,
      },
      {
        kind: "box",
        center: [0, 0.07, -0.69],
        size: [0.7, 0.44, 0.03],
        edges: 0.6,
        density: 0.4,
      },
      { kind: "code", center: [0, 0.07, -0.71], width: 0.6, height: 0.36 },
    ],
  },
  {
    // 한 손으로 턱을 괴고 생각하는 모습
    name: "thinking",
    shapes: [
      ...robotBody([0.02, 0.02, -0.03]),
      ...arm(SHOULDER_R, [0.4, 0.16, -0.12], [0.08, -0.4, -0.24]),
      ...arm(SHOULDER_L, [-0.42, 0.14, -0.14], [0.3, 0.16, -0.32]),
    ],
  },
];

// 노트북 화면의 코드 줄: [들여쓰기, 길이] (화면 너비 대비 비율)
const CODE_LINES: [number, number][] = [
  [0, 0.55],
  [0.08, 0.7],
  [0.16, 0.45],
  [0.16, 0.6],
  [0.08, 0.3],
  [0, 0.2],
  [0, 0.65],
  [0.08, 0.5],
];
const CODE_TOTAL = CODE_LINES.reduce((sum, [, length]) => sum + length, 0);

function randomDirection(): Vec3 {
  const u = Math.random() * 2 - 1;
  const phi = Math.random() * Math.PI * 2;
  const s = Math.sqrt(1 - u * u);
  return [s * Math.cos(phi), u, s * Math.sin(phi)];
}

function shapeArea(shape: Shape): number {
  const density = shape.density ?? 1;
  switch (shape.kind) {
    case "capsule": {
      const length = Math.hypot(...shape.b.map((v, i) => v - shape.a[i]));
      const { r } = shape;
      return (2 * Math.PI * r * length + 4 * Math.PI * r * r) * density;
    }
    case "ellipsoid": {
      // 타원체 겉넓이 근사식(Knud Thomsen)
      const [a, b, c] = shape.radii;
      const p = 1.6;
      const area =
        4 *
        Math.PI *
        (((a * b) ** p + (a * c) ** p + (b * c) ** p) / 3) ** (1 / p);
      // 띠는 높이 비율만큼(구에서는 높이에 비례), 앞쪽만이면 대략 3분의 1만 차지합니다.
      const band = shape.band ? (shape.band[1] - shape.band[0]) / (2 * b) : 1;
      return area * band * (shape.front ? 0.33 : 1) * density;
    }
    case "box": {
      const [w, h, d] = shape.size;
      return 2 * (w * h + h * d + w * d) * density;
    }
    case "ring":
      // 선에 가까운 모양이라 둘레에 비례해 점을 줍니다.
      return 2 * Math.PI * shape.radius * 0.15 * density;
    case "code":
      // 코드 줄이 또렷하게 보이도록 넓이보다 점을 많이 줍니다.
      return shape.width * shape.height * 6;
  }
}

/** 캡슐 표면 위의 무작위 점. 막대 옆면 또는 양 끝 반구에서 넓이에 비례해 고릅니다. */
function sampleCapsule(a: Vec3, b: Vec3, r: number): Vec3 {
  const axis = b.map((v, i) => v - a[i]) as Vec3;
  const length = Math.hypot(...axis);
  const dir = randomDirection();
  const sideArea = 2 * Math.PI * r * length;
  const capArea = 4 * Math.PI * r * r;

  if (length === 0 || Math.random() < capArea / (sideArea + capArea)) {
    // 끝 반구: 방향이 축 쪽을 향하면 b 끝, 아니면 a 끝에 붙입니다.
    const dot = dir.reduce((sum, v, i) => sum + v * axis[i], 0);
    const end = dot > 0 ? b : a;
    return end.map((v, i) => v + dir[i] * r) as Vec3;
  }

  // 옆면: 방향에서 축 성분을 빼서 축에 수직인 방향만 남깁니다.
  const n = axis.map((v) => v / length);
  const along = dir.reduce((sum, v, i) => sum + v * n[i], 0);
  const perp = dir.map((v, i) => v - along * n[i]);
  const perpLength = Math.hypot(...perp) || 1;
  const t = Math.random();
  return a.map((v, i) => v + axis[i] * t + (perp[i] / perpLength) * r) as Vec3;
}

/** 타원체 표면 위의 점. band·front 조건에 맞을 때까지 다시 뽑습니다. */
function sampleEllipsoid(
  center: Vec3,
  radii: Vec3,
  band?: [number, number],
  front?: boolean,
): Vec3 {
  for (;;) {
    const point = randomDirection().map((v, i) => v * radii[i]);
    if (band && (point[1] < band[0] || point[1] > band[1])) continue;
    if (front && point[2] > -radii[2] * 0.35) continue;
    return center.map((v, i) => v + point[i]) as Vec3;
  }
}

/** 상자 겉면 위의 무작위 점. edges 비율만큼은 모서리 위에, 나머지는 면 넓이에 비례해 고른 면 위에 놓습니다. */
function sampleBox(center: Vec3, [w, h, d]: Vec3, edges: number): Vec3 {
  const half = [w / 2, h / 2, d / 2];
  if (Math.random() < edges) {
    // 한 축을 따라 달리는 모서리: 나머지 두 축은 ±끝에 고정합니다.
    const along = Math.floor(Math.random() * 3);
    const point = half.map((s, i) =>
      i === along ? (Math.random() * 2 - 1) * s : Math.random() < 0.5 ? -s : s,
    );
    return center.map((v, i) => v + point[i]) as Vec3;
  }
  const faces = [h * d, w * d, w * h];
  let pick = Math.random() * (faces[0] + faces[1] + faces[2]);
  const axis = pick < faces[0] ? 0 : (pick -= faces[0]) < faces[1] ? 1 : 2;
  const point = half.map((s) => (Math.random() * 2 - 1) * s);
  point[axis] = Math.random() < 0.5 ? -half[axis] : half[axis];
  return center.map((v, i) => v + point[i]) as Vec3;
}

/** 원 둘레 위의 점. 살짝 두께를 줘서 선이 너무 가늘어 보이지 않게 합니다. */
function sampleRing(center: Vec3, radius: number, axis: number): Vec3 {
  const angle = Math.random() * Math.PI * 2;
  const r = radius * (0.92 + Math.random() * 0.12);
  const [u, v] = [0, 1, 2].filter((i) => i !== axis);
  const point: Vec3 = [0, 0, 0];
  point[u] = Math.cos(angle) * r;
  point[v] = Math.sin(angle) * r;
  return center.map((c, i) => c + point[i]) as Vec3;
}

/** 노트북 화면 위 코드 줄을 따라 놓인 점 */
function sampleCode(center: Vec3, width: number, height: number): Vec3 {
  let pick = Math.random() * CODE_TOTAL;
  let row = 0;
  while (pick > CODE_LINES[row][1] && row < CODE_LINES.length - 1) {
    pick -= CODE_LINES[row][1];
    row += 1;
  }
  const [indent, length] = CODE_LINES[row];
  const rowHeight = height / CODE_LINES.length;
  const x = center[0] - width / 2 + (indent + Math.random() * length) * width;
  const y = center[1] - height / 2 + (row + 0.5) * rowHeight;
  return [x, y + (Math.random() - 0.5) * rowHeight * 0.25, center[2]];
}

function samplePosition(shape: Shape): Vec3 {
  switch (shape.kind) {
    case "capsule":
      return sampleCapsule(shape.a, shape.b, shape.r);
    case "ellipsoid":
      return sampleEllipsoid(
        shape.center,
        shape.radii,
        shape.band,
        shape.front,
      );
    case "box":
      return sampleBox(shape.center, shape.size, shape.edges ?? 0.4);
    case "ring":
      return sampleRing(shape.center, shape.radius, shape.axis);
    case "code":
      return sampleCode(shape.center, shape.width, shape.height);
  }
}

function sampleShape(shape: Shape): PosePoint {
  return { pos: samplePosition(shape), motion: shape.motion, glow: shape.glow };
}

/**
 * 포즈마다 정확히 count개의 점을 뿌립니다.
 * 같은 순번의 점끼리 포즈 사이를 이동하므로, 높이 띠 → x 순으로 정렬해 가까운 자리끼리 짝지어지게 합니다.
 */
export function samplePoses(count: number): SampledPose[] {
  return POSES.map(({ name, shapes, pivot }) => {
    const areas = shapes.map(shapeArea);
    const total = areas.reduce((sum, area) => sum + area, 0);
    const points = shapes.flatMap((shape, index) =>
      Array.from({ length: Math.round((areas[index] / total) * count) }, () =>
        sampleShape(shape),
      ),
    );
    // 반올림으로 생긴 차이는 가슴(첫 도형)에서 채우거나, 무작위로 골라 덜어 냅니다.
    while (points.length < count) points.push(sampleShape(shapes[0]));
    while (points.length > count) {
      points.splice(Math.floor(Math.random() * points.length), 1);
    }

    const band = (p: PosePoint) => Math.round((p.pos[1] + 1) * 6);
    points.sort((p, q) => band(p) - band(q) || p.pos[0] - q.pos[0]);
    return { name, points, pivot };
  });
}
