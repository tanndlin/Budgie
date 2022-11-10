import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import CalendarPage from './pages/CalendarPage';
import Header from './components/Header';

function App() {
  const [user, setUser] = React.useState(null);
  const [bills, setBills] = React.useState([]);
  const [budgets, setBudgets] = React.useState([]);
  const [extras, setExtras] = React.useState([]);

  const props = {
    user,
    setUser,
    bills,
    setBills,
    budgets,
    setBudgets,
    extras,
    setExtras,
  };

  const headerProps = (shouldShowNav) => ({
    ...props, showNav: shouldShowNav,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className='h-screen'>
            <Header
              {...headerProps(false)}
            />
            <LoginPage {...props} />
          </div>
        } />

        <Route path="/calendar" element={

          <div className='h-screen'>
            <Header
              {...headerProps(true)}
            />
            <CalendarPage {...props} />
          </div>
        } />
      </Routes >
    </BrowserRouter >
  );
}

export default App;