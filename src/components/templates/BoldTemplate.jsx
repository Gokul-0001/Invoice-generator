import React from 'react';
import PaidStamp from '../PaidStamp';

const BoldTemplate = ({ data }) => {
  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  };

  const calculateTax = () => {
    return (calculateSubtotal() * data.taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatCurrency = (amount) => {
    return `${data.currencySymbol || '$'}${amount.toFixed(2)}`;
  };

  return (
    <div 
      id="invoice-template" 
      className="bg-white max-w-4xl mx-auto shadow-lg print:shadow-none relative overflow-visible"
    >
      {/* Paid Stamp */}
      {data.isPaid && <PaidStamp paidDate={data.paidDate} template="bold" />}

      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-12">
        {data.companyLogo && (
          <div className="mb-4">
            <img 
              src={data.companyLogo} 
              alt="Company Logo" 
              className="h-12 w-auto object-contain brightness-0 invert"
            />
          </div>
        )}
        <h1 className="text-5xl font-extrabold mb-2">INVOICE</h1>
        <div className="flex justify-between items-end">
          <p className="text-2xl font-bold">#{data.invoiceNumber}</p>
          <div className="text-right text-sm">
            <p className="opacity-90">Issue Date: {data.invoiceDate}</p>
            {!data.isPaid && data.dueDate && (
              <p className="font-semibold">Due: {data.dueDate}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-12">
        {/* From and Bill To */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-orange-600 font-bold mb-3 uppercase tracking-wide">FROM</h3>
            <p className="font-bold text-lg text-gray-900 mb-1">{data.companyName}</p>
            <p className="text-sm text-gray-700">{data.companyAddress}</p>
            <p className="text-sm text-gray-700">{data.companyCity}</p>
            <p className="text-sm text-gray-700">{data.companyEmail}</p>
            <p className="text-sm text-gray-700">{data.companyPhone}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-gray-700 font-bold mb-3 uppercase tracking-wide">BILL TO</h3>
            <p className="font-bold text-lg text-gray-900 mb-1">{data.clientName}</p>
            <p className="text-sm text-gray-700">{data.clientAddress}</p>
            <p className="text-sm text-gray-700">{data.clientCity}</p>
            <p className="text-sm text-gray-700">{data.clientEmail}</p>
            <p className="text-sm text-gray-700">{data.clientPhone}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <th className="text-left py-4 px-4 font-bold">DESCRIPTION</th>
              <th className="text-center py-4 px-4 font-bold">QTY</th>
              <th className="text-right py-4 px-4 font-bold">RATE</th>
              <th className="text-right py-4 px-4 font-bold">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-orange-50">
                <td className="py-4 px-4 font-medium">{item.description}</td>
                <td className="text-center py-4 px-4">{item.quantity}</td>
                <td className="text-right py-4 px-4">{formatCurrency(item.rate)}</td>
                <td className="text-right py-4 px-4 font-bold">
                  {formatCurrency(item.quantity * item.rate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-8">
          <div className="w-96">
            <div className="flex justify-between py-3 px-4 bg-gray-50">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold">{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between py-3 px-4 bg-orange-50">
              <span className="font-semibold">Tax ({data.taxRate}%)</span>
              <span className="font-bold">{formatCurrency(calculateTax())}</span>
            </div>
            <div className="flex justify-between py-4 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded mt-2">
              <span className="text-xl font-bold">TOTAL DUE</span>
              <span className="text-xl font-bold">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t-2 border-orange-200">
          <div>
            <h4 className="font-bold text-gray-900 mb-2 uppercase">Notes</h4>
            <p className="text-sm text-gray-700">{data.notes}</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 uppercase">TERMS & CONDITIONS</h4>
            <p className="text-sm text-gray-700">{data.terms}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoldTemplate;
