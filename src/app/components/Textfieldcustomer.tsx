import React, { useContext } from 'react'
import { AllContext } from './Context';

type TextfieldcustomerProps={
  customerName:string;
  setCustomerName:React.Dispatch<React.SetStateAction<string>>;
}


const Textfieldcustomer = () => {
  const { customerName,setCustomerName}:TextfieldcustomerProps=useContext(AllContext);
  return (
    <input type="text" className="bg-[#f3f4f6] border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Customer name" value={customerName} onChange={(e)=>setCustomerName(e.target.value)} required />
  )
}

export default Textfieldcustomer