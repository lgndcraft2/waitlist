import { useState } from 'react';
import NavbarDark from '../components/NavBarDark';
import HeroSectionDark from '../components/HeroSectionDark';
// import ArsenalSection from '@/components/ArsenalSection';
// import ChatSectionDark from '@/components/ChatSectionDark';
// import PricingSection from '@/components/PricingSection';
// import CTASectionDark from '@/components/CTASectionDark';
// import FooterDark from '@/components/FooterDark';
import WaitlistModal from '../components/WaitlistModal';
import SponsorModal from '@/components/SponsorModal';
import SuccessModal from '@/components/SuccessModal';

const HomeDark = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isSponsorOpen, setIsSponsorOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: '', price: '' });

  const handleWaitlistSuccess = () => {
    setIsSuccessOpen(true);
  };

  const handleWaitlistClick = (planName?: string) => {
    if (planName) {
      setSelectedPlan({ name: planName, price: '' });
    }
    setIsWaitlistOpen(true);
  };

  const handleSponsorClick = (planName: string) => {
    setSelectedPlan({ name: planName, price: '' });
    setIsSponsorOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarDark 
        onJoinWaitlistClick={() => setIsWaitlistOpen(true)}
        onChatClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
      />
      <HeroSectionDark 
        onSecureSpotClick={() => setIsWaitlistOpen(true)}
        onMentorPayClick={() => setIsSponsorOpen(true)}
      />
      {/* <ArsenalSection variant="dark" />
      <div id="chat">
        <ChatSectionDark onTrialsExhausted={() => setIsWaitlistOpen(true)} />
      </div>
      <PricingSection 
        variant="dark" 
        onPayClick={handleWaitlistClick}
        onSponsorClick={handleSponsorClick}
      />
      <CTASectionDark onSecureSpotClick={() => setIsWaitlistOpen(true)} />
      <FooterDark /> */}

      <WaitlistModal 
        isOpen={isWaitlistOpen} 
        onClose={() => setIsWaitlistOpen(false)} 
        onSuccess={handleWaitlistSuccess}
        variant="dark" 
      />
      <SponsorModal 
        isOpen={isSponsorOpen} 
        onClose={() => setIsSponsorOpen(false)} 
        planName={selectedPlan.name || 'The Career Accelerator'} 
        variant="dark" 
      />
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        variant="dark"
      />
    </div>
  );
};

export default HomeDark;