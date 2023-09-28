'use client'
import React ,{useContext, useState} from "react";
import Recursion from "./Recursion";
import { AllContext } from "./Context"

interface itemsDataProp{
  id: number;
  qty:number;
  price:number;
  total:number;
  item:string;
}

interface TableProps{
  itemsData:{ [key: string]: itemsDataProp };
  setItemsData:React.Dispatch<React.SetStateAction<{[key: string]: itemsDataProp}>>
}

const Table = () => {
  

  const [inputValues, setInputValues] = useState<string[]>([""]); // State variable for input values

  const { itemsData, setItemsData}:TableProps=useContext(AllContext)


  const addInput = () => {
    setInputValues([...inputValues, ""]);
  };


  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-[100px] font-bold">
        <span className="w-[460px]">ITEM</span>
        <span>QTY</span>
        <span>PRICE</span>
        <span>Action</span>
      </div>
      <div>
        <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      {inputValues.map((input,index)=>(
        <div key={index}><Recursion index={index} itemsData={itemsData} setItemsData={setItemsData} /></div>
      ))
      
      }
      <div className="mt-[30px] ">
      <button onClick={addInput} className="bg-blue-500 p-2 px-[15px] text-white rounded" type="button">Add Item</button>
      </div>
    </div>
  );
};

export default Table;
