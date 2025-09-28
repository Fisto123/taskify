import React from "react";

export default function NavBar({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <view
      style={{
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</text>
      {right ? <view>{right}</view> : null}
    </view>
  );
}
