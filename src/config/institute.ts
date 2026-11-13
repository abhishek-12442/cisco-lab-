export interface InstituteConfig {
  name: string;
  shortName: string;
  tagline: string;
  city: string;
  country: string;
  address: string;
  landmark: string;
  phonePrimary: string;
  phoneSecondary: string;
  email: string;
  admissionsEmail: string;
  officeHours: string;
  establishedYear: number;
  mapEmbedUrl: string;
  socials: {
    facebook: string;
    linkedin: string;
    youtube: string;
    instagram: string;
  };
}

/**
 * Centralized company details — edit this single file to rebrand or update
 * contact details across the entire website and footer.
 */
export const INSTITUTE_CONFIG: InstituteConfig = {
  name: 'Himalaya NetTech Institute',
  shortName: 'Himalaya NetTech',
  tagline: 'IT & Networking Training Center',
  city: 'Kathmandu',
  country: 'Nepal',
  address: 'Putalisadak-28, Bagmati Province, Kathmandu 44600, Nepal',
  landmark: 'Opposite Star Mall, 3rd Floor Tech Wing',
  phonePrimary: '+977-01-5342180',
  phoneSecondary: '+977-9851194200',
  email: 'info@himalayanettech.edu.np',
  admissionsEmail: 'admissions@himalayanettech.edu.np',
  officeHours: 'Sunday – Friday: 7:00 AM – 6:30 PM',
  establishedYear: 2018,
  mapEmbedUrl:
    'https://www.google.com/maps?q=Putalisadak,+Kathmandu,+Nepal&output=embed',
  socials: {
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com',
  },
};
