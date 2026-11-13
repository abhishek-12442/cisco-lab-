export interface SyllabusModule {
  module: string;
  topics: string[];
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  duration: string;
  level: string;
  schedule: string;
  feeNpr: string;
  imageKey: string;
  iconName: string;
  learningObjectives: string[];
  syllabus: SyllabusModule[];
  labInfo: string;
  certificationInfo: string;
  careerOpportunities: string[];
  featured: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  authorName: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  caption: string;
  imageKey: string;
  createdAt: string;
}

export interface Enrollment {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  courseId: number | null;
  courseTitle: string;
  preferredTime: string;
  message: string | null;
  status: string;
  createdAt: string;
}

export interface ContactMessage {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface StudentEnrollment {
  id: number;
  studentEmail: string;
  courseId: number | null;
  courseTitle: string;
  batchName: string;
  attendancePercent: number;
  sessionsAttended: number;
  totalSessions: number;
  assessmentScore: string;
  resultStatus: string;
  certificateCode: string | null;
  enrolledAt: string;
}

export interface CourseMaterial {
  id: number;
  courseId: number | null;
  courseTitle: string;
  title: string;
  materialType: string;
  dueDate: string | null;
  description: string;
  contentMarkdown: string;
  createdAt: string;
}

export interface Announcement {
  id: number;
  title: string;
  body: string;
  targetGroup: string;
  createdAt: string;
}

export interface AuthUser {
  id: number;
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
}

export interface StudentPortalPayload {
  enrolledCourses: StudentEnrollment[];
  materials: CourseMaterial[];
  announcements: Announcement[];
}

export interface AdminOverviewPayload {
  counts: {
    courses: number;
    publishedPosts: number;
    draftPosts: number;
    galleryItems: number;
    pendingEnrollments: number;
    totalEnrollments: number;
    unreadMessages: number;
    studentEnrollments: number;
  };
  recentEnrollments: Enrollment[];
  recentMessages: ContactMessage[];
}
