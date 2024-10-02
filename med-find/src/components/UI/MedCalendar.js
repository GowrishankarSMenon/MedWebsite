import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './MedCalendar.css';  // Fixed import statement (no extra spaces)

// Removed import of 'moment/locale/en' because English is the default locale for moment

const localizer = momentLocalizer(moment);

// Helper function to generate random colors for medications
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function MedCalendar() {
  const [events, setEvents] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', color: getRandomColor() });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelectSlot = ({ start }) => {
    setCurrentSlot(start);
    setShowSidebar(true);
  };

  const handleAddMedication = () => {
    const existingEvent = events.find(event => event.start === currentSlot);
    if (existingEvent) {
      const updatedEvents = events.map(
        event => event.start === currentSlot
          ? { ...event, meds: [...event.meds, { ...newMed, color: getRandomColor() }] }
          : event
      );
      setEvents(updatedEvents);
    } else {
      setEvents([
        ...events,
        {
          start: currentSlot,
          end: currentSlot,
          meds: [{ ...newMed, color: getRandomColor() }],
        },
      ]);
    }

    setNewMed({ name: '', dosage: '', color: getRandomColor() });
    setShowSidebar(false);
  };

  return (
    <div className="calendar-container">
      <h1>Medication Schedule</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          className="form-control"
        />
      </div>

      <Calendar
        localizer={localizer}
        events={events.map(event => ({
          ...event,
          title: event.meds.map(med => `${med.name} (${med.dosage})`).join(', '),
        }))}
        selectable
        defaultView="week"
        views={['day', 'week']}
        date={selectedDate}
        onSelectSlot={handleSelectSlot}
        style={{ height: 500, margin: '0 auto', width: '80%' }}
        step={60} // One time slot per hour
        timeslots={1} // Ensure one timeslot per hour
        min={new Date(2024, 0, 1, 8, 0)} // Start time
        max={new Date(2024, 0, 1, 20, 0)} // End time
        className="rbc-calendar" // Custom class for calendar container
        dayLayoutAlgorithm="no-overlap" // Stack blocks vertically when overlapping
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.meds[0]?.color || '#000',
            color: 'white',
            padding: '5px',
            borderRadius: '4px',
            minHeight: '30px',
            overflowY: 'auto',
            fontWeight: 'bold',
            fontSize: '14px',
          },
        })}
        components={{
          event: ({ event }) => (
            <div className="rbc-event-stacked">
              <div>{event.title}</div>
            </div>
          ),
          timeSlotWrapper: ({ children }) => <div className="rbc-timeslot-wrapper">{children}</div>, // Ensuring structure remains
        }}
      />

      <div className={`sidebar ${showSidebar ? 'open' : ''}`}>
        <h2>Add Medication</h2>
        <label>
          Medication Name:
          <input
            type="text"
            value={newMed.name}
            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
          />
        </label>
        <label>
          Dosage:
          <input
            type="text"
            value={newMed.dosage}
            onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
          />
        </label>
        <button onClick={handleAddMedication}>Add Medication</button>
        <button onClick={() => setShowSidebar(false)}>Close</button>
      </div>
    </div>
  );
}

export default MedCalendar;
