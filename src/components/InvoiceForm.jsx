import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';

const InvoiceForm = ({ onFormChange, initialData }) => {
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
    { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
    { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso' },
  ];

  const [formData, setFormData] = useState(initialData || {
    invoiceNumber: 'INV-001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    taxRate: 8.5,
    currency: 'USD',
    currencySymbol: '$',
    companyLogo: null,
    companyName: 'Your Company Name',
    companyAddress: '123 Business St, Suite 100',
    companyCity: 'City, State 12345',
    companyEmail: 'hello@yourcompany.com',
    companyPhone: '+1 (555) 123-4567',
    clientName: 'Client Company Name',
    clientAddress: '456 Client Ave',
    clientCity: 'City, State 67890',
    clientEmail: 'client@company.com',
    clientPhone: '+1 (555) 987-6543',
    items: [
      { description: 'Web Design Services', quantity: 1, rate: 2500 },
      { description: 'Logo Design', quantity: 1, rate: 800 },
      { description: 'Brand Guidelines', quantity: 1, rate: 500 },
    ],
    notes: 'Thank you for your business!',
    terms: 'Payment is due within 30 days. Late payments may incur a 5% monthly fee.',
    isPaid: false,
    paidDate: null,
  });

  const [logoPreview, setLogoPreview] = useState(initialData?.companyLogo || null);

  // Update formData when initialData changes (when switching tabs)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setLogoPreview(initialData.companyLogo || null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...formData, [name]: value };

    // Update currency symbol when currency changes
    if (name === 'currency') {
      const selectedCurrency = currencies.find(c => c.code === value);
      updated.currencySymbol = selectedCurrency?.symbol || '$';
    }

    setFormData(updated);
    onFormChange(updated);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const logoData = reader.result;
        setLogoPreview(logoData);
        const updated = { ...formData, companyLogo: logoData };
        setFormData(updated);
        onFormChange(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview(null);
    const updated = { ...formData, companyLogo: null };
    setFormData(updated);
    onFormChange(updated);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    const updated = { ...formData, items: updatedItems };
    setFormData(updated);
    onFormChange(updated);
  };

  const addItem = () => {
    const updated = {
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, rate: 0 }],
    };
    setFormData(updated);
    onFormChange(updated);
  };

  const removeItem = (index) => {
    const updated = {
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    };
    setFormData(updated);
    onFormChange(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Invoice Details</h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Invoice Number
          </label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Invoice Date
          </label>
          <input
            type="date"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tax Rate (%)
          </label>
          <input
            type="number"
            name="taxRate"
            step="0.1"
            value={formData.taxRate}
            onChange={handleChange}
            className="input-field"
          />
        </div>
      </div>

      {/* Currency Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Currency
        </label>
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="input-field"
        >
          {currencies.map((curr) => (
            <option key={curr.code} value={curr.code}>
              {curr.symbol} - {curr.name} ({curr.code})
            </option>
          ))}
        </select>
      </div>

      {/* Company Logo Upload */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Logo</h3>
        <div className="flex items-start space-x-4">
          {logoPreview ? (
            <div className="relative">
              <img
                src={logoPreview}
                alt="Company Logo"
                className="w-32 h-32 object-contain border-2 border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-xs text-gray-500 text-center px-2">Upload Logo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          )}
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">
              Upload your company logo (PNG, JPG, SVG)
            </p>
            <p className="text-xs text-gray-500">
              Recommended size: 200x200px. Max file size: 2MB
            </p>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">From (Your Company)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City/State
            </label>
            <input
              type="text"
              name="companyCity"
              value={formData.companyCity}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill To (Client)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="clientEmail"
              value={formData.clientEmail}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="clientAddress"
              value={formData.clientAddress}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City/State
            </label>
            <input
              type="text"
              name="clientCity"
              value={formData.clientCity}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="clientPhone"
              value={formData.clientPhone}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Invoice Items</h3>
          <button onClick={addItem} className="btn-primary flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Item</span>
          </button>
        </div>
        <div className="space-y-4">
          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-start">
              <div className="col-span-5">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, 'description', e.target.value)
                  }
                  className="input-field"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, 'quantity', parseFloat(e.target.value))
                  }
                  className="input-field"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  placeholder="Rate"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, 'rate', parseFloat(e.target.value))
                  }
                  className="input-field"
                />
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className="text-gray-700 font-medium">
                  {formData.currencySymbol}{(item.quantity * item.rate).toFixed(2)}
                </span>
                {formData.items.length > 1 && (
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes and Terms */}
      <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="input-field"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Terms & Conditions
          </label>
          <textarea
            name="terms"
            value={formData.terms}
            onChange={handleChange}
            rows="3"
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
