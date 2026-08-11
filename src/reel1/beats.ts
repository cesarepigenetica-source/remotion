export type Beat = {
  text: string;
  /** Fixed total duration override (used for the hook and CTA cards). */
  holdFrames?: number;
};

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

const WORDS_PER_SECOND = 2.7;
const MIN_BEAT_SECONDS = 1.15;
const SETTLE_SECONDS = 0.35;

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
  holdFrames: 105,
};

export const SCRIPT_BEATS: Beat[] = [
  { text: "PORQUE PIÉNSALO." },
  { text: "SI MAÑANA TU INGRESO PRINCIPAL DESAPARECIERA…" },
  { text: "¿CUÁNTO TIEMPO PODRÍAS MANTENER TU ESTILO DE VIDA?" },
  { text: "Y NO TE LO PREGUNTO PARA ASUSTARTE." },
  { text: "TE LO PREGUNTO PORQUE NOS ENSEÑARON A BUSCAR UN TRABAJO…" },
  { text: "PERO CASI NUNCA NOS ENSEÑARON A CONSTRUIR **UNA SEGUNDA FUENTE DE INGRESOS**." },
  { text: "Y AHÍ ESTÁ **EL PROBLEMA**." },
  { text: "NO NECESARIAMENTE NECESITAS ABANDONAR TU TRABAJO." },
  { text: "NO NECESITAS CONVERTIRTE EN EMPRESARIO DE LA NOCHE A LA MAÑANA." },
  { text: "PERO SÍ PODRÍAS EMPEZAR A CONSTRUIR ALGO ADICIONAL." },
  { text: "ALGO QUE APRENDAS A DESARROLLAR POCO A POCO." },
  { text: "PORQUE TENER UNA SOLA FUENTE DE INGRESOS ES **UNA REALIDAD**." },
  { text: "PERO CREER QUE TIENE QUE SER LA ÚNICA… ES **UNA DECISIÓN**." },
  { text: "Y QUIZÁ YA ES MOMENTO DE EMPEZAR A CONSTRUIR **UNA SEGUNDA**." },
];

export const CTA_BEAT: Beat = {
  text: "COMENTA **“SEGUNDA”**",
  holdFrames: 135,
};

export const CTA_SUBTEXT =
  "SI ALGUNA VEZ HAS PENSADO EN CONSTRUIR OTRA FUENTE DE INGRESOS.";

export const ALL_BEATS: Beat[] = [HOOK_BEAT, ...SCRIPT_BEATS, CTA_BEAT];

export const REEL1_DURATION = ALL_BEATS.reduce(
  (sum, beat) => sum + beatDurationInFrames(beat),
  0,
);
