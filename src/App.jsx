import Navbar from './components/layout/Navbar'; // Double check this path!
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar /> {/* <--- IS THIS HERE? */}
      <Home />
    </div>
  );
}

export default App;