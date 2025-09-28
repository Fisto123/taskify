import React from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "pending" | "completed";
};

type Props = {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: (t: Task) => void;
  onToggle: (t: Task) => void;
};

const EDIT_ICON = require("../assets/edit_icon.png");
const DELETE_ICON = require("../assets/delete_icon.png");

const STATUS_COLOR: Record<Task["status"], string> = {
  pending: "#ffb020",
  completed: "#2bb673",
};

export default function TaskCard({ task, onEdit, onDelete, onToggle }: Props) {
  return (
    <view
      style={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        borderLeftWidth: "6px",
        borderLeftColor: STATUS_COLOR[task.status],
        position: "relative",
        height: "auto",
      }}
    >
      <view style={{ paddingRight: "10px", marginTop: 50 }}>
        <text
          style={{ fontSize: "16px", fontWeight: "bold", color: "#1a1a1a" }}
        >
          {task.title}
        </text>
        <text style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
          {task.description}
        </text>
        <text style={{ fontSize: "12px", color: "#999", marginTop: "8px" }}>
          {task.date}
        </text>
        <view
          style={{
            marginTop: "8px",
            alignSelf: "flex-start",
            backgroundColor: STATUS_COLOR[task.status],
            padding: "4px 10px",
            borderRadius: "999px",
          }}
        >
          <text style={{ color: "#fff", fontSize: "12px" }}>{task.status}</text>
        </view>
      </view>

      <view
        style={{
          position: "absolute",
          right: "0",
          top: 0,
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          padding: 30,
        }}
      >
        <view
          bindtap={() => onEdit(task)}
          style={{
            padding: "8px",
            borderRadius: "12px",
            backgroundColor: "#f5f7fb",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <image src={EDIT_ICON} style={{ width: "22px", height: "22px" }} />
        </view>

        <view
          bindtap={() => onDelete(task)}
          style={{
            padding: "8px",
            borderRadius: "12px",
            backgroundColor: "#fff0f0",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <image src={DELETE_ICON} style={{ width: "22px", height: "22px" }} />
        </view>
      </view>

      <view
        bindtap={() => onToggle(task)}
        style={{
          marginTop: "12px",
          padding: "12px",
          borderRadius: "10px",
          backgroundColor: task.status === "completed" ? "#e6f8f0" : "#fff7e6",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <text
          style={{
            color: task.status === "completed" ? "#2bb673" : "#b77800",
            fontWeight: "bold",
          }}
        >
          {task.status === "completed"
            ? "Mark as Pending"
            : "Mark as Completed"}
        </text>
      </view>
    </view>
  );
}
