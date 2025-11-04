import React from 'react';

const PaidStamp = ({ paidDate, template = 'modern' }) => {
  // Format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  // Adjusted positions to match PDF output in preview
  const positions = {
    modern: { top: '180px', right: '60px' },
    bold: { top: '140px', right: '40px' },
    elegant: { top: '180px', right: '60px' },
    minimal: { top: '60px', right: '80px' },
    classic: { top: '10px', right: '80px' },
  };

  const position = positions[template] || positions.modern;
  const formattedDate = formatDate(paidDate);

  return (
    <div style={{
      position: 'absolute',
      top: position.top,
      right: position.right,
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <div style={{
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        border: '6px solid #22c55e',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'rotate(-15deg)',
        position: 'relative'
      }}>
        {/* Inner circle border */}
        <div style={{
          position: 'absolute',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          border: '3px solid #22c55e',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }} />
        
        {/* Text content */}
        <div style={{
          textAlign: 'center',
          zIndex: 1
        }}>
          <div style={{
            fontSize: '36px',
            fontWeight: '900',
            color: '#22c55e',
            fontFamily: '"Arial Black", "Arial Bold", sans-serif',
            letterSpacing: '6px',
            lineHeight: '1',
            textTransform: 'uppercase'
          }}>
            PAID
          </div>
          <div style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#22c55e',
            marginTop: '6px',
            letterSpacing: '1px'
          }}>
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidStamp;
