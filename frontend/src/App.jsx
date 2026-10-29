
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import PlanGenerator from "./pages/PlanGenerator";
import ExerciseLibrary from "./pages/ExerciseLibrary";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        <Header />

        <div className="p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plan-generator" element={<PlanGenerator />} />
            <Route path="/exercise-library" element={<ExerciseLibrary />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
