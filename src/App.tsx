import "./App.css";
import MainLayout from "./layouts/main";
import AppRouter from "./routes/app-routes";

function App() {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
}

export default App;
