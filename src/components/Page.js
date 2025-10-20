import React from 'react';
import './Page.css';

const Page = ({ title, children }) => {
  return (
    <div className="page">
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">Immigway Visa Agency - {title}</p>
        </div>
      </div>
      <div className="page-content">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Page;
