import { Easing, interpolate, useCurrentFrame } from "remotion";
import { ORANGE, WHITE } from "../reel1/colors";
import { BigWord, Connector, Node, ShatterField } from "./primitives";
import type { SceneKey } from "./beats";

const Center: React.FC<{
  top?: string;
  left?: string;
  children: React.ReactNode;
}> = ({ top = "46%", left = "50%", children }) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      transform: "translate(-50%, -50%)",
    }}
  >
    {children}
  </div>
);

// 1 — HOOK: a single glowing node, alone and slightly unstable.
const FragileNode: React.FC = () => {
  const frame = useCurrentFrame();
  const wobble = Math.sin(frame * 0.16) * 4;
  const zoom = interpolate(frame, [0, 100], [1, 1.08]);
  const enter = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})` }}>
      <Center>
        <div style={{ transform: `scale(${enter})` }}>
          <Node size={200} lit={1} wobble={wobble} />
        </div>
      </Center>
    </div>
  );
};

// 2 — quick punch: expanding ring burst, no clutter.
const QuickPunch: React.FC = () => {
  const frame = useCurrentFrame();
  const ring = interpolate(frame, [0, 20], [0.2, 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(frame, [0, 6, 20], [1, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Center>
      <div
        style={{
          width: 260,
          height: 260,
          borderRadius: "50%",
          border: `6px solid ${ORANGE}`,
          transform: `scale(${ring})`,
          opacity,
        }}
      />
    </Center>
  );
};

// 3 — the single node shatters and goes dark.
const Shatter: React.FC = () => {
  const frame = useCurrentFrame();
  const triggerFrame = 5;
  const broken = frame >= triggerFrame;
  const nodeScale = broken
    ? interpolate(frame, [triggerFrame, triggerFrame + 8], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.cubic),
      })
    : 1;
  const shakeX = frame >= triggerFrame && frame < triggerFrame + 6 ? (frame % 2 === 0 ? 10 : -10) : 0;

  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateX(${shakeX}px)` }}>
      <Center>
        <div style={{ transform: `scale(${nodeScale})` }}>
          <Node size={200} lit={broken ? 0 : 1} />
        </div>
        <ShatterField frame={frame} triggerFrame={triggerFrame} size={90} />
      </Center>
    </div>
  );
};

