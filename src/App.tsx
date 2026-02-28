import "./App.css";
import Workspace from "@/features/layout/workspace";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Workspace/>
    </ThemeProvider>
  );
}

export default App;
