const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const { type } = require('os');
const cors = require('cors')
const app = express();  
app.use(express.json())
app.use(cors())

const PORT =3000;
const expenseSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})
const mongo="mongodb+srv://Gurruprasaathmk:785297Car@cluster0.rkovrc2.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0";
const port = process.env.PORT;
const Expense = mongoose.model('Expense',expenseSchema) 
mongoose.connect(mongo)
.then(()=>{
    console.log("Mongodb connected");
})
.catch((err)=>{
    console.log(`Mongodb not connected: ${err}`)
})

app.get('/Expense',async(req,res)=>{
    try {
    const expenses = await Expense.find();
    res.status(201).json(expenses);
    console.log("Get Method")
    }
    catch (error) {
        console.error('Error saving expense',error)
        res.status(500).json({error:"failed to save"})
    }
    
})

app.post('/Expense', async(req,res)=>{
    try {
        const {title,amount}=req.body;
        const expense = new Expense(
            {title,amount}
        )
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        console.error('Error saving expense',error)
        res.status(500).json({error:"failed to save"})
    }
})
   

app.delete('/Expense/:userID', async (req, res) => {
    const { userID } = req.params;

    try {
        const deleteExpense = await Expense.findByIdAndDelete(userID);

        if (!deleteExpense) {
            return res.status(404).json({ error: "Expense not found" });
        }

        return res.status(200).json({ message: "Deleted successfully", deleted: deleteExpense });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
});

app.listen(PORT,()=>{
    console.log(`server is listening on port ${port}`)
})