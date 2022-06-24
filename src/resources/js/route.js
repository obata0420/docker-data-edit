import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Example from './components/Example';
import Home from './pages/Home';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/example" element={<Example />} />
        </Routes>
    );
}

ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app'))
