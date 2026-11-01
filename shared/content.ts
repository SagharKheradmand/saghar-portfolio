export interface Profile {
  name: string;
  headline: string;
  introduction: string;
  focusAreas: { label: string; description: string }[];
  about: string;
  portrait: string | null;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  contribution: string;
  technologies: string[];
  repositoryUrl: string;
  liveUrl: string | null;
  image: string | null;
  imageAlt?: string;
  imageCaption?: string;
  featured: boolean;
  category: string;
}

export interface ProjectsContent {
  projects: Project[];
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  context: string;
}

export interface CaseStudyArchitectureStep {
  stage: string;
  detail: string;
}

export interface ProjectCaseStudy {
  slug: string;
  overview: string;
  problem: string;
  approach: string;
  architecture: CaseStudyArchitectureStep[];
  resultSummary: string;
  metrics: CaseStudyMetric[];
  limitations: string[];
  sourceUrl: string;
  evidenceUrl: string;
  evidenceLabel: string;
}

export interface CaseStudiesContent {
  caseStudies: ProjectCaseStudy[];
}

export interface ContactLink {
  label: string;
  url: string;
}

export interface Contact {
  email: string | null;
  links: ContactLink[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
  focus: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  details: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ResumeContent {
  pdfUrl: string;
  intro: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skillGroups: SkillGroup[];
}
