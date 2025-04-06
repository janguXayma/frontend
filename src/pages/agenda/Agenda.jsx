import React, { useState } from 'react';

const Agenda = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState([
        {
            id: 1,
            title: 'Réunion équipe',
            description: 'Revue des objectifs trimestriels',
            date: new Date(2024, 2, 15, 10, 0),
        },
    ]);

    const getCalendarDays = (date) => {
        const startDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const startWeekday = (startDay.getDay() + 6) % 7;
        const endWeekday = (endDay.getDay() + 6) % 7;
        
        const days = [];
        
        // Jours du mois précédent
        for (let i = startWeekday - 1; i >= 0; i--) {
            const day = new Date(startDay);
            day.setDate(day.getDate() - i - 1);
            days.push(day);
        }
        
        // Jours du mois courant
        for (let i = 1; i <= endDay.getDate(); i++) {
            days.push(new Date(date.getFullYear(), date.getMonth(), i));
        }
        
        // Jours du mois suivant
        for (let i = 1; i <= 6 - endWeekday; i++) {
            const day = new Date(endDay);
            day.setDate(day.getDate() + i);
            days.push(day);
        }
        
        return days;
    };

    const isToday = (date) => isSameDay(date, new Date());
    const isSameDay = (a, b) => a.toDateString() === b.toDateString();

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const handleAddEvent = () => {
        const newEvent = {
            id: Date.now(),
            title: 'Nouvel événement',
            description: 'Description par défaut',
            date: new Date(selectedDate),
        };
        setEvents([...events, newEvent]);
    };

    return (
        <div className="p-6 bg-base-100 rounded-xl shadow-lg">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-base-content">
                            {currentDate.toLocaleDateString('fr-FR', { 
                                month: 'long', 
                                year: 'numeric' 
                            })}
                        </h2>
                        <div className="join">
                            <button 
                                className="join-item btn btn-sm btn-ghost"
                                onClick={handlePrevMonth}
                            >
                                ❮
                            </button>
                            <button 
                                className="join-item btn btn-sm btn-ghost"
                                onClick={() => setCurrentDate(new Date())}
                            >
                                Aujourd'hui
                            </button>
                            <button 
                                className="join-item btn btn-sm btn-ghost"
                                onClick={handleNextMonth}
                            >
                                ❯
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-px mb-1 text-center text-sm font-medium">
                        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                            <div key={day} className="py-2 bg-base-200">{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-px bg-base-200 rounded-box overflow-hidden">
                        {getCalendarDays(currentDate).map((date, index) => (
                            <div 
                                key={index}
                                className={`min-h-24 p-2 bg-base-100 hover:bg-base-200 transition-colors cursor-pointer
                                    ${date.getMonth() !== currentDate.getMonth() ? 'text-neutral/50' : ''}
                                    ${isToday(date) ? '!bg-primary/20' : ''}`}
                                onClick={() => setSelectedDate(date)}
                            >
                                <div className="flex justify-between items-center">
                                    <span className={`text-sm ${isToday(date) ? 'font-bold text-primary' : ''}`}>
                                        {date.getDate()}
                                    </span>
                                    {events.filter(e => isSameDay(e.date, date)).length > 0 && (
                                        <div className="badge badge-xs badge-primary"></div>
                                    )}
                                </div>
                                
                                <div className="mt-1 space-y-1">
                                    {events.filter(e => isSameDay(e.date, date)).map(event => (
                                        <div 
                                            key={event.id}
                                            className="text-xs p-1 rounded bg-secondary text-secondary-content truncate"
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-80">
                    <div className="bg-base-200 p-4 rounded-box">
                        <h3 className="font-bold mb-4">
                            {selectedDate.toLocaleDateString('fr-FR', { 
                                weekday: 'long', 
                                day: 'numeric', 
                                month: 'long' 
                            })}
                        </h3>
                        
                        <div className="space-y-4">
                            {events.filter(e => isSameDay(e.date, selectedDate)).map(event => (
                                <div key={event.id} className="bg-base-100 p-3 rounded-box shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium">{event.title}</h4>
                                            <p className="text-sm text-neutral/70">{event.description}</p>
                                        </div>
                                        <div className="text-xs text-neutral/50">
                                            {event.date.toLocaleTimeString('fr-FR', { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <button 
                                className="btn btn-sm btn-block btn-accent"
                                onClick={handleAddEvent}
                            >
                                + Ajouter un événement
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Agenda;