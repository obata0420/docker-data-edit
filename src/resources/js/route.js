import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Example from './components/Example';
import Home from './pages/Schedule';
import ScheduleEdit from './pages/ScheduleEdit';

function App() {
    return (
        <Routes>
            <Route path="/example" element={<Example />} />
            <Route path='/' element={<Home />} />
            <Route path="/schedule/edit/:id" element={<ScheduleEdit />} />
        </Routes>
    );
}

ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app'))
