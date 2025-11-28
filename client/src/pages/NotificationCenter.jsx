import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import FloatingBar from '../components/FloatingBar';

export default function NotificationCenter() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'unread', 'important'

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: 'feedback',
      title: 'Feedback on Land Dispute Case',
      message: 'Adv. Jane Mwangi provided feedback on your interaction with Mary Wanjiku.',
      time: '2 hours ago',
      read: false,
      priority: 'normal'
    },
    {
      id: 2,
      type: 'request',
      title: 'Join Request Accepted',
      message: 'Adv. Jane Mwangi has accepted your request to join their legal community.',
      time: '1 day ago',
      read: true,
      priority: 'high'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Grace Period Warning',
      message: 'You have 7 days left to join an advocate. Find one soon to avoid account suspension.',
      time: '2 days ago',
      read: false,
      priority: 'high'
    },
    {
      id: 4,
      type: 'case',
      title: 'New Case Assigned',
      message: 'You have been assigned to a new case: "Employment Termination".',
      time: '3 days ago',
      read: true,
      priority: 'normal'
    },
    {
      id: 5,
      type: 'system',
      title: 'Platform Update',
      message: 'New feedback features are now available in the dashboard.',
      time: '1 week ago',
      read: true,
      priority: 'low'
    }
  ];

  const markAsRead = (notificationId) => {
    alert(`Marked notification ${notificationId} as read`);
  };

  const markAllAsRead = () => {
    alert('Marked all notifications as read');
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') {
      return !notification.read;
    } else if (activeTab === 'important') {
      return notification.priority === 'high';
    }
    return true; // 'all' tab
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <Header />
      <div style={{ padding: '6rem 2rem', background: '#f8f9ff', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#1a0033' }}>
              Notification Center
            </h1>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                style={{
                  background: '#6e44ff',
                  color: 'white',
                  padding: '0.7rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Mark All as Read
              </button>
            )}
          </div>
          
          {/* Tab Navigation */}
          <div style={{ display: 'flex', marginBottom: '2rem', borderBottom: '2px solid #eee' }}>
            <button 
              onClick={() => setActiveTab('all')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'all' ? '#6e44ff' : 'transparent',
                color: activeTab === 'all' ? 'white' : '#666',
                border: 'none',
                borderBottom: activeTab === 'all' ? '3px solid #6e44ff' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 'bold',
                position: 'relative'
              }}
            >
              All
              {activeTab === 'all' && unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0.5rem',
                  background: '#ff4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('unread')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'unread' ? '#6e44ff' : 'transparent',
                color: activeTab === 'unread' ? 'white' : '#666',
                border: 'none',
                borderBottom: activeTab === 'unread' ? '3px solid #6e44ff' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Unread ({notifications.filter(n => !n.read).length})
            </button>
            <button 
              onClick={() => setActiveTab('important')}
              style={{
                padding: '1rem 2rem',
                background: activeTab === 'important' ? '#6e44ff' : 'transparent',
                color: activeTab === 'important' ? 'white' : '#666',
                border: 'none',
                borderBottom: activeTab === 'important' ? '3px solid #6e44ff' : '3px solid transparent',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Important ({notifications.filter(n => n.priority === 'high').length})
            </button>
          </div>

          {/* Notifications List */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            {filteredNotifications.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
                No notifications to display
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '1rem' }}>
                {filteredNotifications.map(notification => (
                  <div 
                    key={notification.id} 
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      padding: '1.5rem',
                      background: notification.read ? '#f8f9ff' : '#fff8e1',
                      border: `1px solid ${notification.read ? '#eee' : '#ffd60a'}`,
                      borderRadius: '12px',
                      position: 'relative'
                    }}
                  >
                    {/* Notification Type Icon */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem',
                      flexShrink: 0,
                      background: notification.type === 'feedback' ? '#e8eaf6' : 
                                notification.type === 'request' ? '#e8f5e9' :
                                notification.type === 'reminder' ? '#fff3e0' :
                                notification.type === 'case' ? '#e3f2fd' : '#f3e5f5'
                    }}>
                      {notification.type === 'feedback' && '💬'}
                      {notification.type === 'request' && '🤝'}
                      {notification.type === 'reminder' && '⏰'}
                      {notification.type === 'case' && '📋'}
                      {notification.type === 'system' && '⚙️'}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ margin: '0 0 0.3rem 0', color: notification.priority === 'high' ? '#ff5252' : '#1a0033' }}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span style={{
                            background: '#6e44ff',
                            color: 'white',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            marginLeft: '1rem'
                          }}>
                            New
                          </span>
                        )}
                      </div>
                      
                      <p style={{ margin: '0.3rem 0', color: '#666' }}>
                        {notification.message}
                      </p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
                        <small style={{ color: '#888' }}>
                          {notification.time}
                        </small>
                        
                        {!notification.read && (
                          <button 
                            onClick={() => markAsRead(notification.id)}
                            style={{
                              background: 'transparent',
                              border: '1px solid #6e44ff',
                              color: '#6e44ff',
                              padding: '0.3rem 0.8rem',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <FloatingBar />
    </>
  );
}