import React, { useState } from 'react';
import { useInvoice } from '../context/InvoiceContext';
import { Trash2, Eye, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const InvoiceList = () => {
  const { invoices, deleteInvoice, setCurrentInvoice, updateInvoice } = useInvoice();
  const navigate = useNavigate();
  const [editingPayment, setEditingPayment] = useState(null);
  const [paymentDate, setPaymentDate] = useState('');

  const handleView = (invoice) => {
    setCurrentInvoice(invoice);
    navigate(`/preview/${invoice.id}`);
  };

  // Professional delete confirmation using toast
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
              toast.success('Invoice deleted successfully!', {
                icon: '🗑️',
                style: {
                  background: '#fef2f2',
                  color: '#991b1b',
                  border: '1px solid #fecaca',
                  padding: '16px',
                  fontWeight: '500',
                },
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

  const handleMarkAsPaidClick = (invoice) => {
    setEditingPayment(invoice.id);
    setPaymentDate(new Date().toISOString().split('T')[0]);
  };

  const handleConfirmPaid = (invoice) => {
    if (!paymentDate) {
      toast.error('Please select a payment date', {
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          border: '1px solid #fecaca',
          padding: '16px',
          fontWeight: '500',
        },
      });
      return;
    }

    const updatedInvoice = {
      ...invoice,
      isPaid: true,
      paidDate: paymentDate,
    };
    updateInvoice(invoice.id, updatedInvoice);
    setEditingPayment(null);
    setPaymentDate('');
    
    toast.success('Invoice marked as paid!', {
      icon: '✓',
      style: {
        background: '#f0fdf4',
        color: '#15803d',
        border: '1px solid #bbf7d0',
        padding: '16px',
        fontWeight: '500',
      },
    });
  };

  const handleCancelEdit = () => {
    setEditingPayment(null);
    setPaymentDate('');
  };

  const calculateTotal = (invoice) => {
    const subtotal = invoice.items.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
    const tax = (subtotal * invoice.taxRate) / 100;
    return subtotal + tax;
  };

  // Separate invoices into paid and unpaid, sort by date
  const unpaidInvoices = invoices
    .filter(inv => !inv.isPaid)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
  const paidInvoices = invoices
    .filter(inv => inv.isPaid)
    .sort((a, b) => new Date(b.paidDate) - new Date(a.paidDate));

  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-500 text-lg">No invoices yet. Create your first invoice!</p>
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
      className={`border-b transition-colors ${
        isPaid 
          ? 'bg-green-50 hover:bg-green-100' 
          : 'bg-white hover:bg-gray-50'
      }`}
    >
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{invoice.invoiceNumber}</span>
          {isPaid && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-600 text-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Paid
            </span>
          )}
        </div>
      </td>
      <td className="p-4">{invoice.clientName}</td>
      <td className="p-4">{invoice.invoiceDate}</td>
      <td className="p-4">
        {isPaid ? (
          <div>
            <span className="text-xs text-gray-500 block">Paid on</span>
            <span className="text-green-700 font-medium">{invoice.paidDate}</span>
          </div>
        ) : (
          <div>
            <span className="text-xs text-gray-500 block">Due Date</span>
            <span className="text-orange-700 font-medium">{invoice.dueDate || 'Not set'}</span>
          </div>
        )}
      </td>
      <td className="p-4 text-right font-semibold">
        {invoice.currencySymbol || '$'}{calculateTotal(invoice).toFixed(2)}
      </td>
      <td className="p-4 text-center capitalize">{invoice.template}</td>
      <td className="p-4">
        <div className="flex justify-center items-center space-x-2">
          {/* Payment Status - Only show for unpaid invoices */}
          {!isPaid && (
            <>
              {editingPayment === invoice.id ? (
                <div className="flex flex-col space-y-2 bg-purple-50 p-3 rounded-lg border-2 border-purple-300 min-w-[200px]">
                  <label className="text-xs font-semibold text-blue-800">Payment Date:</label>
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="text-sm px-3 py-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleConfirmPaid(invoice)}
                      className="flex-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors text-xs font-medium flex items-center justify-center space-x-1"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Mark Paid</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 transition-colors text-xs font-medium flex items-center justify-center space-x-1"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleMarkAsPaidClick(invoice)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center space-x-2"
                  title="Mark as Paid"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark as Paid</span>
                </button>
              )}
            </>
          )}
          
          {/* View Button */}
          <button
            onClick={() => handleView(invoice)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="View Invoice"
          >
            <Eye className="w-5 h-5" />
          </button>
          
          {/* Delete Button */}
          <button
            onClick={() => handleDelete(invoice.id, invoice.invoiceNumber)}
            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-2xl font-medium text-gray-900">All Invoices</h2>
        <p className="text-gray-600 mt-1">Manage and view your invoices</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-700">Invoice #</th>
              <th className="text-left p-4 font-semibold text-gray-700">Client</th>
              <th className="text-left p-4 font-semibold text-gray-700">Date</th>
              <th className="text-left p-4 font-semibold text-gray-700">Status</th>
              <th className="text-right p-4 font-semibold text-gray-700">Total</th>
              <th className="text-center p-4 font-semibold text-gray-700">Template</th>
              <th className="text-center p-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Unpaid Invoices First */}
            {unpaidInvoices.length > 0 && (
              <>
                <tr>
                  <td colSpan="7" className="p-3 bg-orange-100 border-b-2 border-orange-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-bold text-orange-900 uppercase tracking-wide">
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

            {/* Paid Invoices Below */}
            {paidInvoices.length > 0 && (
              <>
                <tr>
                  <td colSpan="7" className="p-3 bg-green-100 border-b-2 border-green-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-700" />
                        <span className="text-sm font-bold text-green-900 uppercase tracking-wide">
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

      {/* Summary Footer */}
      <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold">{invoices.length}</span> invoice(s)
        </div>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-gray-700">Pending: <span className="font-semibold">{unpaidInvoices.length}</span></span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-700">Paid: <span className="font-semibold">{paidInvoices.length}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
