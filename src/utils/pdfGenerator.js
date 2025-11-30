import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId, filename = 'invoice.pdf') => {
  try {
    const originalElement = document.getElementById(elementId);
    if (!originalElement) {
      throw new Error('Element not found');
    }

    // Clone the element to avoid visual disruption
    const clonedElement = originalElement.cloneNode(true);
    clonedElement.id = 'pdf-clone-temp';
    
    // Style the clone for PDF generation (off-screen)
    clonedElement.style.position = 'fixed';
    clonedElement.style.top = '-9999px';
    clonedElement.style.left = '-9999px';
    clonedElement.style.width = '210mm'; // A4 width
    clonedElement.style.maxWidth = '210mm';
    clonedElement.style.minWidth = '210mm';
    clonedElement.style.transform = 'scale(1)';
    clonedElement.style.margin = '0';
    clonedElement.style.backgroundColor = '#ffffff';
    
    // Append to body (off-screen)
    document.body.appendChild(clonedElement);

    // Wait for layout
    await new Promise(resolve => setTimeout(resolve, 100));

    // Create canvas from cloned element
    const canvas = await html2canvas(clonedElement, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 794, // A4 width in pixels
      width: 794,
      height: clonedElement.scrollHeight,
    });

    // Remove cloned element immediately after capture
    document.body.removeChild(clonedElement);

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Center and fit properly
    if (imgHeight <= pdfHeight) {
      // Fits in one page
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    } else {
      // Multiple pages
      let position = 0;
      const pageHeight = pdfHeight;
      
      while (position < imgHeight) {
        if (position > 0) {
          pdf.addPage();
        }
        
        pdf.addImage(
          imgData,
          'PNG',
          0,
          -position,
          imgWidth,
          imgHeight,
          undefined,
          'FAST'
        );
        
        position += pageHeight;
      }
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Clean up any leftover clone
    const clone = document.getElementById('pdf-clone-temp');
    if (clone) {
      document.body.removeChild(clone);
    }
    
    return false;
  }
};

export const printInvoice = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found for printing');
    return;
  }

  // Create print window with properly styled content
  const printWindow = window.open('', '_blank');
  
  // Get all stylesheets
  const styles = Array.from(document.styleSheets)
    .map(styleSheet => {
      try {
        return Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');
      } catch (e) {
        return '';
      }
    })
    .join('\n');

  printWindow.document.write(`
    <html>
      <head>
        <title>Print Invoice</title>
        <style>
          ${styles}
          
          @page {
            size: A4;
            margin: 0;
          }
          
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
          }
          
          #invoice-template {
            width: 210mm !important;
            max-width: 210mm !important;
            min-width: 210mm !important;
            margin: 0 auto;
            transform: scale(1) !important;
            background: white;
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              setTimeout(function() {
                window.close();
              }, 100);
            }, 500);
          };
        </script>
      </body>
    </html>
  `);

  printWindow.document.close();
};
