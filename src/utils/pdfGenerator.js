import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (elementId, filename = 'invoice.pdf') => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Store viewport
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    const originalViewport = viewportMeta?.getAttribute('content');
    
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=1200');
    }

    // Wait for layout
    await new Promise(resolve => setTimeout(resolve, 300));

    // Create canvas with exact sizing
    const canvas = await html2canvas(element, {
      scale: 2.5, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdfWidth = 210; // A4 width
    const pdfHeight = 297; // A4 height
    
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Center and fit properly
    if (imgHeight <= pdfHeight) {
      // Fits in one page
      const yOffset = (pdfHeight - imgHeight) / 4; // Add small top margin
      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight, undefined, 'FAST');
    } else {
      // Scale to fit page with margins
      const margin = 10; // 10mm margins
      const availableWidth = pdfWidth - (margin * 2);
      const availableHeight = pdfHeight - (margin * 2);
      
      const scaleFactor = Math.min(
        availableWidth / imgWidth,
        availableHeight / imgHeight
      );
      
      const scaledWidth = imgWidth * scaleFactor;
      const scaledHeight = imgHeight * scaleFactor;
      const xOffset = (pdfWidth - scaledWidth) / 2;
      const yOffset = margin;
      
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight, undefined, 'FAST');
    }

    // Restore viewport
    if (viewportMeta && originalViewport) {
      viewportMeta.setAttribute('content', originalViewport);
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
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

  const viewportMeta = document.querySelector('meta[name="viewport"]');
  const originalViewport = viewportMeta?.getAttribute('content');

  if (viewportMeta) {
    viewportMeta.setAttribute('content', 'width=1200');
  }

  setTimeout(() => {
    window.print();
    
    setTimeout(() => {
      if (viewportMeta && originalViewport) {
        viewportMeta.setAttribute('content', originalViewport);
      }
    }, 100);
  }, 250);
};
