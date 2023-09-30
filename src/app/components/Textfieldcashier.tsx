import React, { useContext } from 'react'
import { AllContext } from './Context';


type TextfieldcashierProps = {
  cashierName:string;
  setCashierName:React.Dispatch<React.SetStateAction<string>>;
}

const Textfieldcashier = () => {
  const {cashierName,setCashierName}:TextfieldcashierProps=useContext(AllContext);
  return (
    <input type="text" className="bg-[#f3f4f6] border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cashier name" value={cashierName} onChange={(e)=>setCashierName(e.target.value)}required />
  )
}

export default Textfieldcashier