export function EmptyCard({
  onAdd,
  message,
}: {
  onAdd: () => void;
  message: string;
}) {
  return (
    <view
      style={{
        borderRadius: "20px",
        padding: "32px 20px",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      }}
    >
      <text
        style={{
          color: "#f0f9ff",
          marginBottom: "20px",
          fontSize: "16px",
          textAlign: "center",
        }}
      >
        {message}
      </text>

      <view
        bindtap={onAdd}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "14px 28px",
          borderRadius: "999px",
          backgroundImage: "linear-gradient(90deg, #2563eb, #1e40af)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          + Create Task
        </text>
      </view>
    </view>
  );
}
