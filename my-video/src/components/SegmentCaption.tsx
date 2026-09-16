import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { layoutSentences } from "../lib/sentences";
import { accentColorFor } from "./Background";
import type { BackgroundVariant } from "../lib/timeline";

const SentenceView: React.FC<{
  text: string;
  localFrame: number;
  durationInFrames: number;
  fps: number;
  accent: string;
}> = ({ text, localFrame, durationInFrames, fps, accent }) => {
  const enter = spring({
    frame: localFrame,
    fps,
    config: { damping: 200, mass: 0.5, stiffness: 120 },
  });
  const exitStart = durationInFrames - 10;
  const exit = interpolate(localFrame, [exitStart, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(enter, exit);
  const translateY = interpolate(enter, [0, 1], [18, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        textAlign: "center",
        padding: "0 140px",
      }}
    >
      <span
        style={{
          fontFamily: "Arial, sans-serif",
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1.35,
          color: "#f7f7f5",
          background: `linear-gradient(180deg, transparent, ${accent}00)`,
          textShadow: "0 6px 24px rgba(0,0,0,0.65)",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const SegmentCaption: React.FC<{
  text: string;
  durationInFrames: number;
  variant: BackgroundVariant;
}> = ({ text, durationInFrames, variant }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = accentColorFor(variant);
  const sentences = layoutSentences(text, durationInFrames);

  const active = sentences.find(
    (s) => frame >= s.startFrame && frame < s.startFrame + s.durationInFrames,
  );

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", paddingBottom: 160 }}>
      {active && (
        <SentenceView
          key={active.startFrame}
          text={active.text}
          localFrame={frame - active.startFrame}
          durationInFrames={active.durationInFrames}
          fps={fps}
          accent={accent}
        />
      )}
    </AbsoluteFill>
  );
};
