'use client';
import React, { useEffect, useState } from 'react'

interface itemsDataProp{
  id: number;
  qty:number;
  price:number;
  total:number;
  item:string;
}


interface RecursionProps{
  index:number;
  itemsData:{ [key: string]: itemsDataProp };
  setItemsData:React.Dispatch<React.SetStateAction<{
    [key: string]: itemsDataProp;
}>>;
}



const Recursion = ({ index, itemsData, setItemsData }: RecursionProps) => {


  const[showBox,setShowBox]=useState<boolean>(true);

  

  const handleInputChange = (index: number, field: string, value: string | number) => {
    setItemsData((prevItems: any) => {
      const updatedItems = { ...prevItems };

      if (updatedItems[index]) {
        updatedItems[index][field] = value;

        // Calculate the total for the current item
        if (field === 'price' || field === 'qty') {
          const price = updatedItems[index].price || 0;
          const qty = updatedItems[index].qty || 0;
          updatedItems[index].total = price * qty;
        }
      } else {
        updatedItems[index] = { [field]: value };
      }

      return updatedItems;
    });
  };
  
  const handleDelete = (index: number) => {
    setItemsData((prevItems:any) => {
      const updatedItems = { ...prevItems };
      
      // Check if the item at the given index exists in the previous items
      if (updatedItems[index]) {
        // Delete the item at the specified index
        delete updatedItems[index];
      }
  
      return updatedItems;
    });
  
    setShowBox(!showBox);
    console.log("Deleted key: ", index);
  };

  return (
    <div>
      {showBox?
    <div className="flex flex-row gap-[25px] mb-3 ">
      
        <span className="w-[490px]">
          <input
            type="text"
            className="bg-[#f3f4f6] border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Item name" name="item"  onChange={(e) => handleInputChange(index, "item", e.target.value)}
            required
          />
        </span>
        <span className="w-[120px] ml-3">
          <input
            type="number"
            className="bg-[#f3f4f6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="QTY" onChange={(e) => handleInputChange(index, "qty", parseInt(e.target.value))}
            required
          />
        </span>
        <span className="w-[120px]">
          <input
            type="number"
            className="bg-[#f3f4f6] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Price"
            required onChange={(e) => handleInputChange(index, "price", parseInt(e.target.value))}
          />
        </span>


        <span className="bg-red-500 p-2 rounded ml-[30px] cursor-pointer" onClick={()=>handleDelete(index)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              // stroke-linecap="round"
              // stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              className="text-white"
            />
          </svg>
        </span>
      </div>
      :""
}
      </div>
  )
}

export default Recursion