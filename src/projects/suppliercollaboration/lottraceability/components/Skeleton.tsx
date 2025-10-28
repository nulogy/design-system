import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  backgroundColor?: string;
  animation?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
  backgroundColor = "#f0f2f5",
  animation = true,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor,
        ...(animation && {
          position: "relative",
          overflow: "hidden",
        }),
        ...style,
      }}
    >
      {animation && <div className="skeleton-wave" />}
    </div>
  );
};

// Specific skeleton variants for common use cases
export const SkeletonText: React.FC<{ lines?: number; width?: string }> = ({ lines = 1, width = "100%" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton key={index} width={index === lines - 1 ? "75%" : width} height="14px" />
    ))}
  </div>
);

export const SkeletonTable: React.FC<{
  rows?: number;
  columns?: number;
  cellHeight?: string;
}> = ({ rows = 5, columns = 4, cellHeight = "40px" }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    {/* Header */}
    <div style={{ display: "flex", gap: "16px" }}>
      {Array.from({ length: columns }).map((_, index) => (
        <Skeleton key={`header-${index}`} width="120px" height="20px" borderRadius="4px" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={`row-${rowIndex}`} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={`cell-${rowIndex}-${colIndex}`}
            width={colIndex === 0 ? "80px" : "100px"}
            height={cellHeight}
            borderRadius="4px"
          />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonCard: React.FC<{
  width?: string;
  height?: string;
  showAvatar?: boolean;
}> = ({ width = "300px", height = "200px", showAvatar = false }) => (
  <div
    style={{
      width,
      height,
      border: "1px solid #e4e7eb",
      borderRadius: "8px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    }}
  >
    {showAvatar && (
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Skeleton width="40px" height="40px" borderRadius="50%" />
        <Skeleton width="120px" height="16px" />
      </div>
    )}
    <Skeleton width="80%" height="20px" />
    <Skeleton width="60%" height="16px" />
    <Skeleton width="90%" height="16px" />
    <Skeleton width="40%" height="16px" />
  </div>
);

// CSS for skeleton animation
export const skeletonStyles = `
  @keyframes skeleton-wave {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  .skeleton-wave::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(75deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: skeleton-wave 1.2s linear infinite;
  }
`;
