import "./App.css";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import LeftSidebar from "./layout/left-sidebar";

function App() {
  return (
    <SidebarProvider>
      <LeftSidebar/>
      <main>
        <SidebarTrigger/>
      </main>
    </SidebarProvider>
  );
}

export default App;
