import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Mail, 
  TrendingUp, 
  Eye, 
  Check, 
  X, 
  Download,
  LogOut,
  BarChart3,
  PieChart,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { format, parseISO, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { it } from 'date-fns/locale';
import { 
  getAllBookings, 
  getAllContacts, 
  updateBookingStatus, 
  deleteBooking,
  generateICalFeed,
  BookingRecord,
  ContactRecord 
} from '../services/bookingService';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'contacts' | 'calendar'>('overview');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [contacts, setContacts] = useState<ContactRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [bookingsData, contactsData] = await Promise.all([
      getAllBookings(),
      getAllContacts()
    ]);
    setBookings(bookingsData);
    setContacts(contactsData);
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, status: BookingRecord['status']) => {
    await updateBookingStatus(id, status);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questa prenotazione?')) {
      await deleteBooking(id);
      loadData();
    }
  };

  const downloadICalFeed = () => {
    const icalContent = generateICalFeed(bookings);
    const blob = new Blob([icalContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'villa-azzurra-calendar.ics';
    a.click();
  };

  // Calcoli per metriche
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const totalContacts = contacts.length;
  const unreadContacts = contacts.filter(c => c.status === 'unread').length;

  // Dati per grafici
  const last6Months = eachMonthOfInterval({
    start: subMonths(new Date(), 5),
    end: new Date()
  });

  const monthlyBookings = last6Months.map(month => {
    const monthBookings = bookings.filter(booking => {
      if (!booking.timestamp?.toDate) return false;
      const bookingDate = booking.timestamp.toDate();
      return bookingDate >= startOfMonth(month) && bookingDate <= endOfMonth(month);
    });
    
    return {
      month: format(month, 'MMM', { locale: it }),
      prenotazioni: monthBookings.length,
      confermate: monthBookings.filter(b => b.status === 'confirmed').length
    };
  });

  const statusData = [
    { name: 'Confermate', value: confirmedBookings, color: '#10b981' },
    { name: 'In Attesa', value: pendingBookings, color: '#f59e0b' },
    { name: 'Cancellate', value: bookings.filter(b => b.status === 'cancelled').length, color: '#ef4444' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">VA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Villa Azzurra</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Panoramica', icon: BarChart3 },
              { id: 'bookings', label: 'Prenotazioni', icon: Calendar },
              { id: 'contacts', label: 'Contatti', icon: Mail },
              { id: 'calendar', label: 'Calendario', icon: Calendar }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Prenotazioni Totali</p>
                    <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">In Attesa</p>
                    <p className="text-2xl font-bold text-amber-600">{pendingBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Clock size={24} className="text-amber-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Confermate</p>
                    <p className="text-2xl font-bold text-green-600">{confirmedBookings}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Check size={24} className="text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Messaggi</p>
                    <p className="text-2xl font-bold text-purple-600">{totalContacts}</p>
                    {unreadContacts > 0 && (
                      <p className="text-sm text-red-600">{unreadContacts} non letti</p>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mail size={24} className="text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Bookings Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prenotazioni per Mese</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyBookings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="prenotazioni" fill="#3b82f6" />
                    <Bar dataKey="confermate" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Status Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuzione Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {statusData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gestione Prenotazioni</h2>
              <button
                onClick={downloadICalFeed}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Download size={20} />
                <span>Scarica iCal</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ospiti
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Importo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Azioni
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                            <div className="text-sm text-gray-500">{booking.email}</div>
                            {booking.phone && (
                              <div className="text-sm text-gray-500">{booking.phone}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {booking.checkin} → {booking.checkout}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{booking.guests}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.totalAmount ? (
                            <div className="text-sm">
                              <div className="font-semibold text-gray-900">
                                €{booking.totalAmount.toFixed(0)}
                              </div>
                              {booking.priceBreakdown && (
                                <div className="text-xs text-gray-500 space-y-1 mt-1">
                                  <div>Soggiorno: €{booking.priceBreakdown.accommodationTotal}</div>
                                  <div>Pulizia: €{booking.priceBreakdown.cleaningFee}</div>
                                  <div>Tassa soggiorno: €{booking.priceBreakdown.touristTax.toFixed(1)}</div>
                                  <div className="text-xs text-gray-400">
                                    {booking.priceBreakdown.nights} notti × {booking.guests} ospiti
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-sm text-gray-400">
                              Non calcolato
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusUpdate(booking.id, e.target.value as BookingRecord['status'])}
                            className={`text-sm rounded-full px-3 py-1 font-medium ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}
                          >
                            <option value="pending">In Attesa</option>
                            <option value="confirmed">Confermata</option>
                            <option value="cancelled">Cancellata</option>
                            <option value="completed">Completata</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="text-red-600 hover:text-red-900 ml-4"
                          >
                            <X size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Messaggi di Contatto</h2>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {contacts.map((contact) => (
                  <div key={contact.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-900">{contact.name}</h3>
                          {contact.status === 'unread' && (
                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                              Nuovo
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{contact.email}</p>
                        <p className="text-sm font-medium text-gray-900 mb-2">{contact.subject}</p>
                        <p className="text-gray-700">{contact.message}</p>
                        {contact.timestamp?.toDate && (
                          <p className="text-xs text-gray-500 mt-2">
                            {format(contact.timestamp.toDate(), 'dd/MM/yyyy HH:mm', { locale: it })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Calendar Tab */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Calendario Prenotazioni</h2>
              <div className="text-sm text-gray-600">
                Sincronizza con Booking.com e Airbnb tramite file iCal
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Istruzioni Sincronizzazione</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-900">1. Scarica il file iCal</h4>
                  <p>Clicca su "Scarica iCal" per ottenere il calendario delle prenotazioni confermate.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">2. Importa su Booking.com</h4>
                  <p>Vai su Extranet → Calendario → Importa calendario → Carica il file .ics</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">3. Importa su Airbnb</h4>
                  <p>Vai su Host → Calendario → Disponibilità → Importa calendario → Carica il file .ics</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prenotazioni Confermate</h3>
              <div className="space-y-3">
                {bookings.filter(b => b.status === 'confirmed').map(booking => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{booking.name}</p>
                      <p className="text-sm text-gray-600">
                        {booking.checkin} → {booking.checkout} ({booking.guests} ospiti)
                      </p>
                    </div>
                    <div className="text-sm text-green-700 font-medium">Confermata</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;