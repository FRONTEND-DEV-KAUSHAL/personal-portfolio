import HeroSection from '../components/sections/HeroSection';
import SkillsSection from '../components/sections/SkillsSection';
import CareerSection from '../components/sections/CareerSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import StatsSection from '../components/sections/StatsSection';
import ContactSection from '../components/sections/ContactSection';
import Navigation from '../components/ui/Navigation';
import CustomCursor from '../components/ui/CustomCursor';
import HeroCanvas from '../components/3d/HeroCanvas';

const Index = () => {
  return (
    <div className="bg-background min-h-screen">
      <CustomCursor />
      <HeroCanvas />
      <Navigation />
      <div className="relative z-10">
        <HeroSection />
        <div className="relative bg-background">
          <SkillsSection />
          <CareerSection />
          <ProjectsSection />
          <StatsSection />
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
