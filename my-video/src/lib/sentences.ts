export type Sentence = {
  text: string;
  startFrame: number;
  durationInFrames: number;
};

const splitRaw = (text: string): string[] => {
  const matches = text.match(/[^.!?¿¡]+[.!?]+["»]?|[^.!?¿¡]+$/g);
  return (matches ?? [text]).map((s) => s.trim()).filter(Boolean);
};

const wordCount = (s: string) => (s.match(/[\p{L}\p{N}]+/gu) ?? []).length;

export const layoutSentences = (
  text: string,
  durationInFrames: number,
): Sentence[] => {
  const raw = splitRaw(text);
  const weights = raw.map((s) => Math.max(wordCount(s), 1));
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let cursor = 0;
  const sentences: Sentence[] = [];
  raw.forEach((s, i) => {
    const isLast = i === raw.length - 1;
    const share = Math.round((weights[i] / totalWeight) * durationInFrames);
    const duration = isLast ? durationInFrames - cursor : share;
    sentences.push({
      text: s,
      startFrame: cursor,
      durationInFrames: Math.max(duration, 1),
    });
    cursor += duration;
  });

  return sentences;
};
