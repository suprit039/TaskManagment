
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

// Dashboard Component (combines list and form)
const Dashboard = () => {
    const { logout, user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow mb-8">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Task Manager</h1>
                    <div className="flex items-center gap-4">
                        <span>Welcome, {user?.username}</span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4">
                <div className="mb-8 p-6 bg-white rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
                    <TaskForm />
                </div>
                <TaskList />
            </div>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
