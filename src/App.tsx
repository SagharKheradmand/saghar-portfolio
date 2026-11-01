import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Section } from "./components/layout/Section";
import { ContactSection } from "./features/contact/ContactSection";
import { ProfileAbout } from "./features/profile/ProfileAbout";
import { ProfileHero } from "./features/profile/ProfileHero";
import { useProfile } from "./features/profile/use-profile";
import { ProjectsSection } from "./features/projects/ProjectsSection";
import { EducationSection } from "./features/resume/EducationSection";
import { ExperienceSection } from "./features/resume/ExperienceSection";
import { ResumeSection } from "./features/resume/ResumeSection";
import { SkillsSection } from "./features/resume/SkillsSection";
import { useResume } from "./features/resume/use-resume";
import { ProjectDetailPage } from "./features/project-details/ProjectDetailPage";
import { findProjectRoute } from "./features/project-details/routes";

function HomePage() {
  const profile = useProfile();
  const resume = useResume();

  return (
    <>
      <Header />
      <main id="main-content">
        <ProfileHero state={profile} resume={resume} />
        <ProjectsSection />
        <Section id="about" title="About" tone="raised">
          <ProfileAbout state={profile} />
        </Section>
        <EducationSection state={resume} />
        <ExperienceSection state={resume} />
        <SkillsSection state={resume} />
        <ResumeSection state={resume} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const projectSlug = findProjectRoute(window.location.pathname);

  if (projectSlug) {
    return (
      <>
        <Header />
        <main id="main-content">
          <ProjectDetailPage slug={projectSlug} />
        </main>
        <Footer />
      </>
    );
  }

  return <HomePage />;
}

export default App;
