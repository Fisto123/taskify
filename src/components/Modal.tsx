// src/components/modal.tsx
import React from "react";

type ModalProps = {
  visible: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  footer?: React.ReactNode;
};

export default function Modal({
  visible,
  title,
  children,
  onClose,
  footer,
}: ModalProps) {
  if (!visible) return null;

  return (
    <view
      style={{
        position: "fixed",
        left: "0px",
        top: "0px",
        right: "0px",
        bottom: "0px",
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
      bindtap={() => {}}
    >
      <view
        style={{
          width: "92%",
          maxWidth: "420px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
        bindtap={(e: any) => {
          // prevent backdrop click bubbling
          e.stopPropagation?.();
        }}
      >
        {!!title && (
          <text
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "12px",
              color: "#1b1b1b",
            }}
          >
            {title}
          </text>
        )}

        <view style={{ marginBottom: "12px" }}>{children}</view>

        <view
          style={{
            marginTop: "8px",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          <view
            bindtap={onClose}
            style={{
              padding: "12px",
              borderRadius: "10px",
              backgroundColor: "transparent",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 40,
            }}
          >
            <text style={{ color: "#666" }}>Close</text>
          </view>

          {footer}
        </view>
      </view>
    </view>
  );
}
