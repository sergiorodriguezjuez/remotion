import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { accentColorFor } from "./Background";
import type { BackgroundVariant } from "../lib/timeline";

export const BlockTitle: React.FC<{
  blockId: number;
  title: string;
  variant: BackgroundVariant;
  durationInFrames: number;
}> = ({ blockId, title, variant, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = accentColorFor(variant);

  const enter = spring({ frame, fps, config: { damping: 200, mass: 0.6 } });
  const exitStart = durationInFrames - 15;
  const exit = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(enter, exit);
  const translateY = interpolate(enter, [0, 1], [24, 0]);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          textAlign: "center",
          maxWidth: 1400,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 10,
            color: accent,
            marginBottom: 22,
            fontWeight: 700,
          }}
        >
          BLOQUE {blockId}
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "#f4f4f2",
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 28,
            width: 90,
            height: 4,
            background: accent,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
