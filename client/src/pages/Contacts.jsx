import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, User, Phone, Trash2, Star, Shield, ArrowRight, Search, Heart } from 'lucide-react';

export default function Contacts() {
  const { userData } = useAuth();
  
  // Local state for contacts (initialized from userData or mock data)
  const [contacts, setContacts] = useState(
    userData?.emergencyContacts || [
      { id: 1, name: "Arjun Singh", phone: "+91 98765 43210", relation: "Father", isPrimary: true },
      { id: 2, name: "Sneha Kapoor", phone: "+91 87654 32109", relation: "Sister", isPrimary: false }
    ]
  );
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", relation: "" });

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const togglePrimary = (id) => {
    setContacts(contacts.map(c => ({
      ...c,
      isPrimary: c.id === id ? !c.isPrimary : false
    })));
  };

  const handleAdd = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now(), isPrimary: false }]);
      setNewContact({ name: "", phone: "", relation: "" });
      setShowAddModal(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-6 pb-24 font-sans">
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Emergency Hub</h1>
        <p className="text-slate-500 font-medium text-sm">Your trusted circle in times of need.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="glass-panel p-4 rounded-3xl border-primary/10 bg-primary/5">
          <div className="text-primary font-black text-2xl mb-1">{contacts.length}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Circle</div>
        </div>
        <div className="glass-panel p-4 rounded-3xl border-accent/10 bg-accent/5">
          <div className="text-accent font-black text-2xl mb-1">{contacts.filter(c => c.isPrimary).length}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Primary Hero</div>
        </div>
      </div>

      {/* Main Contacts List */}
      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {contacts.map((contact) => (
            <motion.div 
              key={contact.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              className={`glass-panel p-5 rounded-3xl border-slate-100 flex items-center gap-4 transition-all ${contact.isPrimary ? 'border-primary/20 bg-white shadow-glow-sm' : ''}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${contact.isPrimary ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                <User className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800">{contact.name}</h3>
                  {contact.isPrimary && <Star className="w-3 h-3 text-primary fill-primary" />}
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{contact.relation} • {contact.phone}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => togglePrimary(contact.id)}
                  className={`p-2 rounded-xl transition-all ${contact.isPrimary ? 'bg-primary text-white shadow-soft' : 'bg-slate-50 text-slate-300 hover:text-primary'}`}
                >
                  <Star className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteContact(contact.id)}
                  className="p-2 rounded-xl bg-slate-50 text-slate-300 hover:text-danger hover:bg-danger/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add New Button */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowAddModal(true)}
        className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center gap-3 text-slate-400 font-bold uppercase text-xs tracking-widest hover:border-primary hover:text-primary transition-all"
      >
        <Plus className="w-5 h-5" />
        Expand your circle
      </motion.button>

      {/* Add Modal (Simple Overlay) */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 relative shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
              </div>
              
              <h2 className="text-2xl font-display font-bold text-slate-800 mb-1">New Guardian</h2>
              <p className="text-sm text-slate-500 font-medium mb-8">Add a trusted contact to your hub.</p>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    placeholder="Full Name"
                    value={newContact.name}
                    onChange={e => setNewContact({...newContact, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all font-semibold text-sm"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    placeholder="Phone Number"
                    value={newContact.phone}
                    onChange={e => setNewContact({...newContact, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all font-semibold text-sm"
                  />
                </div>
                <div className="relative">
                  <Plus className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    placeholder="Relation (e.g. Sister)"
                    value={newContact.relation}
                    onChange={e => setNewContact({...newContact, relation: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all font-semibold text-sm"
                  />
                </div>
              </div>

              <button 
                onClick={handleAdd}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest shadow-glow mt-8 hover:bg-primary-dark transition-all"
              >
                Add to Hub
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
