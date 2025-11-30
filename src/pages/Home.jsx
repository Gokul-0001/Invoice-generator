import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Zap, BarChart3, FileText, Sparkles, LogOut, CreditCard, Download, Share2, Eye, Printer, ArrowDown, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Fixed Animated Counter Component - No overshoot
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation without overshoot
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(1 + (value - 1) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value); // Ensure final value is exact
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{count.toLocaleString('en-IN')}</span>;
};


// FAQ Item Component with Accordion
const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border border-gray-200 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">
          {faq.question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};


const Home = () => {
  const [counterValue, setCounterValue] = useState(1);
  const navigate = useNavigate();

  // Trigger counter animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounterValue(25000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCreateClick = () => {
    navigate('/create');
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const tiltFloatVariants = {
    animate: {
      y: [0, -18, 0],
      rotateX: [1, 1, 1],
      rotateY: [-25, -25, -25],
      rotateZ: [1, 1, 1],
      transition: {
        duration: 6,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  const pulseVariants = {
    animate: {
      opacity: [1, 0.8, 1],
      transition: {
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  const blobVariants = {
    animate: {
      x: [0, 20, 0, -20, 0],
      y: [0, -20, 20, -10, 0],
      scale: [1, 1.1, 0.9, 1.05, 1],
      transition: {
        duration: 10,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  const arrowVariants = {
    hover: {
      x: 4,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="font-display overflow-hidden">

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          variants={blobVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        <motion.div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          variants={blobVariants}
          animate="animate"
          transition={{ delay: 4 }}
        />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-purple-100/50 rounded-full border border-purple-200"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Generate Invoices Instantly</span>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tighter mb-6"
            variants={itemVariants}
          >
            Professional Invoices
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
              In Seconds. Free Forever.
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Create beautiful, professional invoices in just seconds. No credit card required. Perfect for freelancers and small businesses looking to streamline their billing.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <motion.button
              onClick={handleLoginClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors w-auto"
              whileHover="hover"
              variants={buttonHoverVariants}
            >
              Access Gallite Invoice
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Free Invoice Generator Section - Proper Font Sizes */}
      <section id="features" className="bg-white py-16 px-4 overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content - Proper Font Sizes */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                <FileText className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700">Free Invoice Generator</span>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Create  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Professional Invoice </span> for Clients
              </motion.h2>

              <motion.p
                className="text-lg text-gray-600 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Access Gallite Free Invoice to create professional invoices in seconds. Generate unlimited invoices, download as PDF, and share directly with your clients - Completely free.
              </motion.p>

              {/* Features List with One-Sentence Descriptions */}
              <div className="space-y-4">
                {[
                  {
                    icon: FileText,
                    title: 'Generate unlimited invoices in minutes',
                    description: 'Create as many invoices as you need with no limits for managing multiple clients.'
                  },
                  {
                    icon: Download,
                    title: 'Download clean PDFs with no watermarks',
                    description: 'Export professional PDF invoices with itemized services, tax breakdowns, and payment terms.'
                  },
                  {
                    icon: Share2,
                    title: 'Send invoices directly to your clients',
                    description: 'Share invoices instantly via email or WhatsApp with tracking and client communication.'
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start space-x-3"
                    custom={i}
                    variants={featureVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-4 h-4 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-gray-800 font-medium mb-1 text-lg">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                onClick={handleCreateClick}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all font-medium space-x-2 group w-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover="hover"
                variants={buttonHoverVariants}
                viewport={{ once: true }}
              >
                <span>Create Your First Invoice</span>
                <motion.div variants={arrowVariants}>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Right Content - Tilted Dashboard Mockup with Glow Effects */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              style={{
                perspective: '1200px',
              }}
            >
              <motion.div
                className="relative"
                variants={tiltFloatVariants}
                animate="animate"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Gray Border Container */}
                <div className="bg-gray-100 rounded-2xl p-3 shadow-2xl">
                  {/* Dashboard Content - Increased Height */}
                  <div className="bg-white rounded-xl p-6 relative z-20">

                    {/* Invoice Details Section */}
                    <div className="mb-4">
                      <h3 className="text-base font-bold text-gray-900 mb-3">Invoice Details</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Invoice Number - Glows First */}
                        <motion.div
                          className="bg-white border-2 rounded-lg px-3 py-2"
                          animate={{
                            borderColor: ['#E5E7EB', '#A855F7', '#E5E7EB'],
                            boxShadow: [
                              '0 0 0px rgba(168, 85, 247, 0)',
                              '0 0 20px rgba(168, 85, 247, 0.6)',
                              '0 0 0px rgba(168, 85, 247, 0)',
                            ],
                          }}
                          transition={{
                            duration: 12,
                            times: [0, 0.08, 0.16],
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        >
                          <div className="text-xs text-gray-500 mb-1 font-medium">Invoice Number</div>
                          <div className="text-sm font-bold text-gray-900">INV-001</div>
                        </motion.div>

                        {/* Invoice Date - Glows Second */}
                        <motion.div
                          className="bg-white border-2 rounded-lg px-3 py-2"
                          animate={{
                            borderColor: ['#E5E7EB', '#E5E7EB', '#A855F7', '#E5E7EB'],
                            boxShadow: [
                              '0 0 0px rgba(168, 85, 247, 0)',
                              '0 0 0px rgba(168, 85, 247, 0)',
                              '0 0 20px rgba(168, 85, 247, 0.6)',
                              '0 0 0px rgba(168, 85, 247, 0)',
                            ],
                          }}
                          transition={{
                            duration: 12,
                            times: [0, 0.16, 0.24, 0.32],
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        >
                          <div className="text-xs text-gray-500 mb-1 font-medium">Invoice Date</div>
                          <div className="text-sm font-bold text-gray-900">12-11-2025</div>
                        </motion.div>

                        {/* Currency - Glows Third */}
                        <motion.div
                          className="bg-white border-2 rounded-lg px-3 py-2"
                          animate={{
                            borderColor: ['#E5E7EB', '#E5E7EB', '#E5E7EB', '#A855F7', '#E5E7EB'],
                            boxShadow: [
                              '0 0 0px rgba(168, 85, 247, 0)',
                              '0 0 0px rgba(168, 85, 247, 0)',
                              '0 0 0px rgba(168, 85, 247, 0)',
                              '0 0 20px rgba(168, 85, 247, 0.6)',
                              '0 0 0px rgba(168, 85, 247, 0)',
                            ],
                          }}
                          transition={{
                            duration: 12,
                            times: [0, 0.24, 0.32, 0.4, 0.48],
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        >
                          <div className="text-xs text-gray-500 mb-1 font-medium">Currency</div>
                          <div className="text-sm font-bold text-gray-900">₹ - INR</div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Invoice Items Section - Glows Fourth */}
                    <motion.div
                      className="mb-4 border-2 rounded-lg p-3"
                      animate={{
                        borderColor: ['#E5E7EB', '#E5E7EB', '#E5E7EB', '#E5E7EB', '#A855F7', '#E5E7EB'],
                        boxShadow: [
                          '0 0 0px rgba(168, 85, 247, 0)',
                          '0 0 0px rgba(168, 85, 247, 0)',
                          '0 0 0px rgba(168, 85, 247, 0)',
                          '0 0 0px rgba(168, 85, 247, 0)',
                          '0 0 20px rgba(168, 85, 247, 0.6)',
                          '0 0 0px rgba(168, 85, 247, 0)',
                        ],
                      }}
                      transition={{
                        duration: 12,
                        times: [0, 0.32, 0.4, 0.48, 0.56, 0.64],
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold text-gray-900">Invoice Items</h3>
                        <button className="px-3 py-1 bg-purple-600 text-white rounded text-xs font-semibold">
                          + Add
                        </button>
                      </div>

                      {/* Items Table */}
                      <div className="bg-white rounded-lg border border-purple-200 overflow-hidden">
                        {/* Header */}
                        <div className="bg-purple-600 text-white px-3 py-2 grid grid-cols-12 gap-2 text-xs font-semibold">
                          <div className="col-span-5">Description</div>
                          <div className="col-span-2 text-center">Qty</div>
                          <div className="col-span-2 text-center">Rate</div>
                          <div className="col-span-3 text-right">Total</div>
                        </div>

                        {/* Rows */}
                        <div className="px-3 py-2 grid grid-cols-12 gap-2 text-xs border-b border-gray-100">
                          <div className="col-span-5 font-medium text-gray-900">Item 1</div>
                          <div className="col-span-2 text-center text-gray-700">1</div>
                          <div className="col-span-2 text-center text-gray-700">₹2,500</div>
                          <div className="col-span-3 text-right font-bold text-purple-600">₹2,500</div>
                        </div>

                        <div className="px-3 py-2 grid grid-cols-12 gap-2 text-xs">
                          <div className="col-span-5 font-medium text-gray-900">Item 2</div>
                          <div className="col-span-2 text-center text-gray-700">1</div>
                          <div className="col-span-2 text-center text-gray-700">₹800</div>
                          <div className="col-span-3 text-right font-bold text-purple-600">₹800</div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Summary Section */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200 mb-4">
                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">Subtotal:</span>
                          <span className="font-semibold text-gray-900">₹3,300</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">Tax (18%):</span>
                          <span className="font-semibold text-gray-900">₹594</span>
                        </div>
                        <div className="border-t border-purple-300 pt-2 flex justify-between items-center">
                          <span className="font-bold text-gray-900">Total:</span>
                          <span className="text-lg font-bold text-purple-600">₹3,894</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      {/* Save Button - Glows Fifth */}
                      <motion.button
                        className="py-2.5 bg-purple-600 text-white rounded-lg font-semibold text-xs flex items-center justify-center space-x-1"
                        animate={{
                          boxShadow: [
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 25px rgba(168, 85, 247, 0.8)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                          ],
                          scale: [1, 1, 1, 1, 1, 1.05, 1],
                        }}
                        transition={{
                          duration: 12,
                          times: [0, 0.48, 0.56, 0.64, 0.72, 0.8, 0.88],
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>Save</span>
                      </motion.button>

                      {/* PDF Button - Glows Sixth */}
                      <motion.button
                        className="py-2.5 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold text-xs flex items-center justify-center space-x-1"
                        animate={{
                          boxShadow: [
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 25px rgba(168, 85, 247, 0.8)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                          ],
                          scale: [1, 1, 1, 1, 1, 1, 1.05, 1],
                        }}
                        transition={{
                          duration: 12,
                          times: [0, 0.64, 0.72, 0.8, 0.85, 0.88, 0.93, 1],
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        whileHover={{ scale: 1.02, backgroundColor: '#f3e8ff' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Download className="w-3 h-3" />
                        <span>PDF</span>
                      </motion.button>

                      {/* Share Button - Glows Seventh */}
                      <motion.button
                        className="py-2.5 bg-white border-2 border-purple-600 text-purple-600 rounded-lg font-semibold text-xs flex items-center justify-center space-x-1"
                        animate={{
                          boxShadow: [
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 0px rgba(168, 85, 247, 0)',
                            '0 0 25px rgba(168, 85, 247, 0.8)',
                          ],
                          scale: [1, 1, 1, 1, 1, 1, 1, 1.05],
                        }}
                        transition={{
                          duration: 12,
                          times: [0, 0.72, 0.8, 0.85, 0.88, 0.93, 0.96, 1],
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                        whileHover={{ scale: 1.02, backgroundColor: '#f3e8ff' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Share2 className="w-3 h-3" />
                        <span>Share</span>
                      </motion.button>
                    </div>
                  </div>

                </div>

                {/* Floating Background Blobs */}
                <motion.div
                  className="absolute -right-8 -bottom-8 w-40 h-40 bg-purple-200 rounded-full opacity-30 blur-3xl"
                  style={{
                    transform: 'translateZ(-50px)',
                  }}
                  variants={blobVariants}
                  animate="animate"
                />
                <motion.div
                  className="absolute -top-8 -left-8 w-36 h-36 bg-blue-200 rounded-full opacity-20 blur-3xl"
                  style={{
                    transform: 'translateZ(-50px)',
                  }}
                  variants={blobVariants}
                  animate="animate"
                  transition={{ delay: 2 }}
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6 shadow-sm">
              <FileText className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-base font-semibold text-purple-700">How It Works</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
              How <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Gallite Invoice</span> Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Experience the fastest way to create, customize, and send professional invoices—no learning curve or extra cost.
              Gallite Invoice guides you from details to delivery in just three steps, helping you impress clients and speed up payments.
            </p>
          </motion.div>

          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-10 items-start mb-20">
            {/* Card - left aligned, top */}
            <motion.div
              className="w-full max-w-xl justify-self-start flex justify-center items-start"
              initial={{ opacity: 0, scale: 0.95, x: -40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-purple-100 rounded-[32px] shadow-2xl px-9 py-8 w-full">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 rounded-xl p-3 mr-3">
                    <FileText className="w-7 h-7 text-purple-700" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">Edit Invoice</span>
                </div>
                <div className="w-full h-[3px] mb-6 rounded bg-purple-100" />
                <div className="space-y-6">
                  <div>
                    <div className="text-base text-gray-700 mb-2 font-semibold">Company Information</div>
                    <div className="bg-purple-100 h-3 rounded mb-1 w-4/5"></div>
                    <div className="bg-purple-100 h-3 rounded w-3/4"></div>
                  </div>
                  <div>
                    <div className="text-base text-gray-700 mb-2 font-semibold">Client Details</div>
                    <div className="bg-purple-100 h-3 rounded mb-1 w-3/5"></div>
                    <div className="bg-purple-100 h-3 rounded w-2/3"></div>
                  </div>
                  <div>
                    <div className="text-base text-gray-700 mb-2 font-semibold">Invoice Items</div>
                    <div className="bg-purple-100 h-3 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Content - right, vertically centered */}
            <motion.div
              className="w-full max-w-xl justify-self-end self-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl px-7 py-2 font-bold text-lg shadow-md mb-4">01</span>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Enter Your Details</h3>
              <p className="text-lg text-gray-700 mb-4">
                Fill in your company, client, and invoice items with descriptions, quantities, and prices. Select currency and automate calculations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800 text-base">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Add unlimited line items with automatic calculations
                </li>
                <li className="flex items-center text-gray-800 text-base">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Include payment terms, notes, and tax rates
                </li>
                <li className="flex items-center text-gray-800 text-base">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Upload your company logo for branding
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-10 items-start mb-20">
            {/* Content - left, vertically centered */}
            <motion.div
              className="w-full max-w-xl justify-self-start self-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl px-7 py-2 font-bold text-lg shadow-md mb-4">02</span>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Choose a Template</h3>
              <p className="text-lg text-gray-700 mb-4">
                Switch to the Preview tab and select from 5 professionally designed templates. Each template offers a unique aesthetic to match your brand identity and industry.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800 text-base">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Modern: Clean and contemporary design
                </li>
                <li className="flex items-center text-gray-800 text-base">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Classic: Traditional business invoice
                </li>
                <li className="flex items-center text-gray-800 text-base">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Minimal, Bold, Elegant: Unique styles for every need
                </li>
              </ul>
            </motion.div>
            {/* Card - right, top-aligned */}
            <motion.div
              className="w-full max-w-xl justify-self-end flex justify-center items-start"
              initial={{ opacity: 0, scale: 0.95, x: 40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-purple-100 rounded-[32px] shadow-2xl px-9 py-8 w-full">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 rounded-xl p-3 mr-3">
                    <Eye className="w-7 h-7 text-purple-700" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">Preview & Share</span>
                </div>
                <div className="w-full h-[3px] mb-6 rounded bg-purple-100" />
                <div className="flex gap-2 mb-5">
                  <button className="flex-1 py-2 bg-purple-600 text-white rounded-lg text-base font-semibold shadow-sm">Modern</button>
                  <button className="flex-1 py-2 bg-white border border-purple-200 text-purple-700 rounded-lg text-base font-semibold shadow-sm">Classic</button>
                  <button className="flex-1 py-2 bg-white border border-purple-200 text-purple-700 rounded-lg text-base font-semibold shadow-sm">Minimal</button>
                </div>
                <div className="bg-purple-50 rounded-lg px-4 py-5 space-y-3">
                  <div className="h-4 rounded bg-gray-800 w-1/2 mb-3"></div>
                  <div className="h-3 rounded bg-purple-100 w-2/4 mb-3"></div>
                  <div className="h-3 rounded bg-purple-100 w-5/6 mb-2"></div>
                  <div className="h-3 rounded bg-purple-100 w-3/4 mb-2"></div>
                  <div className="h-3 rounded bg-purple-100 w-1/2 mb-2"></div>
                  <div className="h-4 rounded bg-purple-600 w-1/4 mt-6 ml-auto"></div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Card - left, top-aligned */}
            <motion.div
              className="w-full max-w-xl justify-self-start flex justify-center items-start"
              initial={{ opacity: 0, scale: 0.95, x: -40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.17 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-purple-100 rounded-[32px] shadow-2xl px-9 py-8 w-full">
                <div className="flex gap-4 mb-6">
                  <button className="flex-1 py-3 bg-white border border-purple-200 rounded-lg text-purple-700 font-semibold shadow-sm flex items-center justify-center gap-2 text-base">
                    <ArrowDown className="w-6 h-6 mr-1 text-purple-700" />
                    Download PDF
                  </button>
                  <button className="flex-1 py-3 bg-white border border-purple-200 rounded-lg text-purple-700 font-semibold shadow-sm flex items-center justify-center gap-2 text-base">
                    <Mail className="w-6 h-6 mr-1 text-purple-700" />
                    Send Email
                  </button>
                </div>
                <div className="bg-purple-50 rounded-lg p-5 mb-4 flex flex-col gap-3">
                  <div className="flex justify-between mb-2">
                    <div className="h-4 rounded bg-gray-800 w-2/5"></div>
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">Ready to Share</span>
                  </div>
                  <div className="h-3 rounded bg-purple-100 w-4/5"></div>
                  <div className="h-3 rounded bg-purple-100 w-3/5"></div>
                  <div className="h-3 rounded bg-purple-100 w-full mb-2"></div>
                  <div className="flex justify-end">
                    <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold">Total: $3,800.00</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-bold shadow-lg text-base flex items-center justify-center gap-2 mt-1">
                  <Printer className="w-7 h-7 mr-2" />
                  Print Invoice
                </button>
              </div>
            </motion.div>
            {/* Content - right, vertically centered */}
            <motion.div
              className="w-full max-w-xl justify-self-end self-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl px-7 py-2 font-bold text-lg shadow-md mb-4">03</span>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Export & Share</h3>
              <p className="text-lg text-gray-700 mb-4">
                Once you're happy with your invoice, export it as a PDF, print it directly, or send it via email to your client. All actions are quick and easy with just one click.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800 text-base">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Download high-quality PDF files instantly
                </li>
                <li className="flex items-center text-gray-800 text-base">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Print directly from your browser
                </li>
                <li className="flex items-center text-gray-800 text-base">
                  <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                  Quick email integration with customizable messages
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Template Showcase Section - Complete with All Updates */}
      <section id="templates" className="bg-white py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <FileText className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">Professional Invoice Templates</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Free Invoice Templates for{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Every Business
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Choose from our collection of professionally designed invoice templates. Perfect for freelancers, small businesses, agencies, and consultants. Each template is fully customizable and ready to use.
            </p>

            {/* SEO Keywords Section */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {['Free Invoice Generator', 'Professional Invoice Templates', 'Business Billing', 'Freelance Invoicing'].map((keyword, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Templates Grid - Equal Height Cards with Reordered Templates */}
          <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Template 1 - Modern (Blue) */}
            <motion.div
              className="group relative h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 overflow-hidden cursor-pointer h-full flex flex-col"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Template Preview - Modern Blue */}
                <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-blue-200 h-48">
                  <div className="mb-3">
                    <div className="h-3 w-24 bg-blue-600 rounded mb-1"></div>
                    <div className="h-2 w-16 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex justify-between items-start mb-4 text-xs">
                    <div>
                      <div className="h-1.5 w-12 bg-blue-600 rounded mb-1"></div>
                      <div className="h-1 w-16 bg-gray-200 rounded mb-0.5"></div>
                      <div className="h-1 w-14 bg-gray-200 rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-1.5 w-12 bg-blue-600 rounded mb-1"></div>
                      <div className="h-1 w-16 bg-gray-200 rounded mb-0.5"></div>
                      <div className="h-1 w-14 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-blue-600 rounded mb-2"></div>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-gray-200 rounded"></div>
                    <div className="h-1 w-4/5 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Modern</h3>
                    <motion.div
                      className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, backgroundColor: '#3B82F6' }}
                    >
                      <CheckCircle className="w-4 h-4 text-blue-600 group-hover:text-white" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-600 flex-1">
                    Clean blue design with professional layout perfect for tech companies.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      Tech-Friendly
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      Professional
                    </span>
                  </div>
                  <div className="pt-2 text-xs text-gray-500">
                    Best for: Software developers, IT consultants
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-blue-500/90 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <motion.button
                    className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow-lg mb-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Use This Template
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Template 2 - Classic (Black/Gray) */}
            <motion.div
              className="group relative h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 overflow-hidden cursor-pointer h-full flex flex-col"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(75, 85, 99, 0.2)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Template Preview - Classic Black */}
                <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-300 h-48">
                  <div className="mb-3">
                    <div className="h-3 w-24 bg-gray-900 rounded mb-2"></div>
                    <div className="h-px w-full bg-gray-900"></div>
                  </div>
                  <div className="flex justify-between mb-4 text-xs">
                    <div>
                      <div className="h-1.5 w-10 bg-gray-600 rounded mb-1"></div>
                      <div className="h-1 w-16 bg-gray-300 rounded mb-0.5"></div>
                      <div className="h-1 w-14 bg-gray-300 rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-1.5 w-10 bg-gray-600 rounded mb-1"></div>
                      <div className="h-1 w-16 bg-gray-300 rounded mb-0.5"></div>
                      <div className="h-1 w-14 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-1 mb-2">
                    <div className="h-1 w-full bg-gray-200 rounded"></div>
                    <div className="h-1 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-px w-full bg-gray-300 my-2"></div>
                  <div className="h-6 bg-gray-900 rounded"></div>
                </div>

                {/* Template Info */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Classic</h3>
                    <motion.div
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, backgroundColor: '#1F2937' }}
                    >
                      <CheckCircle className="w-4 h-4 text-gray-600 group-hover:text-white" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-600 flex-1">
                    Traditional black and white invoice ideal for corporate businesses.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      Traditional
                    </span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      Corporate
                    </span>
                  </div>
                  <div className="pt-2 text-xs text-gray-500">
                    Best for: Law firms, accountants, businesses
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-gray-800/90 to-gray-700/90 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <motion.button
                    className="px-6 py-3 bg-white text-gray-800 rounded-lg font-semibold shadow-lg mb-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Use This Template
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Template 3 - Bold (Orange/Red Gradient) */}
            <motion.div
              className="group relative h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 overflow-hidden cursor-pointer h-full flex flex-col"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(249, 115, 22, 0.2)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Template Preview - Bold Orange/Red */}
                <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-orange-200 h-48">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded p-2 mb-3">
                    <div className="h-2.5 w-20 bg-white rounded mb-1"></div>
                    <div className="h-1.5 w-12 bg-white/80 rounded"></div>
                  </div>
                  <div className="flex justify-between mb-3 text-xs">
                    <div>
                      <div className="h-1.5 w-10 bg-orange-600 rounded mb-1"></div>
                      <div className="h-1 w-16 bg-gray-200 rounded mb-0.5"></div>
                      <div className="h-1 w-12 bg-gray-200 rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-1.5 w-10 bg-gray-700 rounded mb-1"></div>
                      <div className="h-1 w-16 bg-gray-200 rounded mb-0.5"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-gray-200 rounded"></div>
                    <div className="h-1 w-4/5 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Bold</h3>
                    <motion.div
                      className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, backgroundColor: '#F97316' }}
                    >
                      <CheckCircle className="w-4 h-4 text-orange-600 group-hover:text-white" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-600 flex-1">
                    Vibrant orange-red gradient for businesses that want to stand out.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                      Bold
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                      Energetic
                    </span>
                  </div>
                  <div className="pt-2 text-xs text-gray-500">
                    Best for: Marketing agencies, event planners
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-red-600/90 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <motion.button
                    className="px-6 py-3 bg-white text-orange-600 rounded-lg font-semibold shadow-lg mb-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Use This Template
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Template 4 - Minimal (Gray/Simple) */}
            <motion.div
              className="group relative h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 overflow-hidden cursor-pointer h-full flex flex-col"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(100, 116, 139, 0.2)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Template Preview - Minimal */}
                <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-slate-200 h-48">
                  <div className="mb-3">
                    <div className="h-3 w-20 bg-slate-700 rounded mb-1"></div>
                    <div className="h-1.5 w-14 bg-slate-400 rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div>
                      <div className="h-1 w-8 bg-slate-400 rounded mb-1"></div>
                      <div className="h-1 w-16 bg-slate-200 rounded mb-0.5"></div>
                      <div className="h-1 w-12 bg-slate-200 rounded"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-1 w-8 bg-slate-400 rounded mb-1 ml-auto"></div>
                      <div className="h-1 w-16 bg-slate-200 rounded mb-0.5 ml-auto"></div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1 w-full bg-slate-200 rounded"></div>
                    <div className="h-1 w-5/6 bg-slate-200 rounded"></div>
                    <div className="h-1 w-4/5 bg-slate-200 rounded"></div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Minimal</h3>
                    <motion.div
                      className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, backgroundColor: '#475569' }}
                    >
                      <CheckCircle className="w-4 h-4 text-slate-600 group-hover:text-white" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-600 flex-1">
                    Ultra-clean minimalist design perfect for modern professionals.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      Minimalist
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      Clean
                    </span>
                  </div>
                  <div className="pt-2 text-xs text-gray-500">
                    Best for: Designers, consultants, freelancers
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-slate-600/90 to-slate-500/90 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <motion.button
                    className="px-6 py-3 bg-white text-slate-600 rounded-lg font-semibold shadow-lg mb-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Use This Template
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Template 5 - Elegant (Purple/Pink Gradient) */}
            <motion.div
              className="group relative h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg border-2 border-gray-200 overflow-hidden cursor-pointer h-full flex flex-col"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.2)' }}
                transition={{ duration: 0.3 }}
              >
                {/* Template Preview - Elegant Purple/Pink */}
                <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-purple-200 h-48">
                  <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded p-2 mb-3">
                    <div className="h-2.5 w-16 bg-white rounded mb-1"></div>
                    <div className="h-1.5 w-10 bg-white/90 rounded"></div>
                  </div>
                  <div className="flex justify-between mb-3">
                    <div>
                      <div className="h-1.5 w-12 bg-purple-600 rounded mb-1"></div>
                      <div className="h-1 w-16 bg-gray-200 rounded mb-0.5"></div>
                    </div>
                    <div className="text-right">
                      <div className="h-1.5 w-14 bg-gray-700 rounded mb-1"></div>
                      <div className="h-1 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-gray-200 rounded"></div>
                    <div className="h-1 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-2 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Elegant</h3>
                    <motion.div
                      className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, backgroundColor: '#A855F7' }}
                    >
                      <CheckCircle className="w-4 h-4 text-purple-600 group-hover:text-white" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-gray-600 flex-1">
                    Sophisticated purple-pink gradient for creative businesses.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      Elegant
                    </span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                      Creative
                    </span>
                  </div>
                  <div className="pt-2 text-xs text-gray-500">
                    Best for: Beauty salons, photographers, luxury
                  </div>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-pink-600/90 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <motion.button
                    className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold shadow-lg mb-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Use This Template
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Request More Templates Card */}
            <motion.div
              className="group relative h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border-2 border-dashed border-gray-300 overflow-hidden cursor-pointer h-full flex flex-col justify-center"
                whileHover={{ y: -8, borderColor: '#9333EA' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Need More Templates?</h3>
                  <p className="text-sm text-gray-600 text-center mb-4 px-2">
                    Looking for industry-specific templates? Contact us and we'll create them based on demand.
                  </p>
                  <motion.button
                    className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm rounded-xl space-x-2 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Request Template</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Built based on customer demand
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>


          {/* CTA Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handleCreateClick}
              className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-base rounded-xl shadow-lg space-x-2 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(147,51,234,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Try All Templates Free</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <p className="text-gray-600 mt-4 text-sm">Join thousands of businesses using Gallite Invoice</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="relative bg-gradient-to-br from-purple-100 via-white to-blue-100 py-20 px-4 overflow-hidden border-y border-purple-200">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-purple-600 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-4 h-4 text-white mr-2" />
              <span className="text-sm font-medium text-white">Start Creating Today</span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to Create Your <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                First Invoice?
              </span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of small businesses creating professional invoices for free
            </motion.p>

            {/* CTA Button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="group px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Try Gallite Invoice for Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <FileText className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">Frequently Asked Questions</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Got Questions About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Gallite Invoice?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our free invoice generator
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {[
              {
                question: "Is this invoice generator really free?",
                answer: "Yes! Our invoice generator is 100% free with no hidden charges, no subscriptions, and no premium upgrades. You can create unlimited invoices, download professional PDFs, and use all features without paying anything."
              },
              {
                question: "Do I need to create an account to use this invoice generator?",
                answer: "Yes, you need to sign in to use the invoice generator. This helps save your invoices securely and allows you to access them anytime. The sign-in process is quick and simple - just enter your email and password to get started."
              },
              {
                question: "Where is my invoice data stored?",
                answer: "All your invoices are stored locally in your browser's storage on this device. Your data never gets uploaded to any server, ensuring complete privacy. However, if you clear your browser cache, cookies, or use incognito mode, your invoices will be permanently deleted. We recommend downloading important invoices as backup."
              },
              {
                question: "What format are the invoices downloaded in?",
                answer: "Invoices are downloaded as professional PDF files with no watermarks. PDFs are universally compatible and can be easily emailed, printed, or shared with your clients."
              },
              {
                question: "Can I add taxes and discounts to my invoices?",
                answer: "Yes! You can easily add tax rates (like GST, VAT, sales tax) and the system automatically calculates the total. You can customize your invoice with itemized descriptions, quantities, rates, and amounts."
              },
              {
                question: "Can I track payment status for my invoices?",
                answer: "Yes, you can mark invoices as paid or pending with payment dates. You can also choose between a paid stamp or text indicator on your invoice. Our dashboard helps you keep track of all your invoices and outstanding payments in one place."
              }
            ].map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
