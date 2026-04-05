import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Users, Shield, ArrowRight, ArrowLeft, Plus, Trash2, CheckCircle } from "lucide-react";
import { saveUserProfile } from "../utils/userProfile";

const Onboarding = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [profile, setProfile] = useState({
    fullName: currentUser?.displayName || "",
    age: "",
    phoneNumber: "",
  });

  const [contacts, setContacts] = useState([
    { name: "", phone: "", relation: "" }
  ]);

  const [settings, setSettings] = useState({
    screamDetection: true,
    shakeTrigger: "medium",
    notifications: true
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleContactChange = (index, e) => {
    const newContacts = [...contacts];
    newContacts[index][e.target.name] = e.target.value;
    setContacts(newContacts);
  };

  const addContact = () => {
    if (contacts.length < 5) {
      setContacts([...contacts, { name: "", phone: "", relation: "" }]);
    }
  };

  const removeContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Added a local timeout check to prevent infinite "Saving..."
    const timeout = setTimeout(() => {
      setLoading(false);
      alert("Saving is taking longer than expected. Please check your Firebase Firestore rules and connection.");
    }, 10000);

    try {
      const onboardingData = {
        profile,
        emergencyContacts: contacts,
        settings,
        onboardingComplete: true
      };
      await saveUserProfile(currentUser.uid, onboardingData);
      clearTimeout(timeout);
      navigate("/");
    } catch (error) {
      clearTimeout(timeout);
      console.error("Onboarding failed:", error);
      alert(`Onboarding failed: ${error.message || "Unknown error"}. Please ensure your Firestore Security Rules allow writes.`);
    } finally {
      if (!loading) setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 p-6 pt-12 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(step / 3) * 100}%` }}
          className="h-full bg-primary"
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 flex flex-col"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Build your profile</h1>
              <p className="text-slate-500 font-medium">To keep you safe, we need to know who you are.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleProfileChange}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Age</label>
                  <input 
                    name="age"
                    type="number"
                    value={profile.age}
                    onChange={handleProfileChange}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                    placeholder="Years"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleProfileChange}
                      className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-10 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                      placeholder="Number"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 flex flex-col"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Emergency Hub</h1>
              <p className="text-slate-500 font-medium italic">Who should we alert when you're in danger?</p>
            </div>

            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 no-scrollbar">
              {contacts.map((contact, index) => (
                <div key={index} className="glass-panel p-4 rounded-2xl relative border-slate-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">Contact #{index + 1}</span>
                    {contacts.length > 1 && (
                      <button onClick={() => removeContact(index)} className="text-danger hover:bg-danger/10 p-1 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <input 
                      name="name"
                      placeholder="Contact Name"
                      value={contact.name}
                      onChange={(e) => handleContactChange(index, e)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm font-semibold"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        name="phone"
                        placeholder="Phone Number"
                        value={contact.phone}
                        onChange={(e) => handleContactChange(index, e)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm font-semibold"
                      />
                      <input 
                        name="relation"
                        placeholder="Relation (e.g. Dad)"
                        value={contact.relation}
                        onChange={(e) => handleContactChange(index, e)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary transition-all text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {contacts.length < 5 && (
              <button 
                onClick={addContact}
                className="mt-6 flex items-center justify-center gap-2 py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 hover:border-primary hover:text-primary transition-all font-bold uppercase text-xs tracking-widest"
              >
                <Plus className="w-4 h-4" />
                Add Contact ({contacts.length}/5)
              </button>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 flex flex-col"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-slate-800 mb-2">Smart Safety</h1>
              <p className="text-slate-500 font-medium italic">Configure the AI-Powered protection engine.</p>
            </div>

            <div className="space-y-4">
              <div className="glass-panel p-5 rounded-2xl flex items-center justify-between border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Scream Detection</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Automatic SOS on voice scream.</p>
                  </div>
                </div>
                <input 
                  type="checkbox" 
                  checked={settings.screamDetection}
                  onChange={(e) => setSettings({...settings, screamDetection: e.target.checked})}
                  className="w-5 h-5 accent-primary" 
                />
              </div>

              <div className="glass-panel p-5 rounded-2xl space-y-4 border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Shake Intensity</h4>
                    <p className="text-[10px] text-slate-500 font-medium">How hard must you shake to trigger SOS?</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSettings({...settings, shakeTrigger: level})}
                      className={`flex-1 py-3 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                        settings.shakeTrigger === level 
                        ? 'bg-primary border-primary text-white shadow-glow' 
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-8 flex gap-4">
        {step > 1 && (
          <button 
            onClick={prevStep}
            className="p-4 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
        
        {step < 3 ? (
          <button 
            onClick={nextStep}
            disabled={step === 1 && !profile.phoneNumber}
            className="flex-1 py-4 bg-secondary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary-light transition-all disabled:opacity-50"
          >
            Next Step
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all disabled:opacity-50 shadow-glow"
          >
            {loading ? "Saving Profile..." : "Complete Setup"}
            {!loading && <CheckCircle className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
