import React from 'react';
import PaidStamp from '../PaidStamp';

const ClassicTemplate = ({ data }) => {
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
      className="bg-white p-12 max-w-4xl mx-auto shadow-lg print:shadow-none print:p-0 relative overflow-visible"
    >
      {/* Paid Stamp */}
      {data.isPaid && <PaidStamp paidDate={data.paidDate} template="classic" />}

      {/* Company Logo */}
      {data.companyLogo && (
        <div className="mb-6">
          <img 
            src={data.companyLogo} 
            alt="Company Logo" 
            className="h-16 w-auto object-contain"
          />
        </div>
      )}

      {/* Header */}
      <div className="text-center border-b-4 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">INVOICE</h1>
        <p className="text-lg text-gray-600">Invoice Number: {data.invoiceNumber}</p>
      </div>

      {/* From and Bill To */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="border-r-2 border-gray-300 pr-8">
          <h3 className="font-bold text-gray-800 mb-3 uppercase tracking-wide">FROM:</h3>
          <p className="font-bold text-lg mb-1">{data.companyName}</p>
          <p className="text-sm text-gray-600">{data.companyAddress}</p>
          <p className="text-sm text-gray-600">{data.companyCity}</p>
          <p className="text-sm text-gray-600">{data.companyEmail}</p>
          <p className="text-sm text-gray-600">{data.companyPhone}</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 mb-3 uppercase tracking-wide">BILL TO:</h3>
          <p className="font-bold text-lg mb-1">{data.clientName}</p>
          <p className="text-sm text-gray-600">{data.clientAddress}</p>
          <p className="text-sm text-gray-600">{data.clientCity}</p>
          <p className="text-sm text-gray-600">{data.clientEmail}</p>
          <p className="text-sm text-gray-600">{data.clientPhone}</p>
        </div>
      </div>

      {/* Dates */}
      <div className="flex justify-between mb-8 bg-gray-100 p-4">
        <div>
          <p className="text-sm font-semibold text-gray-700">Invoice Date: <span className="font-normal">{data.invoiceDate}</span></p>
        </div>
        {!data.isPaid && data.dueDate && (
          <div>
            <p className="text-sm font-semibold text-gray-700">Due Date: <span className="font-normal">{data.dueDate}</span></p>
          </div>
        )}
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-800 text-white uppercase text-sm">
            <th className="text-left py-3 px-4 font-bold">DESCRIPTION</th>
            <th className="text-center py-3 px-4 font-bold">QTY</th>
            <th className="text-right py-3 px-4 font-bold">RATE</th>
            <th className="text-right py-3 px-4 font-bold">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="py-4 px-4">{item.description}</td>
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
        <div className="w-80">
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="font-semibold">Subtotal</span>
            <span>{formatCurrency(calculateSubtotal())}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="font-semibold">Tax ({data.taxRate}%)</span>
            <span>{formatCurrency(calculateTax())}</span>
          </div>
          <div className="flex justify-between py-4 bg-gray-800 text-white px-4 mt-2">
            <span className="text-lg font-bold">TOTAL DUE</span>
            <span className="text-lg font-bold">{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      <div className="grid grid-cols-2 gap-8 pt-6 border-t-2 border-gray-800">
        <div>
          <h4 className="font-bold text-gray-800 mb-2">NOTES:</h4>
          <p className="text-sm text-gray-600">{data.notes}</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-2">TERMS & CONDITIONS:</h4>
          <p className="text-sm text-gray-600">{data.terms}</p>
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;
