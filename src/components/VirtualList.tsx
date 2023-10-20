import { FC, useEffect, useRef, useState } from "react";

import { useThrottle } from "@/hooks/useThrottle";
import Post from "./posts/Post";

interface IPosition {
  index: number;
  top: number;
  bottom: number;
  height: number;
  dHeight: number;
}

interface VirtualListProps {
  items: any[];
  estimatedItemHeight?: number;
  containerHeight: number;
  containerWidth: number;
  prevCount?: number;
  nextCount?: number;
  hasMore?: boolean;
  loading?: boolean;
  onScrollEnd?: () => void;
}

const VirtualList: FC<VirtualListProps> = ({
  items,
  estimatedItemHeight = 30,
  containerHeight,
  containerWidth,
  prevCount,
  nextCount,
  hasMore,
  loading,
  onScrollEnd,
}) => {
  const visibleCount = Math.ceil(containerHeight / estimatedItemHeight);
  prevCount = prevCount || visibleCount;
  nextCount = nextCount || visibleCount;

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [maxEndIdx, setMaxEndIdx] = useState(0);

  // 二分查找, 返回 index, 如果没找到，返回 null
  const binarySearch = (target: number) => {
    let start = 0;
    let end = positions.length - 1;
    let tempIdx = null;

    while (start <= end) {
      let midIdx = Math.floor(start + (end - start) / 2);
      let midVal = positions[midIdx].bottom;

      if (midVal === target) {
        return midIdx + 1;
      } else if (midVal < target) {
        start = midIdx + 1;
      } else if (midVal > target) {
        if (tempIdx === null || tempIdx > midIdx) {
          tempIdx = midIdx;
        }
        end = end - 1;
      }
    }
    return tempIdx;
  };

  // 查找 startIdx，缓冲 prevCount 个元素
  const idx = binarySearch(scrollTop) || 0;
  const startIdx = Math.max(idx - prevCount, 0);
  const endIdx = Math.min(idx + visibleCount + nextCount, positions.length - 1) || visibleCount;

  const listHeight =
    positions.length > 0 && positions[positions.length - 1]
      ? positions[positions.length - 1].bottom
      : containerHeight * 2;
  const contentOffset = startIdx > 0 ? positions[startIdx].top : 0;
  const contentHeight = listHeight - contentOffset;

  const containerStyle = {
    width: `${containerWidth}px`,
    height: `${containerHeight}px`,
    overflow: "hidden auto",
  };

  const contentStyle = {
    width: "100%",
    height: `${contentHeight}px`,
    transform: `translateY(${contentOffset}px)`,
  };

  const handleScroll = useThrottle({
    callback: () => {
      if (!containerRef.current || !contentRef.current) return;

      const { clientHeight, scrollHeight, scrollTop } = containerRef.current;
      console.log("contentHeight:", contentHeight);
      console.log("scrollTop:", scrollTop);

      setScrollTop(scrollTop);

      if (scrollHeight - clientHeight - scrollTop < 20) {
        console.log("到底了");
        if (endIdx === positions.length - 1) {
          onScrollEnd && onScrollEnd();
        }
      }
    },
    delay: 500,
  });

  // 初始化 positions
  const initPositions = () => {
    // 初次渲染
    if (positions.length === 0) {
      const arr = new Array(items.length).fill(null);
      const newPositions: IPosition[] = arr.map((_, idx) => {
        return {
          index: idx,
          height: estimatedItemHeight,
          top: idx * estimatedItemHeight,
          bottom: (idx + 1) * estimatedItemHeight,
          dHeight: 0,
        };
      });
      setPositions(newPositions);
    } else {
      // 加入了新数据，需要更新 positions
      const newPositions: IPosition[] = [
        ...positions,
        ...new Array(items.length - positions.length).fill(null),
      ];

      for (let i = positions.length; i < newPositions.length; i++) {
        const index = i;
        const height = estimatedItemHeight;
        const top = newPositions[i - 1].bottom;
        const bottom = top + height;
        const dHeight = 0;
        newPositions[i] = { index, height, top, bottom, dHeight };
      }

      setPositions(newPositions);
    }
  };

  // 更新 positions
  const updatePositions = () => {
    if (!contentRef.current || !containerRef.current || positions.length === 0) return;

    const children = Array.from(contentRef.current.children);

    const newPositions: IPosition[] = [...positions];

    children.forEach((child) => {
      const { height } = child.getBoundingClientRect();
      const idx = Number(child.getAttribute("data-index"));
      if (newPositions[idx]) {
        let dHeight = positions[idx].height - height;
        if (dHeight) {
          newPositions[idx].height = height;
          newPositions[idx].bottom = newPositions[idx].bottom - dHeight;
          newPositions[idx].dHeight = dHeight;
        }
      }
    });

    const idx = Number(children[0].getAttribute("data-index") || "0");
    let startHeight = newPositions[idx].dHeight;
    newPositions[idx].dHeight = 0;

    for (let i = idx + 1; i < newPositions.length; i++) {
      newPositions[i].top = newPositions[i - 1].bottom;
      newPositions[i].bottom = newPositions[i].bottom - startHeight;
      if (newPositions[i].dHeight) {
        startHeight += newPositions[i].dHeight;
        newPositions[i].dHeight = 0;
      }
    }

    setPositions(newPositions);
  };

  // 初始化
  useEffect(() => {
    console.log("初始化");
    if (!contentRef.current || !containerRef.current) return;

    initPositions();
  }, [contentRef.current, containerRef.current, items.length]);

  // 更新
  useEffect(() => {
    // maxEndIdx < endIdx 时更新 positions，回滚时不更新
    if (maxEndIdx < endIdx) {
      console.log("更新");
      setMaxEndIdx(endIdx);
      updatePositions();
    }
  }, [endIdx]);

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onScroll={handleScroll}
    >
      <div
        ref={contentRef}
        style={contentStyle}
      >
        {items.slice(startIdx, endIdx + 1).map((item, idx) => {
          return (
            <Post
              post={item}
              key={idx}
              data-index={idx + startIdx}
            />
          );
        })}

        {loading && (
          <div className="flex justify-center py-2">
            <p>Loading...</p>
          </div>
        )}

        {!loading && !hasMore && (
          <div className="flex justify-center py-4">
            <p>没有更多了</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualList;
