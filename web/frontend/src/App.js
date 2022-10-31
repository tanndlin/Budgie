import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import CalendarPage from './pages/CalendarPage';
import ListPage from './pages/ListPage';
import Header from './components/Header';

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
      <div>
        <Header
          {...{
            user,
            setUser,
            bills,
            setBills,
            budgets,
            setBudgets,
          }}
        >
        </Header>

        <Routes>
          <Route path="/" element={<LoginPage {...{
            user,
            setUser,
            bills,
            setBills,
            budgets,
            setBudgets,
          }} />} />

          <Route path="/calendar" element={<CalendarPage {...{
            user,
            setUser,
            bills,
            setBills,
            budgets,
            setBudgets,
          }} />} />

          <Route path="/list" element={<ListPage {...{
            user,
            setUser,
            bills,
            setBills,
            budgets,
            setBudgets,
          }} />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;