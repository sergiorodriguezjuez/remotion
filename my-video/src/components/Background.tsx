import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { BackgroundVariant } from "../lib/timeline";

const PALETTE: Record<BackgroundVariant, { base: string; accent: string; accent2: string }> = {
  intro: { base: "#070b12", accent: "#3fa9f5", accent2: "#0d1b2a" },
  fps: { base: "#0a0e14", accent: "#f5b74f", accent2: "#1a2230" },
  grain: { base: "#0c0a08", accent: "#e0c9a6", accent2: "#241f19" },
  cgi: { base: "#06090c", accent: "#38e0c6", accent2: "#0f2622" },
  light: { base: "#0a0806", accent: "#ffd27a", accent2: "#1f1710" },
  mirror: { base: "#0a070c", accent: "#e0538f", accent2: "#241626" },
  gollum: { base: "#050403", accent: "#d99a4e", accent2: "#150f08" },
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
    }}
  />
);

const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.05 }) => (
  <svg
    width="100%"
    height="100%"
    style={{ position: "absolute", inset: 0, opacity, mixBlendMode: "overlay" }}
  >
    <filter id="grainFilter">
      <feTurbulence type="fractalNoise" baseFrequency={0.9} numOctaves={2} stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grainFilter)" />
  </svg>
);

const IntroBg: React.FC<{ colors: typeof PALETTE.intro }> = ({ colors }) => {
  const frame = useCurrentFrame();
  const x = 50 + Math.sin(frame / 90) * 12;
  const y = 45 + Math.cos(frame / 120) * 10;
  return (
    <AbsoluteFill style={{ background: colors.base }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${x}% ${y}%, ${colors.accent}33 0%, transparent 55%)`,
        }}
      />
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${(i / 14) * 100}%`,
            height: 1,
            background: colors.accent,
            opacity: 0.04,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const FpsBg: React.FC<{ colors: typeof PALETTE.fps }> = ({ colors }) => {
  const frame = useCurrentFrame();
  const rowY = [0.32, 0.68];
  const counts = [24, 48];
  return (
    <AbsoluteFill style={{ background: colors.base }}>
      {rowY.map((y, rowIdx) => {
        const n = counts[rowIdx];
        const speed = rowIdx === 0 ? 1 : 2;
        const offset = ((frame * speed * 4) % 120) - 120;
        return (
          <div key={rowIdx} style={{ position: "absolute", top: `${y * 100}%`, left: 0, right: 0 }}>
            <div
              style={{
                display: "flex",
                gap: 24,
                transform: `translateX(${offset}px)`,
                opacity: 0.35,
              }}
            >
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: rowIdx === 0 ? 56 : 32,
                    background: colors.accent,
                    borderRadius: 2,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                right: 80,
                top: -70,
                fontFamily: "Arial, sans-serif",
                fontSize: 26,
                letterSpacing: 4,
                color: colors.accent,
                opacity: 0.5,
              }}
            >
              {n} FPS
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const GrainBg: React.FC<{ colors: typeof PALETTE.grain }> = ({ colors }) => {
  return (
    <AbsoluteFill style={{ background: colors.base }}>
      <AbsoluteFill style={{ left: 0, width: "50%", background: colors.accent2 }}>
        <Grain opacity={0.16} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          left: "50%",
          width: "50%",
          background: `linear-gradient(120deg, ${colors.accent2}, #050403)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 1,
          background: colors.accent,
          opacity: 0.25,
        }}
      />
    </AbsoluteFill>
  );
};

const CgiBg: React.FC<{ colors: typeof PALETTE.cgi }> = ({ colors }) => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.6) % 80;
  return (
    <AbsoluteFill style={{ background: colors.base }}>
      <AbsoluteFill
        style={{
          perspective: 600,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-20% -20%",
            transform: `rotateX(60deg) translateY(${drift}px)`,
            backgroundImage: `linear-gradient(${colors.accent}22 1px, transparent 1px), linear-gradient(90deg, ${colors.accent}22 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const LightBg: React.FC<{ colors: typeof PALETTE.light }> = ({ colors }) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(Math.sin(frame / 140), [-1, 1], [30, 70]);
  return (
    <AbsoluteFill style={{ background: colors.base }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 60% 80% at ${sweep}% 0%, ${colors.accent}2e 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const MirrorBg: React.FC<{ colors: typeof PALETTE.mirror }> = ({ colors }) => {
  const frame = useCurrentFrame();
  const glitch = Math.sin(frame / 17) > 0.94 ? 6 : 0;
  return (
    <AbsoluteFill style={{ background: colors.base }}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${colors.accent2}, #050308)`,
          transform: `translateX(${glitch}px)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, transparent, ${colors.accent}14)`,
          transform: `translateX(${-glitch}px)`,
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

const GollumBg: React.FC<{ colors: typeof PALETTE.gollum }> = ({ colors }) => {
  const frame = useCurrentFrame();
  const flicker = 0.5 + Math.abs(Math.sin(frame / 6)) * 0.15 + Math.sin(frame / 47) * 0.05;
  return (
    <AbsoluteFill style={{ background: colors.base }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 60%, ${colors.accent}${Math.round(
            flicker * 40,
          )
            .toString(16)
            .padStart(2, "0")} 0%, transparent 50%)`,
        }}
      />
    </AbsoluteFill>
  );
};

export const Background: React.FC<{ variant: BackgroundVariant }> = ({ variant }) => {
  const colors = PALETTE[variant];
  return (
    <AbsoluteFill>
      {variant === "intro" && <IntroBg colors={colors} />}
      {variant === "fps" && <FpsBg colors={colors} />}
      {variant === "grain" && <GrainBg colors={colors} />}
      {variant === "cgi" && <CgiBg colors={colors} />}
      {variant === "light" && <LightBg colors={colors} />}
      {variant === "mirror" && <MirrorBg colors={colors} />}
      {variant === "gollum" && <GollumBg colors={colors} />}
      <Grain opacity={0.035} />
      <Vignette />
    </AbsoluteFill>
  );
};

export const accentColorFor = (variant: BackgroundVariant) => PALETTE[variant].accent;
