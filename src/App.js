import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionnairePage from './questionpage';
import ResultPage from './resultpage';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<QuestionnairePage />} />
            <Route path="/result" element={<ResultPage />} />
        </Routes>
    </Router>
);

export default App;
