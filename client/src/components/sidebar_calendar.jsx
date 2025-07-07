import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css'

const CalendarDisplay = () => {
    const [value, setValue] = useState(new Date());

    return(
        <div className="card mb-4 calendar-card">
            <Calendar onChange={setValue} value={value} className="w-100" formatShortWeekday={(locale, date) =>date.toLocaleDateString(locale, { weekday: "short" }).slice(0, 2)}></Calendar>
        </div>
    );
}

export default CalendarDisplay;