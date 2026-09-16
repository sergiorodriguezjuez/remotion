import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Background } from "./components/Background";
import { BlockTitle } from "./components/BlockTitle";
import { ChapterTag } from "./components/ChapterTag";
import { ProgressBar } from "./components/ProgressBar";
import { SegmentCaption } from "./components/SegmentCaption";
import { buildTimeline } from "./lib/timeline";

export const { totalDurationInFrames } = buildTimeline();

export const VideoEssay: React.FC = () => {
  const { blocks } = buildTimeline();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {blocks.map((block) => (
        <Sequence
          key={block.blockId}
          from={block.startFrame}
          durationInFrames={block.durationInFrames}
          name={`Bloque ${block.blockId}`}
        >
          <Background variant={block.variant} />
          <ChapterTag
            blockId={block.blockId}
            title={block.blockTitle}
            variant={block.variant}
            durationInFrames={block.durationInFrames}
          />
          {block.items.map((item, i) =>
            item.kind === "title" ? (
              <Sequence
                key={i}
                from={item.startFrame - block.startFrame}
                durationInFrames={item.durationInFrames}
                name="title"
              >
                <BlockTitle
                  blockId={item.blockId}
                  title={item.blockTitle}
                  variant={item.variant}
                  durationInFrames={item.durationInFrames}
                />
              </Sequence>
            ) : (
              <Sequence
                key={i}
                from={item.startFrame - block.startFrame}
                durationInFrames={item.durationInFrames}
                name={item.file}
              >
                <Audio src={staticFile(item.file as string)} />
                <SegmentCaption
                  text={item.text as string}
                  durationInFrames={item.durationInFrames}
                  variant={item.variant}
                />
              </Sequence>
            ),
          )}
        </Sequence>
      ))}
      <ProgressBar totalDurationInFrames={totalDurationInFrames} />
    </AbsoluteFill>
  );
};
