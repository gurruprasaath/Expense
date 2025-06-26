import React,{useState} from 'react'
import './Style.css'
function Expenseitem(props) {
const {title,amount,id}=props.expense
const type= amount > 0 ? "income" : "expense"
const [showToast, setShowToast] = useState(false);

  const handleDelete = () => {
  const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    setShowToast(true);
  
    setTimeout(() => {
      
      setShowToast(false);
      props.deleteExpense(id);
    }, 1500); 
  }
};


if (amount<=0){     
  return (
    
   
    <div>
     
      <div className={`expense-item ${type}`}></div>
      
        
            <div className="cont" >
                
                    <div className='expense-title'>{title}</div>
                
                
                    <div className="col">
                        <div className='expense-amount'>${amount}</div>
                        
                               
<div className='delete-button-overlay'>
              <button onClick={handleDelete} id='delete'>Delete</button>
  {showToast && <div className="toast">Deleted</div>}
            </div>
            </div>
    
    </div>
    
    </div>
  )
}
else {
    return (
    
   
    <div>
     
      <div className={`expense-item ${type}`}></div>
      
        
            <div className="cont1">
                
                    <div className='expense-title'>{title}</div>
                
                
                    <div className="col1">
                        <div className='expense-amount'>${amount}</div>
                        
                               
<div className='delete-button-overlay'>
               <button onClick={handleDelete} id='delete'>Delete</button>
 {showToast && <div className="toast1">Deleted</div>}
            </div>
            </div>
    
    </div>
    
    </div>
  )
}
}

export default Expenseitem