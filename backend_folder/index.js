const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();  

// Middleware
app.use(express.json());
app.use(cors());

// Port
const PORT = process.env.PORT || 3000;

// MongoDB connection
const mongo = process.env.MONGO_URL || "mongodb+srv://Gurruprasaathmk:785297Car@cluster0.rkovrc2.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongo)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB not connected:", err);
  });

// Mongoose Schema & Model
const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Routes

// Get all expenses
app.get('/Expense', async (req, res) => {
  try {
    const expenses = await Expense.find();
    console.log("📥 GET /Expense called");
    res.status(200).json(expenses);
  } catch (error) {
    console.error('❌ Error fetching expenses:', error.message);
    res.status(500).json({ error: "failed to fetch expenses" });
  }
});

// Create a new expense
app.post('/Expense', async (req, res) => {
  try {
    const { title, amount } = req.body;

    // Validate input
    if (!title || amount === undefined) {
      return res.status(400).json({ error: "Title and Amount are required" });
    }

    const expense = new Expense({ title, amount });
    await expense.save();

    console.log("✅ Expense saved:", expense);
    res.status(201).json(expense);

  } catch (error) {
    console.error("❌ Failed to save expense:", error.message);
    res.status(500).json({ error: "failed to save", details: error.message });
  }
});

// Delete an expense by ID
app.delete('/Expense/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    const deleted = await Expense.findByIdAndDelete(userID);

    if (!deleted) {
      return res.status(404).json({ error: "Expense not found" });
    }

    console.log("🗑️ Expense deleted:", deleted);
    res.status(200).json({ message: "Deleted successfully", deleted });

  } catch (err) {
    console.error("❌ Delete error:", err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
