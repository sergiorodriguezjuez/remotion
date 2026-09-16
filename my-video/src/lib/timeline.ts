import { SCRIPT } from "../script";

export const FPS = 30;
// Lowered from 1920x1080 for a fast preview render; bump back up for the
// final export once the edit is approved.
export const WIDTH = 1280;
export const HEIGHT = 720;
export const TITLE_CARD_FRAMES = 90;

export type BackgroundVariant =
  | "intro"
  | "fps"
  | "grain"
  | "cgi"
  | "light"
  | "mirror"
  | "gollum";

const BLOCK_VARIANTS: Record<number, BackgroundVariant> = {
  1: "intro",
  2: "fps",
  3: "grain",
  4: "cgi",
  5: "light",
  6: "mirror",
  7: "gollum",
};

export type TimelineSegment = {
  kind: "title" | "segment";
  blockId: number;
  blockTitle: string;
  variant: BackgroundVariant;
  startFrame: number;
  durationInFrames: number;
  file?: string;
  text?: string;
  segmentIndex?: number;
  segmentCount?: number;
};

export type TimelineBlock = {
  blockId: number;
  blockTitle: string;
  variant: BackgroundVariant;
  startFrame: number;
  durationInFrames: number;
  items: TimelineSegment[];
};

const secondsToFrames = (seconds: number) => Math.round(seconds * FPS);

export const buildTimeline = () => {
  const blocks: TimelineBlock[] = [];
  let cursor = 0;

  for (const block of SCRIPT) {
    const variant = BLOCK_VARIANTS[block.id] ?? "intro";
    const blockStart = cursor;
    const items: TimelineSegment[] = [];

    items.push({
      kind: "title",
      blockId: block.id,
      blockTitle: block.title,
      variant,
      startFrame: cursor,
      durationInFrames: TITLE_CARD_FRAMES,
    });
    cursor += TITLE_CARD_FRAMES;

    block.segments.forEach((segment, index) => {
      const durationInFrames = secondsToFrames(segment.durationInSeconds);
      items.push({
        kind: "segment",
        blockId: block.id,
        blockTitle: block.title,
        variant,
        startFrame: cursor,
        durationInFrames,
        file: segment.file,
        text: segment.text,
        segmentIndex: index,
        segmentCount: block.segments.length,
      });
      cursor += durationInFrames;
    });

    blocks.push({
      blockId: block.id,
      blockTitle: block.title,
      variant,
      startFrame: blockStart,
      durationInFrames: cursor - blockStart,
      items,
    });
  }

  return { blocks, totalDurationInFrames: cursor };
};
