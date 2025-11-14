
import React from 'react';

const BankIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="10" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <path d="M21 12a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2" />
    <path d="m12 16 0 0" />
  </svg>
);

export default BankIcon;
