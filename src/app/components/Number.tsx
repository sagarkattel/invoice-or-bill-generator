import React, { useContext } from 'react'
import { AllContext } from './Context';

type NumberProps = {
  invoiceNumber:number;
  setInvoiceNumber:React.Dispatch<React.SetStateAction<Number>>;
}

const Number = () => {
  const {invoiceNumber,setInvoiceNumber}:NumberProps=useContext(AllContext);
  return (
    <input type="number" className="bg-[#f3f4f6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="231" value={invoiceNumber} onChange={(e)=>
      {
        const inputValue = parseInt(e.target.value);
        if (inputValue > 0 || e.target.value === "") {
          setInvoiceNumber(inputValue);
        }
        else{
          alert("Invoice no cannot be negative or Zero");
        }
        }
       } required />
  )
}

export default Number