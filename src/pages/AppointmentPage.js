import React from 'react';
import PageTemplate from '../components/PageTemplate';
import AppointmentBooking from '../components/AppointmentBooking';
import '../pages/Pages.css';

const AppointmentPage = () => {
  return (
    <PageTemplate title="Prendre un Rendez-vous">
      <AppointmentBooking />
    </PageTemplate>
  );
};

export default AppointmentPage;
