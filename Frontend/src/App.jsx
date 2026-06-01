import { Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<h1>About Page</h1>} />
    </Routes>
  )
}

export default App
