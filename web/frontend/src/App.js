import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import CalendarPage from './pages/CalendarPage';
import ListPage from './pages/ListPage';

function App() {
  const [user, setUser] = React.useState(null);
  const [bills, setBills] = React.useState([]);
  const [budgets, setBudgets] = React.useState([
    {
      name: 'Clothes',
      spent: 10,
      total: 200,
    },
    {
      name: 'Groceries',
      spent: 100,
      total: 200,
    },
    {
      name: 'Gas',
      spent: 80,
      total: 100,
    },
    {
      name: 'Fuck You',
      spent: 100,
      total: 100,
    },
    {
      name: 'Fuck You',
      spent: 100,
      total: 100,
    },
    {
      name: 'Fuck You',
      spent: 100,
      total: 100,
    },
  ]);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage
          user={user}
          setUser={setUser}
        />} />

        <Route path="/calendar" element={<CalendarPage
          user={user}
          setUser={setUser}
          bills={bills}
          setBills={setBills}
          budgets={budgets}
          setBudgets={setBudgets}
        />} />

        <Route path="/list" element={<ListPage
          user={user}
          setUser={setUser}
          bills={bills}
          setBills={setBills}
          budgets={budgets}
          setBudgets={setBudgets}
        />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;