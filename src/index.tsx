import "@lynx-js/preact-devtools";
import "@lynx-js/react/debug";
import { root } from "@lynx-js/react";
import App from "./App";

// Add this to ensure debug mode
if (__DEV__) {
  console.log("Debug mode is active");
}

root.render(<App />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
