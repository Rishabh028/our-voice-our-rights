import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Routes from "./Routes";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
