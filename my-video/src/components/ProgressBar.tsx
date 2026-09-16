import { useCurrentFrame } from "remotion";

export const ProgressBar: React.FC<{ totalDurationInFrames: number }> = ({
  totalDurationInFrames,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.min(frame / totalDurationInFrames, 1);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 5,
        background: "rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: "#f4f4f2",
          opacity: 0.75,
        }}
      />
    </div>
  );
};
