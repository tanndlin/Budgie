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
  const [budgets, setBudgets] = React.useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div className='h-screen'>
            <Header
              {...{
                user,
                setUser,
                bills,
                setBills,
                budgets,
                setBudgets,
                showNav: false,
              }}
            />
            <LoginPage {...{
              user,
              setUser,
              bills,
              setBills,
              budgets,
              setBudgets,
            }} />
          </div>
        } />

        <Route path="/calendar" element={

          <div className='h-screen'>
            <Header
              {...{
                user,
                setUser,
                bills,
                setBills,
                budgets,
                setBudgets,
                showNav: true,
              }}
            />
            <CalendarPage {...{
              user,
              setUser,
              bills,
              setBills,
              budgets,
              setBudgets,
            }} />
          </div>
        } />

        <Route path="/list" element={
          <divc className='h-screen'>
            <Header
              {...{
                user,
                setUser,
                bills,
                setBills,
                budgets,
                setBudgets,
                showNav: true,
              }}
            />
            <ListPage {...{
              user,
              setUser,
              bills,
              setBills,
              budgets,
              setBudgets,
            }} />
          </divc>
        } />
      </Routes >
    </BrowserRouter >
  );
}

export default App;