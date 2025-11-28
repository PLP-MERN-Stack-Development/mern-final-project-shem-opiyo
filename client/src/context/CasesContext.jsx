// src/context/CasesContext.jsx
import { createContext, useContext, useState } from 'react';

const CasesContext = createContext();

export function CasesProvider({ children }) {
  // Mock cases — in real app, fetch from API on login
  const [cases, setCases] = useState([
    {
      id: 'case-001',
      title: 'Land Dispute – Karen',
      status: 'active',
      junior: { name: 'Alex Kimani', avatar: 'A' },
      senior: { name: 'Dr. Jane Mwangi' },
      lastMessage: 'I’ve reviewed the title deed you sent...',
      updatedAt: '2 hours ago',
      unread: 3,
      client: { name: 'Mary Wanjiku' },
      messages: [
        { id: 1, sender: 'junior', text: 'Hi! I’ve been assigned to your land dispute case. Can you share more details?', time: '10:30 AM' },
        { id: 2, sender: 'client', text: 'Yes, I have a title deed and a demand letter from the neighbor.', time: '10:35 AM' },
        { id: 3, sender: 'junior', text: 'Perfect. Please upload them when you can.', time: '10:36 AM' }
      ]
    },
    {
      id: 'case-002',
      title: 'Employment Termination',
      status: 'active',
      junior: { name: 'Sarah Ochieng', avatar: 'S' },
      senior: { name: 'Adv. Peter Njoroge' },
      lastMessage: 'Thank you. I’ll draft the demand letter today.',
      updatedAt: 'yesterday',
      unread: 0,
      client: { name: 'James Otieno' },
      messages: [
        { id: 1, sender: 'junior', text: 'Hello, I’m reviewing your termination letter. Was it wrongful?', time: 'Yesterday' }
      ]
    },
    {
      id: 'case-003',
      title: 'Child Custody Agreement',
      status: 'closed',
      junior: { name: 'Alex Kimani', avatar: 'A' },
      senior: { name: 'Dr. Jane Mwangi' },
      lastMessage: 'Case successfully resolved. Thank you!',
      updatedAt: '1 week ago',
      unread: 0,
      client: { name: 'Amina Hassan' },
      messages: [
        { id: 1, sender: 'junior', text: 'Hello, I can help with your custody agreement. What are the main points you need to address?', time: 'Last week' }
      ]
    }
  ]);

  return (
    <CasesContext.Provider value={{ cases, setCases }}>
      {children}
    </CasesContext.Provider>
  );
}

export const useCases = () => useContext(CasesContext);