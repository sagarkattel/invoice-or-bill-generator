'use client';

import React, { useContext, useEffect, useState } from 'react'
import Number from '../components/Number'
import {now} from '../utils/Date';
import Textfieldcashier from '../components/Textfieldcashier';
import Textfieldcustomer from '../components/Textfieldcustomer';
import Table from '../components/Table';
import { AllContext } from '../components/Context';
import Detail from '../components/Detail';

interface InoviceProps{
  invoiceNumber:number;
  total:number;
  taxrate:number;
  setTaxrate:React.Dispatch<React.SetStateAction<number>>;
  discountrate:number;
  setDiscountrate:React.Dispatch<React.SetStateAction<number>>;
  tax:number;
  setTax:React.Dispatch<React.SetStateAction<number>>;
  discount:number;
  setDiscount:React.Dispatch<React.SetStateAction<number>>;
  grandTotal:number;
  setGrandtotal:React.Dispatch<React.SetStateAction<number>>;
}

const Invoice = () => {

  const {invoiceNumber,total,taxrate,setTaxrate,discountrate,setDiscountrate,tax,setTax,discount,setDiscount,grandTotal,setGrandtotal}:InoviceProps=useContext(AllContext);



  setTax((taxrate)/100*total);
  setDiscount((discountrate)/100*total);
  setGrandtotal(total+tax-discount)




  const {setOpen}=useContext(AllContext);





  return (
    <div className='bg-[#eeeeee] h-auto flex justify-center items-center'>
      <form action="">
      <div className='h-auto w-[990px] bg-[#ffffff] rounded-xl border-[1.5px] border-gray-300 flex flex-col px-6 pt-10 my-[90px]'>
        {<Detail />}
        <div className='flex flex-row items-center'>
          <div className='flex flex-row items-center gap-2'>
            <span className='font-bold'>Current Date:</span>
            <span>{now}</span>
          </div>
          <div className='ml-auto flex flex-row items-center gap-2'>
            <span className='font-bold'>Invoice #:</span>
            <span className='w-[120px]'><Number /></span>
          </div>
        </div>
        <div>
            
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>

          <div className='flex justify-center font-bold text-2xl'>Invoice</div>
          <div className='flex flex-row mt-3'>
            <div className='flex flex-col gap-2'>
              <span className='font-bold '>Cashier:</span>
              <span className='w-[400px]'><Textfieldcashier /></span>
            </div>
            <div className='ml-auto flex flex-col gap-2'>
            <span className='font-bold '>Customer:</span>
            <span className='w-[400px]'><Textfieldcustomer /></span>
            </div>
          </div>

          <div className='mt-[60px] w-full h-auto'>
            <Table />
          </div>
          <div className='flex flex-col mt-7 ml-auto gap-4'>

            <div className='flex flex-col gap-6 mb-7'>

              <div className='flex flex-col gap-3'>
              <span className='font-bold'>Tax rate:</span>
              <span><input type="number" className="bg-[#f3f4f6] border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tax rate" required value={taxrate} onChange={(e)=>setTaxrate(parseInt(e.target.value))}/></span>
              </div>

              <div className='flex flex-col gap-3'>
              <span className='font-bold'>Discount rate:</span>
              <span><input type="number" className="bg-[#f3f4f6] border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Discount rate" required onChange={(e)=>setDiscountrate(parseInt(e.target.value))} value={discountrate}/></span>
              </div>

            </div>


            <div className='flex flex-row gap-[300px]'>
              <span className='font-bold'>Subtotal:</span>
              <span className='ml-auto'>{total}</span>
            </div>

            <div className='flex flex-row gap-[300px]'>
            <span className='font-bold'>Discount:</span>
              <span className='ml-auto'>({discountrate}%) {discount}</span>
            </div>

            <div className='flex flex-row gap-[300px]'>
            <span className='font-bold'>Tax:</span>
              <span className='ml-auto'>({taxrate}%) {tax}</span>
            </div>

            <div>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />
            </div>



            <div className='flex flex-row gap-[300px]'>
            <span className='font-bold'>Total:</span>
              <span className='ml-auto'>{grandTotal}</span>
            </div>

            <div className='ml-auto mb-10'>
              <button type="button" className="bg-blue-500 p-2 
              px-[15px] text-white rounded" 
              onClick={setOpen}>Review Invoice</button></div>
            </div>

          </div>



          
          </form>
      </div>
  )
}

export default Invoice