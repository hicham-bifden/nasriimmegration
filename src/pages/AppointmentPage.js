import React from 'react';
import Page from '../components/Page';
import AppointmentBooking from '../components/AppointmentBooking';
import '../pages/Pages.css';

const AppointmentPage = () => {
  return (
    <Page title="Prendre un Rendez-vous">
      <AppointmentBooking />
    </Page>
  );
};

export default AppointmentPage;
