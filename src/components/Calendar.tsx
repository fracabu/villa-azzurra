import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { content } from '../data/content';
import { getPriceForDate, getSeasonType, formatPrice } from '../utils/pricingUtils';

interface CalendarProps {
  currentLanguage: 'it' | 'en';
}

const Calendar: React.FC<CalendarProps> = ({ currentLanguage }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarContent = content.calendar[currentLanguage];

  // Sample booked dates (in a real app, this would come from a database)
  const bookedDates = [
    '2024-12-25', '2024-12-26', '2024-12-27', '2024-12-28', '2024-12-29', '2024-12-30', '2024-12-31',
    '2025-01-01', '2025-01-02', '2025-01-03',
    '2025-01-15', '2025-01-16', '2025-01-17', '2025-01-18', '2025-01-19', '2025-01-20', '2025-01-21',
    '2025-02-14', '2025-02-15', '2025-02-16',
    '2025-03-20', '2025-03-21', '2025-03-22', '2025-03-23', '2025-03-24', '2025-03-25', '2025-03-26'
  ];

  const monthNames = currentLanguage === 'it' 
    ? ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = currentLanguage === 'it'
    ? ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDay = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const isDateBooked = (day: number | null) => {
    if (!day) return false;
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookedDates.includes(dateString);
  };

  const isPastDate = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return checkDate < today;
  };

  const getDayPrice = (day: number | null) => {
    if (!day) return null;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return getPriceForDate(date);
  };

  const getDaySeason = (day: number | null) => {
    if (!day) return null;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return getSeasonType(date);
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const days = getDaysInMonth(currentDate);

  return (
    <section id="availability" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {calendarContent.title}
          </h2>
          <p className="text-lg text-gray-600">
            {calendarContent.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft size={24} className="text-gray-600" />
              </button>
              <h3 className="text-xl font-semibold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`aspect-square flex flex-col items-center justify-center text-xs rounded-lg transition-colors relative ${
                    !day 
                      ? '' 
                      : isPastDate(day)
                      ? 'text-gray-300 cursor-not-allowed'
                      : isDateBooked(day)
                      ? 'bg-red-100 text-red-700 cursor-not-allowed border border-red-200'
                      : getDaySeason(day) === 'high'
                      ? 'bg-blue-50 text-blue-800 hover:bg-blue-100 cursor-pointer border border-blue-200'
                      : 'bg-green-50 text-green-800 hover:bg-green-100 cursor-pointer border border-green-200'
                  }`}
                >
                  {day && (
                    <>
                      <span className="font-medium">{day}</span>
                      {!isPastDate(day) && !isDateBooked(day) && (
                        <span className="text-xs font-semibold">
                          {formatPrice(getDayPrice(day) || 0)}
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">{calendarContent.legend}:</h4>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
                  <span className="text-gray-600">
                    {currentLanguage === 'it' ? 'Alta Stagione' : 'High Season'} (€250/notte)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                  <span className="text-gray-600">
                    {currentLanguage === 'it' ? 'Bassa Stagione' : 'Low Season'} (€180/notte)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
                  <span className="text-gray-600">{calendarContent.booked}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;