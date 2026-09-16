import { interpolate, useCurrentFrame } from "remotion";
import { accentColorFor } from "./Background";
import type { BackgroundVariant } from "../lib/timeline";

export const ChapterTag: React.FC<{
  blockId: number;
  title: string;
  variant: BackgroundVariant;
  durationInFrames: number;
}> = ({ blockId, title, variant, durationInFrames }) => {
  const frame = useCurrentFrame();
  const accent = accentColorFor(variant);
  const opacity = interpolate(
    frame,
    [0, 20, durationInFrames - 20, durationInFrames],
    [0, 0.85, 0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 56,
        left: 64,
        opacity,
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: 4, background: accent }} />
      <div style={{ fontSize: 20, letterSpacing: 3, color: "#cfcfcf", fontWeight: 600 }}>
        {String(blockId).padStart(2, "0")} — {title.toUpperCase()}
      </div>
    </div>
  );
};
