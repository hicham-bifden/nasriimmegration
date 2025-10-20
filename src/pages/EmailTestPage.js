import React from 'react';
import Page from '../components/Page';
import EmailTest from '../components/EmailTest';
import '../pages/Pages.css';

const EmailTestPage = () => {
  return (
    <Page title="Test EmailJS">
      <EmailTest />
    </Page>
  );
};

export default EmailTestPage;
