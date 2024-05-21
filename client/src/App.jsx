import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { ShortenUrlContainer } from './ShortenUrlContainer';
import { CheckUrlContainer } from './CheckUrlContainer';

function App() {
  axios.defaults.baseURL = 'http://localhost:3005';

  return (
    <>
      <Routes>
        <Route path="/" element={<ShortenUrlContainer/>} />
        <Route path="/:redirectURLCode" element={<ShortenUrlContainer/>} />
        <Route path="/url/:shortURLCode" element={<CheckUrlContainer/>} />
        <Route path="/url/" element={<CheckUrlContainer/>} />
      </Routes>
    </>
  )
}

export default App
