import React from 'react';
import PaidStamp from '../PaidStamp';

const MinimalTemplate = ({ data }) => {
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

  // Show stamp only when paid indicator is 'stamp'
  const shouldShowStamp = data.isPaid && data.paidIndicator === 'stamp';

  return (
    <div 
      id="invoice-template" 
      className="bg-white p-12 max-w-4xl mx-auto shadow-lg print:shadow-none print:p-0 relative overflow-visible"
    >
      {/* Paid Stamp - Only for stamp indicator */}
      {shouldShowStamp && <PaidStamp paidDate={data.paidDate} template="minimal" />}

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
      <div className="mb-12">
        <h1 className="text-3xl font-light text-gray-800 mb-2">INVOICE</h1>
        <div className="w-16 h-0.5 bg-gray-400"></div>
        <p className="text-sm text-gray-500 mt-2">Invoice Number</p>
        <p className="text-lg font-medium text-gray-800">{data.invoiceNumber}</p>
      </div>

      {/* From and Bill To */}
      <div className="grid grid-cols-2 gap-16 mb-12">
        <div>
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">FROM</p>
          <p className="font-medium text-gray-900 mb-1">{data.companyName}</p>
          <p className="text-sm text-gray-600">{data.companyAddress}</p>
          <p className="text-sm text-gray-600">{data.companyCity}</p>
          <p className="text-sm text-gray-600">{data.companyEmail}</p>
          <p className="text-sm text-gray-600">{data.companyPhone}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">TO</p>
          <p className="font-medium text-gray-900 mb-1">{data.clientName}</p>
          <p className="text-sm text-gray-600">{data.clientAddress}</p>
          <p className="text-sm text-gray-600">{data.clientCity}</p>
          <p className="text-sm text-gray-600">{data.clientEmail}</p>
          <p className="text-sm text-gray-600">{data.clientPhone}</p>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <div>
          <p className="text-xs text-gray-500 uppercase">
            {data.isPaid && data.paidIndicator === 'text' ? 'Paid Date' : 'Invoice Date'}
          </p>
          <p className="text-sm font-medium">
            {data.isPaid && data.paidIndicator === 'text' ? data.paidDate : data.invoiceDate}
          </p>
        </div>
        {!data.isPaid && data.dueDate && (
          <div>
            <p className="text-xs text-gray-500 uppercase">Due Date</p>
            <p className="text-sm font-medium">{data.dueDate}</p>
          </div>
        )}
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left py-3 text-xs text-gray-600 font-medium uppercase tracking-wider">DESCRIPTION</th>
            <th className="text-center py-3 text-xs text-gray-600 font-medium uppercase tracking-wider">QTY</th>
            <th className="text-right py-3 text-xs text-gray-600 font-medium uppercase tracking-wider">RATE</th>
            <th className="text-right py-3 text-xs text-gray-600 font-medium uppercase tracking-wider">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-4 text-sm">{item.description}</td>
              <td className="text-center py-4 text-sm">{item.quantity}</td>
              <td className="text-right py-4 text-sm">{formatCurrency(item.rate)}</td>
              <td className="text-right py-4 text-sm font-medium">
                {formatCurrency(item.quantity * item.rate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-80">
          <div className="flex justify-between py-2 text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">{formatCurrency(calculateSubtotal())}</span>
          </div>
          <div className="flex justify-between py-2 text-sm border-b border-gray-200">
            <span className="text-gray-600">Tax ({data.taxRate}%)</span>
            <span className="text-gray-900">{formatCurrency(calculateTax())}</span>
          </div>
          <div className="flex justify-between py-4 text-lg">
            <span className="font-medium text-gray-900">
              {data.isPaid ? 'Total' : 'Total Due'}
            </span>
            <span className="font-bold text-gray-900">{formatCurrency(calculateTotal())}</span>
          </div>
          {/* Paid Amount - shown for all paid invoices */}
          {data.isPaid && (
            <div className="flex justify-between py-3 px-4 bg-green-50 mt-2 border border-green-200 text-sm rounded">
              <span className="font-semibold text-green-900">Paid Amount</span>
              <span className="font-bold text-green-900">{formatCurrency(calculateTotal())}</span>
            </div>
          )}
        </div>
      </div>

      {/* Notes and Terms */}
      <div className="grid grid-cols-2 gap-12 pt-8 border-t border-gray-200">
        <div>
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Notes</h4>
          <p className="text-sm text-gray-700">{data.notes}</p>
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Terms & Conditions</h4>
          <p className="text-sm text-gray-700">{data.terms}</p>
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;
