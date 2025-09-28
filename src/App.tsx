import React, { useState } from "react";
import Home from "./screens/Home";
import "./app.css";

export default function App() {
  const [route, setRoute] = useState<{ name: string; params: any }>({
    name: "home",
    params: {},
  });

  return (
    <view style={{ backgroundColor: "#fff", height: "100%" }}>
      {route.name === "home" && <Home />}
    </view>
  );
}
