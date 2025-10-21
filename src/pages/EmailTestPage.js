import React from 'react';
import PageTemplate from '../components/PageTemplate';
import EmailTest from '../components/EmailTest';
import '../pages/Pages.css';

const EmailTestPage = () => {
  return (
    <PageTemplate title="Test EmailJS">
      <EmailTest />
    </PageTemplate>
  );
};

export default EmailTestPage;
