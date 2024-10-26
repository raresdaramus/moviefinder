import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import { Navbar } from './components/navbar';
import { Auth } from './pages/auth';

function App() {

  return (
    <>
     <div>
      <Router>
        <Navbar />
        <Routes>
         <Route path="/" element={<h1>Home</h1>}></Route>
         <Route path="/auth" element={<Auth/>}></Route>
         <Route path="/rated" element={<h1>Rated Page</h1>}></Route>
        </Routes>
      </Router>
     </div>
    </>
  )
}

export default App
