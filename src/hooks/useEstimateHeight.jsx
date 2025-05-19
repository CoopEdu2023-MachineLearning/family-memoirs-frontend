import { useEffect, useRef, useState } from "react";

export const useEstimateHeight = (item) => {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(300); // 默认高度

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const estimated = computeHeight(item, width);
      setHeight(estimated);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [item]);

  return [height, containerRef];
};

// 实际高度估算函数
function computeHeight(item, width) {
  const padding = 48;
  const header = 28;
  const nameGender = 40;
  const margin = 40;

  const charsPerLine = Math.floor(width / 14);
  const textLines = Math.ceil(item.description.text.length / charsPerLine);
  const textHeight = textLines * 29;

  // 标签高度估算
  let tagLineCount = 1;
  let currentLineWidth = 0;
  item.tags.forEach((tag) => {
    const tagWidth = tag.length * 14 + 24;
    if (currentLineWidth + tagWidth > width) {
      tagLineCount += 1;
      currentLineWidth = tagWidth;
    } else {
      currentLineWidth += tagWidth;
    }
  });
  const tagHeight = tagLineCount * 32 + 24;

  return padding + header + nameGender + margin + textHeight + tagHeight;
}
