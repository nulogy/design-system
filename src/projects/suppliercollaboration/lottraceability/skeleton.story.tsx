import React from "react";
import { Skeleton, SkeletonText, SkeletonTable, SkeletonCard, skeletonStyles } from "./components/Skeleton";

export default {
  title: "Projects/Supplier Collaboration/Lot traceability/Skeleton Components",
};

export const BasicSkeleton = () => (
  <div style={{ padding: "32px" }}>
    <style>{skeletonStyles}</style>
    <h4 style={{ marginBottom: "24px", fontSize: "18px", fontWeight: "bold" }}>Basic Skeleton Components</h4>

    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <div style={{ marginBottom: "8px", fontWeight: "bold" }}>Basic Skeleton</div>
        <Skeleton width="200px" height="20px" />
      </div>

      <div>
        <div style={{ marginBottom: "8px", fontWeight: "bold" }}>Skeleton with Custom Size</div>
        <Skeleton width="150px" height="30px" borderRadius="8px" />
      </div>

      <div>
        <div style={{ marginBottom: "8px", fontWeight: "bold" }}>Skeleton without Animation</div>
        <Skeleton width="180px" height="16px" animation={false} />
      </div>

      <div>
        <div style={{ marginBottom: "8px", fontWeight: "bold" }}>Multiple Skeleton Lines</div>
        <SkeletonText lines={3} width="250px" />
      </div>
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div style={{ padding: "32px" }}>
    <style>{skeletonStyles}</style>
    <h4 style={{ marginBottom: "24px", fontSize: "18px", fontWeight: "bold" }}>Table Skeleton</h4>

    <div>
      <div style={{ marginBottom: "16px", fontWeight: "bold" }}>Production Records Table Loading</div>
      <SkeletonTable rows={5} columns={6} cellHeight="48px" />
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div style={{ padding: "32px" }}>
    <style>{skeletonStyles}</style>
    <h4 style={{ marginBottom: "24px", fontSize: "18px", fontWeight: "bold" }}>Card Skeleton</h4>

    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
      <SkeletonCard width="300px" height="200px" />
      <SkeletonCard width="250px" height="180px" showAvatar />
      <SkeletonCard width="350px" height="220px" />
    </div>
  </div>
);

export const InTableCells = () => (
  <div style={{ padding: "32px" }}>
    <style>{skeletonStyles}</style>
    <h4 style={{ marginBottom: "24px", fontSize: "18px", fontWeight: "bold" }}>Skeleton in Table Cells</h4>

    <div style={{ border: "1px solid #e4e7eb", borderRadius: "8px", padding: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Table Header */}
        <div style={{ display: "flex", gap: "16px", padding: "8px 0", borderBottom: "1px solid #e4e7eb" }}>
          <div style={{ width: "120px" }}>
            <div style={{ fontSize: "14px", fontWeight: "bold" }}>Date</div>
          </div>
          <div style={{ width: "100px" }}>
            <div style={{ fontSize: "14px", fontWeight: "bold" }}>Quantity</div>
          </div>
          <div style={{ width: "120px" }}>
            <div style={{ fontSize: "14px", fontWeight: "bold" }}>Lot Code</div>
          </div>
          <div style={{ width: "100px" }}>
            <div style={{ fontSize: "14px", fontWeight: "bold" }}>Status</div>
          </div>
        </div>

        {/* Table Rows with Skeletons */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} style={{ display: "flex", gap: "16px", padding: "8px 0", alignItems: "center" }}>
            <div style={{ width: "120px" }}>
              <Skeleton width="80px" height="14px" />
            </div>
            <div style={{ width: "100px" }}>
              <Skeleton width="60px" height="14px" />
            </div>
            <div style={{ width: "120px" }}>
              <Skeleton width="100px" height="14px" />
            </div>
            <div style={{ width: "100px" }}>
              <Skeleton width="70px" height="14px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const MixedContent = () => (
  <div style={{ padding: "32px" }}>
    <style>{skeletonStyles}</style>
    <h4 style={{ marginBottom: "24px", fontSize: "18px", fontWeight: "bold" }}>Mixed Content Loading</h4>

    <div style={{ border: "1px solid #e4e7eb", borderRadius: "8px", padding: "24px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Header with avatar and text */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Skeleton width="40px" height="40px" borderRadius="50%" />
          <div>
            <Skeleton width="150px" height="16px" />
            <Skeleton width="100px" height="12px" />
          </div>
        </div>

        {/* Content lines */}
        <SkeletonText lines={2} width="200px" />

        {/* Action buttons */}
        <div style={{ display: "flex", gap: "8px" }}>
          <Skeleton width="80px" height="32px" borderRadius="8px" />
          <Skeleton width="60px" height="32px" borderRadius="8px" />
        </div>
      </div>
    </div>
  </div>
);
