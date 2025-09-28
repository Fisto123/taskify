// src/pages/Home.tsx
import { root, useMemo, useState } from "@lynx-js/react";
import TaskCard from "../components/TaskCard";
import Modal from "../components/Modal";
import { uid } from "../utils/uid";
import { EmptyCard } from "../components/EmptyCard";

type Task = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "pending" | "completed";
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [q, setQ] = useState("");

  // --- Add
  const [showAdd, setShowAdd] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [addDesc, setAddDesc] = useState("");

  // --- Edit
  const [showEdit, setShowEdit] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // --- Delete
  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState<Task | null>(null);

  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  // ---- Derived
  const counts = useMemo(() => {
    const p = tasks.filter((t) => t.status === "pending").length;
    const c = tasks.filter((t) => t.status === "completed").length;
    return { p, c, all: tasks.length };
  }, [tasks]);

  const filtered = useMemo(() => {
    const qx = q.trim().toLowerCase();
    let list = tasks;
    if (filter === "pending") list = list.filter((t) => t.status === "pending");
    if (filter === "completed")
      list = list.filter((t) => t.status === "completed");
    if (!qx) return list;
    return list.filter(
      (t) =>
        t.title.toLowerCase().includes(qx) ||
        t.description.toLowerCase().includes(qx)
    );
  }, [tasks, q, filter]);

  // ---- Handlers
  const openAdd = () => {
    setAddTitle("");
    setAddDesc("");
    setShowAdd(true);
  };

  const addTask = () => {
    if (!addTitle.trim()) return;
    const now = new Date();
    const t: Task = {
      id: uid(),
      title: addTitle.trim(),
      description: addDesc.trim(),
      date: now.toLocaleString(),
      status: "pending",
    };
    setTasks((s) => [t, ...s]);
    setShowAdd(false);
  };

  const startEdit = (t: Task) => {
    setEditTask(t);
    setEditTitle(t.title);
    setEditDesc(t.description);
    setShowEdit(true);
  };

  const saveEdit = () => {
    if (!editTask) return;
    setTasks((s) =>
      s.map((t) =>
        t.id === editTask.id
          ? { ...t, title: editTitle.trim(), description: editDesc.trim() }
          : t
      )
    );
    setShowEdit(false);
    setEditTask(null);
  };

  const askDelete = (t: Task) => {
    setToDelete(t);
    setShowDelete(true);
  };
  const doDelete = () => {
    if (!toDelete) return;
    setTasks((s) => s.filter((t) => t.id !== toDelete.id));
    setShowDelete(false);
    setToDelete(null);
  };

  const toggle = (t: Task) => {
    setTasks((s) =>
      s.map((x) =>
        x.id === t.id
          ? { ...x, status: x.status === "pending" ? "completed" : "pending" }
          : x
      )
    );
  };

  // ---- UI
  return (
    <view
      style={{
        backgroundColor: "#f4f6f9",
        height: "100%",
      }}
    >
      {/* Header */}
      <view
        style={{
          padding: "30px 16px",
          backgroundColor: "#111827",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <text
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Task Manager
        </text>
      </view>

      {/* Filters */}
      <view
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          marginTop: "12px",
          marginLeft: 50,
        }}
      >
        <FilterPill
          label={`All (${counts.all})`}
          active={filter === "all"}
          onPress={() => setFilter("all")}
        />
        <FilterPill
          label={`Pending (${counts.p})`}
          active={filter === "pending"}
          color="#ffb020"
          onPress={() => setFilter("pending")}
        />
        <FilterPill
          label={`Completed (${counts.c})`}
          active={filter === "completed"}
          color="#2bb673"
          onPress={() => setFilter("completed")}
        />
      </view>

      {/* List (scrollable) */}
      <view style={{ width: "100%" }}>
        <scroll-view
          scroll-orientation="vertical"
          style={{
            paddingLeft: "5px",
            borderRadius: "10px",
            height: "700px",
          }}
        >
          <view style={{ padding: "20px", paddingTop: "8px" }}>
            {filtered.length === 0 ? (
              <EmptyCard onAdd={openAdd} />
            ) : (
              filtered.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  onEdit={startEdit}
                  onDelete={askDelete}
                  onToggle={toggle}
                />
              ))
            )}
          </view>
        </scroll-view>
      </view>

      {/* <scroll-view
        scroll-orientation="horizontal"
        style={{
          width: "calc(100% - 10px)",
          height: "100px",
          paddingLeft: "5px",
          borderRadius: "10px",
        }}
      >
      
      </scroll-view> */}

      {/* Floating FAB */}
      <view
        bindtap={openAdd}
        style={{
          position: "absolute",
          bottom: "24px",
          right: "24px",
          width: "56px",
          height: "56px",
          borderRadius: "28px",
          backgroundColor: "#111827",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        <image
          src={require("../assets/plus_icon.png")}
          style={{ width: "28px", height: "28px" }}
        />
      </view>

      {/* Add Modal */}
      <Modal
        visible={showAdd}
        title="Add Task"
        onClose={() => setShowAdd(false)}
        footer={
          <view
            bindtap={addTask}
            style={{
              padding: "12px",
              borderRadius: "10px",
              backgroundColor: "#111827",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <text style={{ color: "#fff", fontWeight: "bold" }}>Save</text>
          </view>
        }
      >
        <TaskForm
          title={addTitle}
          desc={addDesc}
          setTitle={setAddTitle}
          setDesc={setAddDesc}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        visible={showEdit}
        title="Edit Task"
        onClose={() => setShowEdit(false)}
        footer={
          <view
            bindtap={saveEdit}
            style={{
              padding: "12px",
              borderRadius: "10px",
              backgroundColor: "#111827",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <text style={{ color: "#fff", fontWeight: "bold" }}>Update</text>
          </view>
        }
      >
        <TaskForm
          title={editTitle}
          desc={editDesc}
          setTitle={setEditTitle}
          setDesc={setEditDesc}
        />
      </Modal>

      {/* Delete Confirm */}
      <Modal
        visible={showDelete}
        title="Delete Task"
        onClose={() => setShowDelete(false)}
        footer={
          <view
            bindtap={doDelete}
            style={{
              padding: "12px",
              borderRadius: "10px",
              backgroundColor: "#ef4444",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <text style={{ color: "#fff", fontWeight: "bold" }}>Delete</text>
          </view>
        }
      >
        <text style={{ color: "#374151" }}>
          Are you sure you want to delete{" "}
          <text style={{ fontWeight: "bold" }}>{toDelete?.title}</text>?
        </text>
      </Modal>
    </view>
  );
}

/* ---------- Task Form ---------- */
function TaskForm({
  title,
  desc,
  setTitle,
  setDesc,
}: {
  title: string;
  desc: string;
  setTitle: (v: string) => void;
  setDesc: (v: string) => void;
}) {
  return (
    <view>
      <text style={{ fontSize: "12px", color: "#6b7280" }}>Title</text>
      <view
        style={{
          marginTop: "6px",
          marginBottom: "12px",
          borderWidth: "1px",
          borderColor: "#e5e7eb",
          borderRadius: "10px",
          padding: "10px 12px",
          backgroundColor: "#fff",
        }}
      >
        <input
          placeholder={title || "Task title"}
          bindinput={(res: any) => setTitle(res.detail.value)}
          style={{ fontSize: "14px" }}
        />
      </view>

      <text style={{ fontSize: "12px", color: "#6b7280" }}>Description</text>
      <view
        style={{
          marginTop: "6px",
          borderWidth: "1px",
          borderColor: "#e5e7eb",
          borderRadius: "10px",
          padding: "10px 12px",
          backgroundColor: "#fff",
        }}
      >
        <input
          placeholder={desc || "Short description"}
          bindinput={(res: any) => setDesc(res.detail.value)}
          style={{ fontSize: "14px" }}
        />
      </view>
    </view>
  );
}

/* ---------- Filter Pill ---------- */
function FilterPill({
  label,
  onPress,
  active,
  color,
}: {
  label: string;
  onPress: () => void;
  active?: boolean;
  color?: string;
}) {
  return (
    <view
      bindtap={onPress}
      style={{
        padding: "8px 12px",
        borderRadius: "999px",
        backgroundColor: active
          ? color
            ? `${hexToTint(color, 0.15)}`
            : "#111827"
          : "#fff",
        borderWidth: "1px",
        borderColor: active ? color || "#111827" : "#e5e7eb",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <text style={{ color: active ? (color ? color : "#fff") : "#111827" }}>
        {label}
      </text>
    </view>
  );
}

function hexToTint(hex: string, alpha = 0.15) {
  const c = hex.replace("#", "");
  const bigint = parseInt(c, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}
