import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Layout from "./Layout"; // Layout 컴포넌트

function App() {
  return (
    <Router>
      <AuthProvider> {/* AuthContext 제공 */}
        <Layout /> {/* 페이지 레이아웃 */}
      </AuthProvider>
    </Router>
  );
}

export default App;
