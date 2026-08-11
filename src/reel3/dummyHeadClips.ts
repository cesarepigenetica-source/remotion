/**
 * Maps a script-beat index (0 = hook, 1-14 = script lines, 15 = CTA) to a
 * Dummy Head B-roll clip. Add entries here once clips are available (drop
 * the video file in public/dummyhead/ and reference it with staticFile()
 * from Reel3.tsx) — until then every beat falls back to its motion-graphic
 * Scene, so the video renders complete either way.
 *
 * Suggested actions per the script (already prompted for generation):
 *   1  — PORQUE PIÉNSALO.                              → pensando
 *   5  — TE LO PREGUNTO... BUSCAR UN TRABAJO…           → caminando
 *   9  — ...DE LA NOCHE A LA MAÑANA.                    → llamando
 *  10  — ...CONSTRUIR ALGO ADICIONAL.                   → construyendo
 *  13  — ...ES UNA DECISIÓN.                            → decidiendo
 *  14  — ...EMPEZAR A CONSTRUIR UNA SEGUNDA.            → confiado/triunfante
 */
export const DUMMY_HEAD_CLIPS: Partial<Record<number, string>> = {};
