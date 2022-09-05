import "./App.css";
import Login from "./pages/Login";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Login />
      </div>
    </QueryClientProvider>
  );
}

export default App;
