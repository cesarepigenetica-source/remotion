export type SceneKey =
  | "fragile-node"
  | "quick-punch"
  | "shatter"
  | "drain-gauge"
  | "calm-pulse"
  | "single-path"
  | "ghost-path"
  | "glitch-impact"
  | "steady-node"
  | "reject-stamp"
  | "brick-drop"
  | "stack-growth"
  | "calm-node"
  | "fork-path"
  | "two-node-system";

export type Beat = {
  text: string;
  scene: SceneKey;
  holdFrames?: number;
};

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

const WORDS_PER_SECOND = 3.1;
const MIN_BEAT_SECONDS = 1.15;
const SETTLE_SECONDS = 0.22;

export const wordCount = (text: string): number =>
  text
    .replace(/\*\*/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

export const beatDurationInFrames = (beat: Beat): number => {
  if (beat.holdFrames) return beat.holdFrames;
  const seconds = Math.max(
    MIN_BEAT_SECONDS,
    wordCount(beat.text) / WORDS_PER_SECOND + SETTLE_SECONDS,
  );
  return Math.round(seconds * FPS);
};

export const HOOK_BEAT: Beat = {
  text: "¿Y SI TU PROBLEMA NO FUERA GANAR POCO… SINO DEPENDER DE **UNA SOLA FUENTE DE INGRESOS**?",
  scene: "fragile-node",
  holdFrames: 100,
};

export const SCRIPT_BEATS: Beat[] = [
  { text: "PORQUE PIÉNSALO.", scene: "quick-punch" },
  { text: "SI MAÑANA TU INGRESO PRINCIPAL DESAPARECIERA…", scene: "shatter" },
  { text: "¿CUÁNTO TIEMPO PODRÍAS MANTENER TU ESTILO DE VIDA?", scene: "drain-gauge" },
  { text: "Y NO TE LO PREGUNTO PARA ASUSTARTE.", scene: "calm-pulse" },
  { text: "TE LO PREGUNTO PORQUE NOS ENSEÑARON A BUSCAR UN TRABAJO…", scene: "single-path" },
  {
    text: "PERO CASI NUNCA NOS ENSEÑARON A CONSTRUIR **UNA SEGUNDA FUENTE DE INGRESOS**.",
    scene: "ghost-path",
  },
  { text: "Y AHÍ ESTÁ **EL PROBLEMA**.", scene: "glitch-impact" },
  { text: "NO NECESARIAMENTE NECESITAS ABANDONAR TU TRABAJO.", scene: "steady-node" },
  {
    text: "NO NECESITAS CONVERTIRTE EN EMPRESARIO DE LA NOCHE A LA MAÑANA.",
    scene: "reject-stamp",
  },
  { text: "PERO SÍ PODRÍAS EMPEZAR A CONSTRUIR ALGO ADICIONAL.", scene: "brick-drop" },
  { text: "ALGO QUE APRENDAS A DESARROLLAR POCO A POCO.", scene: "stack-growth" },
  {
    text: "PORQUE TENER UNA SOLA FUENTE DE INGRESOS ES **UNA REALIDAD**.",
    scene: "calm-node",
  },
  {
    text: "PERO CREER QUE TIENE QUE SER LA ÚNICA… ES **UNA DECISIÓN**.",
    scene: "fork-path",
  },
  {
    text: "Y QUIZÁ YA ES MOMENTO DE EMPEZAR A CONSTRUIR **UNA SEGUNDA**.",
    scene: "two-node-system",
  },
];

export const CTA_BEAT: Beat = {
  text: "COMENTA **“SEGUNDA”**",
  scene: "two-node-system",
  holdFrames: 130,
};

export const CTA_SUBTEXT =
  "SI ALGUNA VEZ HAS PENSADO EN CONSTRUIR OTRA FUENTE DE INGRESOS.";

export const ALL_BEATS: Beat[] = [HOOK_BEAT, ...SCRIPT_BEATS, CTA_BEAT];

export const REEL3_DURATION = ALL_BEATS.reduce(
  (sum, beat) => sum + beatDurationInFrames(beat),
  0,
);
