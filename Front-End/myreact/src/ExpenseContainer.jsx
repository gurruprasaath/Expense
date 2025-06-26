import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import History from './History';
import Balancecont from './Balancecont.jsx';
import './style.css';
//import { v4 as uid } from 'uuid';

function ExpenseContainer() {
  const EXPENSE = [];

  const [expenses, setExpenses] = useState(EXPENSE);

  const fetchExpense = async () => {
    try {
      const response = await fetch("http://localhost:3000/Expense");
      const data = await response.json();
      const normalized = data.map((item) => ({
      id: item._id,  
      title: item.title,
      amount: item.amount,
    }));
      setExpenses(normalized);


    } catch (error) {
      console.error('Failed to fetch data.', error);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  const addExpense = async (title, amount) => {
  try {
    const response = await fetch('http://localhost:3000/Expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, amount }),
    });

    if (response.ok) {
      const newItem = await response.json();
      const normalized = {
        id: newItem._id,
        title: newItem.title,
        amount: newItem.amount
      };
      setExpenses(prev => [...prev, normalized]);
    } else {
      console.error("Failed to add expense");
    }
  } catch (error) {
    console.error("Error adding expense:", error);
  }
};

const deleteExpense = async (id) => { 
  try {
    const response = await fetch(`http://localhost:3000/Expense/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setExpenses(prev => prev.filter(exp => exp.id !== id));
    } else {
      console.error("Failed to delete expense");
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
};

  return (
    <div className='expense-container'>
      <h1 className='app-title'>Expense Tracker</h1>
      <Balancecont expense={expenses} />
      <h1>History</h1>
      <History expense={expenses} deleteExpense={deleteExpense} /><br />
      <ExpenseForm func={addExpense} />
    </div>
  );
}

export default ExpenseContainer;
