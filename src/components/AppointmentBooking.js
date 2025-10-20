import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import emailjs from '@emailjs/browser';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { EMAILJS_CONFIG } from '../config/emailjs';
import AppointmentService from '../services/appointmentService';
import './AppointmentBooking.css';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  const services = [
    'Consultation Visa',
    'Demande de Green Card',
    'Préparation PTE',
    'Préparation TOEFL',
    'Admission Universitaire',
    'Autre'
  ];

  // Charger les créneaux disponibles
  const loadAvailableSlots = useCallback(async () => {
    setIsLoadingSlots(true);
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const result = await AppointmentService.getAvailableSlots(dateStr);
      setAvailableSlots(result.available_slots || []);
    } catch (error) {
      console.error('Erreur chargement créneaux:', error);
      setAvailableSlots([
        '09:00:00','09:30:00','10:00:00','10:30:00','11:00:00','11:30:00',
        '14:00:00','14:30:00','15:00:00','15:30:00','16:00:00','16:30:00'
      ]);
    }
    setIsLoadingSlots(false);
  }, [selectedDate]);

  useEffect(() => {
    loadAvailableSlots();
  }, [loadAvailableSlots]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      setSubmitStatus('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    const appointmentData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      appointment_date: selectedDate.toISOString().split('T')[0],
      appointment_time: selectedTime,
      message: formData.message
    };

    try {
      const dbResult = await AppointmentService.createAppointment(appointmentData);

      const emailData = {
        ...appointmentData,
        date: selectedDate.toLocaleDateString('fr-FR')
      };

      const { serviceId, templateId, templateConfirmationId, publicKey } = EMAILJS_CONFIG;

      // Email admin
      await emailjs.send(
        serviceId,
        templateId,
        {
          ...emailData,
          to_email: 'hicham.bifden@gmail.com',
          subject: 'Nouveau rendez-vous - Immigway'
        },
        publicKey
      );

      // Email client
      await emailjs.send(
        serviceId,
        templateConfirmationId,
        {
          ...emailData,
          to_email: formData.email,
          subject: 'Confirmation de votre rendez-vous - Immigway'
        },
        publicKey
      );

      setSubmitStatus(`✅ Rendez-vous confirmé ! ID: ${dbResult.appointment.id}. Vous recevrez un email de confirmation.`);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      setSelectedTime('');

      // Recharger les créneaux
      loadAvailableSlots();

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus(`❌ Erreur: ${error.message}`);
    }

    setIsSubmitting(false);
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="appointment-booking">
      <div className="container">
        <div className="appointment-header">
          <h2>Prendre un Rendez-vous</h2>
          <p>Planifiez votre consultation avec nos experts en immigration</p>
        </div>

        <div className="appointment-content">
          <div className="calendar-section">
            <h3><FaCalendarAlt /> Sélectionnez une date</h3>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileDisabled={isDateDisabled}
              minDate={new Date()}
              locale="fr-FR"
            />
          </div>

          <div className="form-section">
            <form onSubmit={handleSubmit} className="appointment-form">
              <div className="time-selection">
                <h3><FaClock /> Choisissez un créneau horaire</h3>
                {isLoadingSlots ? (
                  <div className="loading-slots">Chargement des créneaux disponibles...</div>
                ) : (
                  <div className="time-slots">
                    {availableSlots.length > 0 ? (
                      availableSlots.map(time => (
                        <button
                          key={time}
                          type="button"
                          className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time.substring(0,5)}
                        </button>
                      ))
                    ) : (
                      <div className="no-slots">Aucun créneau disponible pour cette date</div>
                    )}
                  </div>
                )}
              </div>

              <div className="form-fields">
                <div className="field-group">
                  <label htmlFor="name"><FaUser /> Nom complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre nom complet"
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="email"><FaEnvelope /> Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="phone"><FaPhone /> Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="service">Service souhaité</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Sélectionnez un service</option>
                    {services.map(service => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label htmlFor="message">Message (optionnel)</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Décrivez brièvement vos besoins..."
                  />
                </div>
              </div>

              <div className="appointment-summary">
                <h3>Résumé du rendez-vous</h3>
                <div className="summary-item"><strong>Date:</strong> {selectedDate.toLocaleDateString('fr-FR')}</div>
                <div className="summary-item"><strong>Heure:</strong> {selectedTime || 'Non sélectionnée'}</div>
                <div className="summary-item"><strong>Nom:</strong> {formData.name || 'Non renseigné'}</div>
                <div className="summary-item"><strong>Service:</strong> {formData.service || 'Non spécifié'}</div>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours...' : 'Confirmer le rendez-vous'}
              </button>

              {submitStatus && (
                <div className={`status-message ${submitStatus.includes('Erreur') ? 'error' : 'success'}`}>
                  {submitStatus}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
