import React, { useState, useCallback, memo } from 'react';
import { useInvoice } from '../context/InvoiceContext';
import { Trash2, Eye, CheckCircle, XCircle, AlertTriangle, Trash, Check, Stamp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Memoized Payment Form Component - Made Responsive
const PaymentForm = memo(({
  invoice,
  paymentDate,
  paidIndicator,
  onPaymentDateChange,
  onPaidIndicatorChange,
  onConfirm,
  onCancel,
}) => (
  <div className="flex flex-col space-y-3 bg-purple-50 p-3 sm:p-4 rounded-lg border-2 border-purple-300 w-full sm:w-80">
    {/* Payment Date */}
    <div>
      <label className="text-xs font-semibold text-blue-800 block mb-2">Payment Date:</label>
      <input
        type="date"
        value={paymentDate}
        onChange={(e) => onPaymentDateChange(e.target.value)}
        className="w-full text-xs sm:text-sm px-2 sm:px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    {/* Paid Indicator Selection */}
    <div>
      <label className="text-xs font-semibold text-blue-800 block mb-2">Paid Indicator:</label>
      <div className="flex gap-2">
        <button
          onClick={() => onPaidIndicatorChange('stamp')}
          className={`flex-1 px-2 sm:px-3 py-2 rounded text-xs font-medium transition-colors duration-200 border-2 flex items-center justify-center space-x-1 ${
            paidIndicator === 'stamp'
              ? 'bg-purple-600 text-white border-purple-600'
              : 'bg-white text-purple-600 border-purple-300 hover:border-purple-500'
          }`}
        >
          <Stamp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span>Stamp</span>
        </button>
        <button
          onClick={() => onPaidIndicatorChange('text')}
          className={`flex-1 px-2 sm:px-3 py-2 rounded text-xs font-medium transition-colors duration-200 border-2 flex items-center justify-center space-x-1 ${
            paidIndicator === 'text'
              ? 'bg-purple-600 text-white border-purple-600'
              : 'bg-white text-purple-600 border-purple-300 hover:border-purple-500'
          }`}
        >
          <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span>Text</span>
        </button>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex space-x-2 pt-2 border-t border-purple-200">
      <button
        onClick={() => onConfirm(invoice)}
        className="flex-1 bg-green-600 text-white px-2 sm:px-3 py-2 rounded hover:bg-green-700 transition-colors duration-200 text-xs font-medium flex items-center justify-center space-x-1"
      >
        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <span>Mark Paid</span>
      </button>
      <button
        onClick={onCancel}
        className="flex-1 bg-gray-200 text-gray-700 px-2 sm:px-3 py-2 rounded hover:bg-gray-300 transition-colors duration-200 text-xs font-medium flex items-center justify-center space-x-1"
      >
        <XCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        <span>Cancel</span>
      </button>
    </div>
  </div>
));

PaymentForm.displayName = 'PaymentForm';

const InvoiceList = () => {
  const { invoices, deleteInvoice, setCurrentInvoice, updateInvoice } = useInvoice();
  const navigate = useNavigate();
  const [editingPayment, setEditingPayment] = useState(null);
  const [paymentDate, setPaymentDate] = useState('');
  const [paidIndicator, setPaidIndicator] = useState('stamp');

  const handleView = useCallback((invoice) => {
    setCurrentInvoice(invoice);
    navigate(`/preview/${invoice.id}`);
  }, [setCurrentInvoice, navigate]);

  const handleDelete = (id, invoiceNumber) => {
    toast((t) => (
      <div className="flex flex-col space-y-3">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900">Delete Invoice</h3>
            <p className="text-sm text-gray-600 mt-1">
              Are you sure you want to delete invoice <span className="font-semibold">{invoiceNumber}</span>? 
              This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex space-x-2 justify-end pt-2 border-t">
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteInvoice(id);
              toast.dismiss(t.id);
              toast.custom((t) => (
                <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <Trash className="w-5 h-5 text-red-600" />
                  <span className="text-red-900 font-medium">Invoice deleted successfully!</span>
                </div>
              ), {
                duration: 4000,
              });
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      style: {
        maxWidth: '500px',
        padding: '16px',
      },
    });
  };

  const handleMarkAsPaidClick = useCallback((invoice) => {
    setEditingPayment(invoice.id);
    setPaymentDate(new Date().toISOString().split('T')[0]);
    setPaidIndicator('stamp');
  }, []);

  const handleConfirmPaid = useCallback((invoice) => {
    if (!paymentDate) {
      toast.custom((t) => (
        <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="text-red-900 font-medium">Please select a payment date</span>
        </div>
      ), {
        duration: 3000,
      });
      return;
    }

    const updatedInvoice = {
      ...invoice,
      isPaid: true,
      paidDate: paymentDate,
      paidIndicator: paidIndicator,
    };

    setTimeout(() => {
      updateInvoice(invoice.id, updatedInvoice);
      setEditingPayment(null);
      setPaymentDate('');
      setPaidIndicator('stamp');
    }, 100);
    
    toast.custom((t) => (
      <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
        <Check className="w-5 h-5 text-green-600" />
        <span className="text-green-900 font-medium">Invoice marked as paid with {paidIndicator}!</span>
      </div>
    ), {
      duration: 4000,
    });
  }, [paymentDate, paidIndicator, updateInvoice]);

  const handleCancelEdit = useCallback(() => {
    setEditingPayment(null);
    setPaymentDate('');
    setPaidIndicator('stamp');
  }, []);

  const calculateTotal = (invoice) => {
    const subtotal = invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
    const tax = (subtotal * invoice.taxRate) / 100;
    return subtotal + tax;
  };

  const unpaidInvoices = invoices
    .filter(inv => !inv.isPaid)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
  const paidInvoices = invoices
    .filter(inv => inv.isPaid)
    .sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate));

  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 sm:p-12 text-center">
        <p className="text-gray-500 text-base sm:text-lg">No invoices yet. Create your first invoice!</p>
        <button
          onClick={() => navigate('/create')}
          className="btn-primary mt-4"
        >
          Create Invoice
        </button>
      </div>
    );
  }

  const InvoiceRow = ({ invoice, isPaid }) => (
    <tr 
      key={invoice.id} 
      className={`border-b transition-colors duration-300 ${
        editingPayment === invoice.id
          ? 'bg-white'
          : isPaid 
            ? 'bg-green-50 hover:bg-green-100' 
            : 'bg-white hover:bg-gray-50'
      }`}
    >
      <td className="p-2 sm:p-4">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <span className="font-medium text-xs sm:text-sm">{invoice.invoiceNumber}</span>
          {isPaid && (
            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-xs font-medium bg-green-600 text-white">
              <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
              <span className="hidden sm:inline">Paid</span>
            </span>
          )}
        </div>
      </td>
      <td className="p-2 sm:p-4 text-xs sm:text-sm">{invoice.clientName}</td>
      <td className="p-2 sm:p-4 text-xs sm:text-sm">{invoice.invoiceDate}</td>
      <td className="p-2 sm:p-4">
        {isPaid ? (
          <div>
            <span className="text-xs text-gray-500 block">Paid on</span>
            <span className="text-green-700 font-medium text-xs sm:text-sm">{invoice.paidDate}</span>
          </div>
        ) : (
          <div>
            <span className="text-xs text-gray-500 block">Due Date</span>
            <span className="text-orange-700 font-medium text-xs sm:text-sm">{invoice.dueDate || 'Not set'}</span>
          </div>
        )}
      </td>
      <td className="p-2 sm:p-4 text-right font-semibold text-xs sm:text-sm">
        {invoice.currencySymbol || '$'}{calculateTotal(invoice).toFixed(2)}
      </td>
      <td className="p-2 sm:p-4 text-center capitalize text-xs sm:text-sm">{invoice.template}</td>
      <td className="p-2 sm:p-4">
        <div className="flex justify-center items-center gap-1 sm:gap-2">
          {!isPaid && (
            <>
              {editingPayment === invoice.id ? (
                <PaymentForm
                  invoice={invoice}
                  paymentDate={paymentDate}
                  paidIndicator={paidIndicator}
                  onPaymentDateChange={setPaymentDate}
                  onPaidIndicatorChange={setPaidIndicator}
                  onConfirm={handleConfirmPaid}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <button
                  onClick={() => handleMarkAsPaidClick(invoice)}
                  className="px-2 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-xs font-medium flex items-center space-x-1"
                  title="Mark as Paid"
                >
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Mark as Paid</span>
                  <span className="sm:hidden">Paid</span>
                </button>
              )}
            </>
          )}
          
          <button
            onClick={() => handleView(invoice)}
            className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
            title="View Invoice"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <button
            onClick={() => handleDelete(invoice.id, invoice.invoiceNumber)}
            className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:p-6 border-b bg-gradient-to-r from-purple-50 via-white to-blue-50">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-900">All Invoices</h2>
        <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage and view your invoices</p>
      </div>

      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-amber-50 border-l-4 border-amber-500">
        <div className="flex items-start space-x-2 sm:space-x-3">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900 text-xs sm:text-sm">Your Data is Stored Locally</h3>
            <p className="text-amber-800 text-xs sm:text-sm mt-1">
              All your invoices are stored in your browser's local storage. This means your data is saved on <span className="font-semibold">this device only</span>. 
              If you clear your browser cache, cookies, or use an incognito/private window, all invoices will be permanently deleted. 
              Consider <span className="font-semibold">downloading or backing up</span> important invoices to keep them safe.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal scroll wrapper for mobile */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2 sm:p-4 font-semibold text-gray-700 text-xs sm:text-sm">Invoice #</th>
              <th className="text-left p-2 sm:p-4 font-semibold text-gray-700 text-xs sm:text-sm">Client</th>
              <th className="text-left p-2 sm:p-4 font-semibold text-gray-700 text-xs sm:text-sm">Date</th>
              <th className="text-left p-2 sm:p-4 font-semibold text-gray-700 text-xs sm:text-sm">Status</th>
              <th className="text-right p-2 sm:p-4 font-semibold text-gray-700 text-xs sm:text-sm">Total</th>
              <th className="text-center p-2 sm:p-4 font-semibold text-gray-700 text-xs sm:text-sm">Template</th>
              <th className="text-center p-2 sm:p-4 font-semibold text-gray-700 text-xs sm:text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {unpaidInvoices.length > 0 && (
              <>
                <tr>
                  <td colSpan="7" className="p-2 sm:p-3 bg-orange-100 border-b-2 border-orange-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-bold text-orange-900 uppercase tracking-wide">
                          Pending Invoices ({unpaidInvoices.length})
                        </span>
                      </div>
                      <span className="text-xs text-orange-700 font-medium">
                        Click "Mark as Paid" to update payment status
                      </span>
                    </div>
                  </td>
                </tr>
                {unpaidInvoices.map((invoice) => (
                  <InvoiceRow key={invoice.id} invoice={invoice} isPaid={false} />
                ))}
              </>
            )}

            {paidInvoices.length > 0 && (
              <>
                <tr>
                  <td colSpan="7" className="p-2 sm:p-3 bg-green-100 border-b-2 border-green-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-700" />
                        <span className="text-xs sm:text-sm font-bold text-green-900 uppercase tracking-wide">
                          Paid Invoices ({paidInvoices.length})
                        </span>
                      </div>
                      <span className="text-xs text-green-700 font-medium">
                        These invoices have been paid and cannot be changed
                      </span>
                    </div>
                  </td>
                </tr>
                {paidInvoices.map((invoice) => (
                  <InvoiceRow key={invoice.id} invoice={invoice} isPaid={true} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 sm:p-6 bg-gray-50 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="text-xs sm:text-sm text-gray-600">
          Total: <span className="font-semibold">{invoices.length}</span> invoice(s)
        </div>
        <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-700">Pending: <span className="font-semibold">{unpaidInvoices.length}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded"></div>
            <span className="text-gray-700">Paid: <span className="font-semibold">{paidInvoices.length}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
