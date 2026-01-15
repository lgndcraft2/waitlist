import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  variant?: 'dark' | 'light';
}

const WaitlistModal = ({ isOpen, onClose, variant = 'dark' }: WaitlistModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    linkedin: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            whatsapp: formData.whatsapp,
            linkedin: formData.linkedin,
          },
        ]);

      if (error) throw error;

      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', whatsapp: '', linkedin: '' });
      toast.success('Successfully joined the waitlist!');

      // Close modal after showing success message
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2500);

    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast.error('Failed to join waitlist. Please try again.');
      setIsSubmitting(false);
    }
  };

  const overlayClass = variant === 'dark'
    ? 'bg-background/80'
    : 'bg-foreground/50';

  const modalClass = variant === 'dark'
    ? 'bg-card border-border'
    : 'bg-white border-border';

  const inputClass = variant === 'dark'
    ? 'bg-secondary border-border text-foreground placeholder:text-muted-foreground'
    : 'bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClass} backdrop-blur-sm`}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`${modalClass} rounded-2xl border p-6 w-full max-w-md shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            {showSuccess ? (
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-16 h-16 text-teal mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Success!</h2>
                <p className="text-muted-foreground text-center">
                  You've been added to the waitlist. Check your email for confirmation.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">Application for Batch 1</h2>
                  <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  <div className="inline-block w-full text-center py-2 px-4 rounded-full bg-gradient-to-r from-teal/80 to-coral/80 text-white text-sm font-semibold tracking-wider">
                    STATUS: OPEN (124 SPOTS)
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
                        First Name <span className="text-coral">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="e.g David"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        className={inputClass}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
                        Last Name <span className="text-coral">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="e.g Adeleke"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address <span className="text-coral">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g davidadeleke@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
                      WhatsApp Number <span className="text-coral">*</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="+234..."
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="linkedin" className="text-sm font-medium text-foreground">
                      LinkedIn Profile URL <span className="text-coral">*</span>
                    </Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="e.g https://linkedin.com/in/..."
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      required
                      className={inputClass}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      We verify every profile. no fakes allowed.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-5 font-semibold mt-4 ${variant === 'dark'
                        ? 'btn-primary-gradient text-primary-foreground'
                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Join the Waitlist'}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;