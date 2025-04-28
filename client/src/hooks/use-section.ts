import { create } from 'zustand';

type Section = 'about' | 'projects' | 'experience' | 'skills' | 'courses' | 'books';

interface SectionState {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  activeSection: 'about',
  setActiveSection: (section) => set({ activeSection: section }),
}));
