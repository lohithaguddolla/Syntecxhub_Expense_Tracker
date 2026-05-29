import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const inputRef = useRef(null);

  // FETCH mock API data
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { id: 1, title: "Food", amount: 200 },
        { id: 2, title: "Travel", amount: 500 }
      ];
      setExpenses(data);
    };

    fetchData();

    // autofocus input
    inputRef.current.focus();
  }, []);

  // ADD expense
  const addExpense = useCallback(() => {
    if (!title || !amount) return;

    const newExpense = {
      id: Date.now(),
      title,
      amount: Number(amount)
    };

    setExpenses((prev) => [...prev, newExpense]);

    setTitle("");
    setAmount("");

    inputRef.current.focus();
  }, [title, amount]);

  // DELETE expense
  const deleteExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  }, []);

  // TOTAL calculation (optimized)
  const total = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  return (
    <div className="container">
      <h1>Expense Tracker 💰</h1>

      <input
        ref={inputRef}
        type="text"
        placeholder="Expense Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addExpense}>Add Expense</button>

      <h2>Total: ₹{total}</h2>

      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.title} - ₹{exp.amount}
            <button onClick={() => deleteExpense(exp.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
