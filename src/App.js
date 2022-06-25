import React from "react";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./theme/index.js";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
