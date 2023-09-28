'use client';
import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AllContext } from "./Context";
import jsPDF from "jspdf";
import { now } from "../utils/Date";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface itemsDataProp{
  id: number;
  qty:number;
  price:number;
  total:number;
  item:string;
}


interface DetailProp{
  handleOpen:() => void;
  open:boolean;
  setOpen:React.Dispatch<React.SetStateAction<boolean>>;
  invoiceNumber:number;
  cashierName:string;
  customerName:string;
  total:number;
  tax:number;
  discount:number;
  grandTotal:number;
  itemsData:{ [key: string]: itemsDataProp };
}

 
export default function Detail() {




const {handleOpen,open,invoiceNumber, cashierName, customerName,total, tax,discount,grandTotal, itemsData}:DetailProp=useContext(AllContext);



const itemsArray = Object.values(itemsData);


const showToastMessage = () => {
  toast.error('Fill in all the blanks before downloading the PDF !', {
    position: toast.POSITION.TOP_RIGHT
});
};




const handleDownload=()=>{

  // Check if any fields in the itemsArray are empty
  const hasEmptyFields = itemsArray.some((item:itemsDataProp) => (
    !item.item || !item.qty || !item.price || !item.total
  ));

  if (hasEmptyFields || !invoiceNumber || !cashierName || !customerName) {
    showToastMessage();
    return; 
  }

  const pageWidth = 150; 
  const pageHeight = 210; 

  const pdf = new jsPDF({
    unit: 'mm',
    format: [pageWidth, pageHeight], 
  });


  pdf.setFont('courier');

  const content = `

                  INVOICE
                  -------


Date:                          ${now}
Invoice Number:                ${invoiceNumber}
Cashier:                       ${cashierName}
Customer:                      ${customerName}

------------------------------------------
ITEM         QTY     PRICE       AMOUNT
------------------------------------------
${itemsArray.map((item:itemsDataProp) => `${item.item.padEnd(15)} ${item.qty.toString().padEnd(6)} ${item.price.toString().padEnd(10)} ${item.total.toString()}`).join("\n")}

------------------------------------------
Subtotal:              ${total}
Discount:              ${discount}
Tax:                   ${tax}
------------------------------------------
Total:                 ${grandTotal}
  `;


  pdf.text(content, 5, 5);

  pdf.save("invoice.pdf");

}
  return (
        <>
          <Dialog
            open={open}
            handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
            className="w-[450px] ml-[450px] mt-[30px]  h-auto border-2 bg-red-400 p-3"
          >
            <DialogHeader className="justify-center font-bold">Invoice</DialogHeader>
            <DialogBody >
              <ToastContainer />
              <div className="flex flex-col">
                <div className="flex flex-row gap-9">
                    <span className="font-bold">Invoice Number:</span>
                    <span >{invoiceNumber}</span>
                </div>

                <div className="flex flex-row gap-9">
                    <span className="font-bold">Cashier:</span>
                    <span className="ml-[60px]">{cashierName}</span>
                </div>

                <div className="flex flex-row gap-9">
                    <span className="font-bold">Customer:</span>
                    <span className="ml-[44px]">{customerName}</span>
                </div>

                <div>
            <hr className="h-px my-3 bg-gray-500 border-0 dark:bg-gray-700" />
            </div>

            <div className="flex flex-row gap-10 font-bold">
                <span className="w-[120px]">ITEM</span>
                <span>QTY</span>
                <span>PRICE</span>
                <span>AMOUNT</span>
            </div>

            <div>
            <hr className="h-px my-3 bg-gray-500 border-0 dark:bg-gray-700" />
            </div>
            
              {itemsArray.map((item:itemsDataProp, index:number) => (
                <div className="flex flex-row gap-10" key={index}>
                  <span className="w-[120px]">{item.item}</span>
                  <span  className="w-[50px] ml-3">{item.qty}</span>
                  <span className="w-[50px] ml-[-20px]">{item.price}</span>
                  <span className="w-[50px] justify-center">{item.total}</span>
                </div>
              ))}

            <div>
            <hr className="h-px my-3 bg-gray-500 border-0 dark:bg-gray-700" />
            </div>


            <div className="flex flex-row gap-9 mr-12">
                    <span className="font-bold">Subtotal:</span>
                    <span className="ml-auto ">{total}</span>
            </div>

            <div className="flex flex-row gap-9 mr-12">
                    <span className="font-bold">Discount:</span>
                    <span className="ml-auto">{discount}</span>
            </div>

            <div className="flex flex-row gap-9 mr-12">
                    <span className="font-bold">Tax:</span>
                    <span className="ml-auto">{tax}</span>
            </div>

            <div>
            <hr className="h-px my-3 bg-gray-500 border-0 dark:bg-gray-700" />
            </div>

            <div className="flex flex-row gap-9 mr-12">
                    <span className="font-bold">Total:</span>
                    <span className="ml-auto ">{grandTotal}</span>
            </div>


              </div>
            </DialogBody>
            <DialogFooter className="justify-between">
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient"  onClick={handleDownload} className="p-3 text-black">
                <span>Download PDF</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </>
      );
    }