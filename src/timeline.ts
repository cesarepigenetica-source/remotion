// Timeline de postproducción — todo en SEGUNDOS, derivado del guion hablado
// que el cliente proporcionó (con marcas de tiempo escaladas a la duración
// real del video, 62.13s, ya que el guion original sumaba ~40s).

export const FPS = 30;
export const VIDEO_DURATION_S = 62.13;
export const SCALE = VIDEO_DURATION_S / 40; // guion original terminaba en ~40s

export const s2f = (s: number) => Math.round(s * FPS);

export type TextCard = {
  start: number; // segundos (guion original)
  end: number;
  lines: { text: string; green?: boolean }[][]; // líneas -> palabras
  emphasis?: boolean; // si es un punch-in fuerte
};

// Frases de énfasis: máx 2-5 palabras, MAYÚSCULAS, verde solo en la palabra clave.
export const TEXT_CARDS: TextCard[] = [
  {
    start: 0.6,
    end: 3.4,
    lines: [[{ text: "INSUFICIENCIA" }, { text: "RENAL", green: true }]],
  },
  {
    start: 4.2,
    end: 7.4,
    lines: [[{ text: "BUSCANDO" }, { text: "ALTERNATIVAS", green: true }]],
  },
  {
    start: 8.6,
    end: 12.6,
    lines: [[{ text: "NO", green: true }, { text: "SUSTITUYE" }, { text: "TU" }, { text: "TRATAMIENTO" }]],
  },
  {
    start: 14.6,
    end: 18.2,
    lines: [[{ text: "ENFOQUE" }, { text: "INTEGRAL" }, { text: "DE" }, { text: "BIENESTAR", green: true }]],
  },
  {
    start: 19.6,
    end: 23.2,
    lines: [[{ text: "TESTIMONIOS", green: true }, { text: "REALES" }]],
  },
  {
    start: 29.6,
    end: 33.2,
    lines: [[{ text: "RESULTADOS" }, { text: "INDIVIDUALES", green: true }]],
  },
  {
    start: 35.2,
    end: 39.6,
    lines: [
      [{ text: "ESCRIBE" }, { text: '"RIÑONES"', green: true }],
      [{ text: "POR" }, { text: "WHATSAPP" }],
    ],
    emphasis: true,
  },
];

export type BRollBadge = {
  start: number;
  end: number;
  icon: "kidney" | "dialysis";
  label: string;
};

export const BROLL_BADGES: BRollBadge[] = [
  { start: 1.2, end: 3.6, icon: "kidney", label: "SALUD RENAL" },
  { start: 9.4, end: 12.0, icon: "dialysis", label: "DIÁLISIS" },
];

export type SfxCue = { time: number; type: "pop" | "whoosh" | "impact" };

export const SFX_CUES: SfxCue[] = [
  // pop para cada aparición de texto
  ...TEXT_CARDS.map((c) => ({ time: c.start, type: "pop" as const })),
  // whoosh para cada entrada de b-roll
  ...BROLL_BADGES.map((b) => ({ time: b.start, type: "whoosh" as const })),
  // impacto suave en el CTA final
  { time: 35.2, type: "impact" as const },
];

// Punch-ins: pequeño zoom (100% -> 106%) durante cada frase de énfasis.
export const PUNCH_INS = TEXT_CARDS.map((c) => ({
  start: c.start,
  end: c.end,
  scale: c.emphasis ? 1.08 : 1.05,
}));
