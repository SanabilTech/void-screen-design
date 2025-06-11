
import React from "react";

const OrderReviewStyles: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        @property --angle {
          syntax: '<angle>';
          initial-value: 90deg;
          inherits: true;
        }
        
        .animated-border {
          --d: 3500ms;
          --angle: 90deg;
          --c1: rgba(37, 155, 127, 1);
          --c2: rgba(37, 155, 127, 0.1);
          border: 2px solid;
          border-radius: 0.75rem;
          border-image: conic-gradient(from var(--angle), var(--c2), var(--c1) 0.1turn, var(--c1) 0.15turn, var(--c2) 0.25turn) 30;
          animation: borderRotate var(--d) linear infinite forwards;
        }
        
        @keyframes borderRotate {
          100% {
            --angle: 420deg;
          }
        }
      `
    }} />
  );
};

export default OrderReviewStyles;
