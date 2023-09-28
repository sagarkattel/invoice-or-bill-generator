"use client";

import React, { createContext, useEffect, useState } from "react";

export const AllContext = createContext<any>(null);

interface itemsDataProp {
  id: number;
  qty: number;
  price: number;
  total: number;
  item: string;
}

const Context = ({ children }:any) => {
  const [cashierName, setCashierName] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<Number>();

  const [itemsData, setItemsData] = useState<{ [key: string]: itemsDataProp }>(
    {}
  );

  const [taxrate, setTaxrate] = useState<number>(0);

  const [tax, setTax] = useState<number>();

  const [discount, setDiscount] = useState<number>();

  const [discountrate, setDiscountrate] = useState<number>(0);

  const [total, setTotal] = useState<number>();

  const [grandTotal, setGrandtotal] = useState<number>();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  // Function to calculate the grand total based on itemsData
  const calculateGrandTotal = (itemsData: any) => {
    let grandTotal = 0;
    for (const index in itemsData) {
      if (itemsData[index].total) {
        grandTotal += itemsData[index].total;
      }
    }
    return grandTotal;
  };

  // Update the grand total whenever itemsData changes
  useEffect(() => {
    const newGrandTotal = calculateGrandTotal(itemsData);
    setTotal(newGrandTotal);
  }, [itemsData]);


  return (
    <AllContext.Provider
      value={{
        cashierName,
        setCashierName,
        customerName,
        setCustomerName,
        invoiceNumber,
        setInvoiceNumber,
        itemsData,
        setItemsData,
        total,
        setTotal,
        taxrate,
        setTaxrate,
        discountrate,
        setDiscountrate,
        tax,
        setTax,
        discount,
        setDiscount,
        grandTotal,
        setGrandtotal,
        open,
        setOpen,
        handleOpen,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export default Context;
