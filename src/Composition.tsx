import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

const TITLE_START = 0;
const TITLE_END = 25;
const SUBTITLE_START = 10;
const SUBTITLE_END = 35;
const BADGE_START = 0;
const BADGE_END = 20;
const BAR_START = 40;
const BAR_END = 250;
const EXIT_START = 270;
const EXIT_END = 300;

const clampedProgress = (
  frame: number,
  from: number,
  to: number,
  easing = Easing.out(Easing.cubic),
) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

export const MyComposition = () => {
  const frame = useCurrentFrame();

  const titleProgress = clampedProgress(frame, TITLE_START, TITLE_END);
  const titleTranslateY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

  const subtitleProgress = clampedProgress(frame, SUBTITLE_START, SUBTITLE_END);
  const subtitleTranslateY = interpolate(subtitleProgress, [0, 1], [20, 0]);

  const badgeOpacity = clampedProgress(frame, BADGE_START, BADGE_END);

  const barOpacity = clampedProgress(frame, BAR_START - 15, BAR_START);
  const progress = clampedProgress(
    frame,
    BAR_START,
    BAR_END,
    Easing.inOut(Easing.cubic),
  );
  const percent = Math.round(progress * 100);

  const exitProgress = clampedProgress(
    frame,
    EXIT_START,
    EXIT_END,
    Easing.inOut(Easing.cubic),
  );
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.08]);
  const exitTranslateY = interpolate(exitProgress, [0, 1], [0, -30]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#05060a",
        backgroundImage:
          "radial-gradient(circle at 50% 35%, #151a2e 0%, #05060a 65%)",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: badgeOpacity * exitOpacity,
        }}
      >
        <div
          style={{
            padding: "10px 28px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: 6,
            fontSize: 20,
            textTransform: "uppercase",
          }}
        >
          Remotion Studio
        </div>
      </div>

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${exitTranslateY}px) scale(${exitScale})`,
          opacity: exitOpacity,
        }}
      >
        <div
          style={{
            transform: `translateY(${titleTranslateY}px) scale(${titleScale})`,
            opacity: titleProgress,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              letterSpacing: 6,
              backgroundImage:
                "linear-gradient(90deg, #ffffff 0%, #9db4ff 50%, #7c8cff 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 80px rgba(124,140,255,0.35)",
            }}
          >
            PRUEBA REMOTION
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: 3,
            opacity: subtitleProgress,
            transform: `translateY(${subtitleTranslateY}px)`,
          }}
        >
          Verificación de generación de video
        </div>

        <div
          style={{
            marginTop: 90,
            width: 640,
            opacity: barOpacity,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 10,
              borderRadius: 999,
              backgroundColor: "rgba(255,255,255,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress * 100}%`,
                height: "100%",
                borderRadius: 999,
                backgroundImage:
                  "linear-gradient(90deg, #7c8cff 0%, #b98bff 100%)",
                boxShadow: "0 0 24px rgba(124,140,255,0.6)",
              }}
            />
          </div>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "space-between",
              color: "rgba(255,255,255,0.45)",
              fontSize: 20,
              letterSpacing: 2,
            }}
          >
            <span>Procesando</span>
            <span>{percent}%</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