// 4 — a gauge draining fast.
const DrainGauge: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const fill = interpolate(frame, [6, duration - 10], [1, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const pct = Math.round(fill * 100);
  return (
    <Center>
      <div
        style={{
          width: 160,
          height: 380,
          borderRadius: 24,
          border: `4px solid ${WHITE}55`,
          padding: 10,
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${fill * 100}%`,
            borderRadius: 14,
            background: `linear-gradient(to top, ${ORANGE}, #ffb37a)`,
            boxShadow: `0 0 30px 2px ${ORANGE}77`,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 24,
          textAlign: "center",
          fontFamily: '"Arial Black", Arial, sans-serif',
          fontWeight: 900,
          fontSize: 64,
          color: WHITE,
        }}
      >
        {pct}%
      </div>
    </Center>
  );
};

// 5 — calm breathing pulse.
const CalmPulse: React.FC = () => {
  const frame = useCurrentFrame();
  const breathe = 0.94 + Math.sin(frame * 0.09) * 0.06;
  return (
    <Center>
      <div
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ORANGE}55 0%, transparent 72%)`,
          transform: `scale(${breathe})`,
        }}
      />
    </Center>
  );
};

// 6 — a single line draws to a single lit node: "buscar un trabajo".
const SinglePath: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [4, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const lit = interpolate(frame, [22, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Center>
        <div style={{ position: "relative", width: 420, height: 40 }}>
          <Connector
            from={{ x: 0, y: 20 }}
            to={{ x: 380, y: 20 }}
            progress={progress}
          />
          <div style={{ position: "absolute", left: -18, top: -18 }}>
            <Node size={72} lit={1} />
          </div>
          <div style={{ position: "absolute", left: 344, top: -46 }}>
            <Node size={110} lit={lit} />
          </div>
        </div>
      </Center>
    </div>
  );
};

// 7 — a second path is attempted but never finished.
const GhostPath: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [4, 26], [0, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Center>
        <div style={{ position: "relative", width: 420, height: 40 }}>
          <div style={{ position: "absolute", left: -18, top: -18 }}>
            <Node size={72} lit={1} />
          </div>
          <Connector
            from={{ x: 0, y: 20 }}
            to={{ x: 380, y: 20 }}
            progress={progress}
            dashed
          />
          <div style={{ position: "absolute", left: 344, top: -46, opacity: 0.35 }}>
            <Node size={110} lit={0} />
          </div>
        </div>
      </Center>
    </div>
  );
};

// 8 — glitch impact word.
const GlitchImpact: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [0, 3, 10], [0.5, 0.2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: ORANGE,
          opacity: flash,
        }}
      />
      <Center>
        <BigWord text="PROBLEMA" frame={frame} fontSize={128} glitch color={ORANGE} />
      </Center>
    </div>
  );
};

// 9 — the job node, steady and intact — reassurance.
const SteadyNode: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });
  const checkProgress = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Center>
      <div style={{ transform: `scale(${enter})`, position: "relative" }}>
        <Node size={190} lit={1} />
        <div
          style={{
            position: "absolute",
            right: -30,
            bottom: -10,
            width: 70,
            height: 70,
            borderRadius: "50%",
            backgroundColor: WHITE,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${checkProgress})`,
          }}
        >
          <div
            style={{
              width: 30,
              height: 16,
              borderLeft: `6px solid ${ORANGE}`,
              borderBottom: `6px solid ${ORANGE}`,
              transform: "rotate(-45deg) translate(2px, -4px)",
            }}
          />
        </div>
      </div>
    </Center>
  );
};

// 10 — reject a fast clock with a big stamp.
const RejectStamp: React.FC = () => {
  const frame = useCurrentFrame();
  const spin = frame * 22;
  const stampProgress = interpolate(frame, [14, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(3)),
  });
  return (
    <Center>
      <div style={{ position: "relative", width: 220, height: 220 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `6px solid ${WHITE}66`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 6,
            height: 78,
            marginLeft: -3,
            marginTop: -78,
            backgroundColor: ORANGE,
            transformOrigin: "50% 100%",
            transform: `rotate(${spin}deg)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: -20,
            transform: `scale(${stampProgress}) rotate(-18deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 220,
              height: 14,
              backgroundColor: WHITE,
              position: "absolute",
              transform: "rotate(45deg)",
              boxShadow: `0 0 20px 2px ${ORANGE}`,
            }}
          />
          <div
            style={{
              width: 220,
              height: 14,
              backgroundColor: WHITE,
              position: "absolute",
              transform: "rotate(-45deg)",
              boxShadow: `0 0 20px 2px ${ORANGE}`,
            }}
          />
        </div>
      </div>
    </Center>
  );
};

// 11 — a single brick drops with impact.
const BrickDrop: React.FC = () => {
  const frame = useCurrentFrame();
  const y = interpolate(frame, [0, 14], [-420, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const squash = frame >= 13 && frame < 20 ? interpolate(frame, [13, 16, 20], [1, 0.6, 1]) : 1;
  const shakeY = frame >= 13 && frame < 19 ? (frame % 2 === 0 ? 6 : -6) : 0;
  return (
    <div style={{ position: "absolute", inset: 0, transform: `translateY(${shakeY}px)` }}>
      <Center top="58%">
        <div
          style={{
            width: 240,
            height: 90,
            borderRadius: 10,
            backgroundColor: "#150900",
            border: `4px solid ${ORANGE}`,
            transform: `translateY(${y}px) scaleY(${squash})`,
            boxShadow: `0 0 26px 2px ${ORANGE}66`,
          }}
        />
      </Center>
    </div>
  );
};

// 12 — bricks stack up incrementally.
const StackGrowth: React.FC = () => {
  const frame = useCurrentFrame();
  const bricks = [0, 1, 2, 3];
  return (
    <Center top="60%">
      <div style={{ display: "flex", flexDirection: "column-reverse", gap: 10 }}>
        {bricks.map((i) => {
          const start = 4 + i * 9;
          const enter = interpolate(frame, [start, start + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(2)),
          });
          return (
            <div
              key={i}
              style={{
                width: 220 - i * 6,
                height: 56,
                marginLeft: (220 - (220 - i * 6)) / 2,
                borderRadius: 8,
                backgroundColor: "#150900",
                border: `4px solid ${ORANGE}`,
                opacity: enter,
                transform: `scaleY(${enter}) translateY(${(1 - enter) * 20}px)`,
                transformOrigin: "bottom",
              }}
            />
          );
        })}
      </div>
    </Center>
  );
};

// 13 — the single node again, calm and steady (no wobble).
const CalmNode: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.6)),
  });
  return (
    <Center>
      <div style={{ transform: `scale(${enter})` }}>
        <Node size={190} lit={1} />
      </div>
    </Center>
  );
};

// 14 — a fork: one path lights up, the other stays dim.
const ForkPath: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [4, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const chosenLit = interpolate(frame, [20, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <Center top="52%">
        <div style={{ position: "relative", width: 460, height: 260 }}>
          <div style={{ position: "absolute", left: 0, top: 110 }}>
            <Node size={64} lit={1} />
          </div>
          <Connector from={{ x: 32, y: 142 }} to={{ x: 420, y: 32 }} progress={progress} />
          <Connector
            from={{ x: 32, y: 142 }}
            to={{ x: 420, y: 232 }}
            progress={progress}
            dashed
          />
          <div style={{ position: "absolute", left: 380, top: -18 }}>
            <Node size={92} lit={chosenLit} />
          </div>
          <div style={{ position: "absolute", left: 380, top: 182, opacity: 0.3 }}>
            <Node size={72} lit={0} />
          </div>
        </div>
      </Center>
    </div>
  );
};

// 15 — two nodes, both lit, connected — the finished system.
const TwoNodeSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const link = interpolate(frame, [6, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const litB = interpolate(frame, [20, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zoom = interpolate(frame, [0, 30], [1.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})` }}>
      <Center>
        <div style={{ position: "relative", width: 400, height: 40 }}>
          <Connector from={{ x: 0, y: 20 }} to={{ x: 360, y: 20 }} progress={link} />
          <div style={{ position: "absolute", left: -20, top: -20 }}>
            <Node size={80} lit={1} />
          </div>
          <div style={{ position: "absolute", left: 300, top: -20 }}>
            <Node size={80} lit={litB} />
          </div>
        </div>
      </Center>
    </div>
  );
};

const REGISTRY: Record<SceneKey, React.FC<{ duration: number }>> = {
  "fragile-node": FragileNode,
  "quick-punch": QuickPunch,
  shatter: Shatter,
  "drain-gauge": DrainGauge,
  "calm-pulse": CalmPulse,
  "single-path": SinglePath,
  "ghost-path": GhostPath,
  "glitch-impact": GlitchImpact,
  "steady-node": SteadyNode,
  "reject-stamp": RejectStamp,
  "brick-drop": BrickDrop,
  "stack-growth": StackGrowth,
  "calm-node": CalmNode,
  "fork-path": ForkPath,
  "two-node-system": TwoNodeSystem,
};

export const Scene: React.FC<{ scene: SceneKey; duration: number }> = ({
  scene,
  duration,
}) => {
  const Component = REGISTRY[scene];
  return <Component duration={duration} />;
};
