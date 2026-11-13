import type {
  AdminOverviewPayload,
  BlogPost,
  ContactMessage,
  Course,
  Enrollment,
  GalleryItem,
  StudentEnrollment,
  StudentPortalPayload,
} from '../types.ts';

async function requestJson<T>(
  url: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...options, headers });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return body as T;
}

export const api = {
  // Public
  getCourses: () => requestJson<Course[]>('/api/courses'),
  getCourse: (slug: string) => requestJson<Course>(`/api/courses/${slug}`),
  getBlogPosts: () => requestJson<BlogPost[]>('/api/blog'),
  getBlogPost: (slug: string) => requestJson<BlogPost>(`/api/blog/${slug}`),
  getGallery: () => requestJson<GalleryItem[]>('/api/gallery'),

  submitEnrollment: (payload: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    courseId: number | null;
    courseTitle: string;
    preferredTime: string;
    message?: string;
  }) =>
    requestJson<Enrollment>('/api/enrollments', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  submitContact: (payload: {
    fullName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) =>
    requestJson<ContactMessage>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Student Portal
  getStudentPortal: (token: string) =>
    requestJson<StudentPortalPayload>('/api/student/portal', {}, token),

  // Admin Dashboard
  getAdminOverview: (token: string) =>
    requestJson<AdminOverviewPayload>('/api/admin/overview', {}, token),

  createCourse: (token: string, payload: Partial<Course>) =>
    requestJson<Course>(
      '/api/admin/courses',
      { method: 'POST', body: JSON.stringify(payload) },
      token
    ),
  updateCourse: (token: string, id: number, payload: Partial<Course>) =>
    requestJson<Course>(
      `/api/admin/courses/${id}`,
      { method: 'PUT', body: JSON.stringify(payload) },
      token
    ),
  deleteCourse: (token: string, id: number) =>
    requestJson<{ ok: boolean }>(
      `/api/admin/courses/${id}`,
      { method: 'DELETE' },
      token
    ),

  getAdminBlogPosts: (token: string) =>
    requestJson<BlogPost[]>('/api/admin/blog', {}, token),
  createBlogPost: (token: string, payload: Record<string, unknown>) =>
    requestJson<BlogPost>(
      '/api/admin/blog',
      { method: 'POST', body: JSON.stringify(payload) },
      token
    ),
  updateBlogPost: (token: string, id: number, payload: Record<string, unknown>) =>
    requestJson<BlogPost>(
      `/api/admin/blog/${id}`,
      { method: 'PUT', body: JSON.stringify(payload) },
      token
    ),
  deleteBlogPost: (token: string, id: number) =>
    requestJson<{ ok: boolean }>(
      `/api/admin/blog/${id}`,
      { method: 'DELETE' },
      token
    ),

  createGalleryItem: (
    token: string,
    payload: { title: string; category: string; caption: string; imageKey: string }
  ) =>
    requestJson<GalleryItem>(
      '/api/admin/gallery',
      { method: 'POST', body: JSON.stringify(payload) },
      token
    ),
  deleteGalleryItem: (token: string, id: number) =>
    requestJson<{ ok: boolean }>(
      `/api/admin/gallery/${id}`,
      { method: 'DELETE' },
      token
    ),

  getEnrollments: (token: string) =>
    requestJson<Enrollment[]>('/api/admin/enrollments', {}, token),
  updateEnrollmentStatus: (token: string, id: number, status: string) =>
    requestJson<Enrollment>(
      `/api/admin/enrollments/${id}`,
      { method: 'PATCH', body: JSON.stringify({ status }) },
      token
    ),
  deleteEnrollment: (token: string, id: number) =>
    requestJson<{ ok: boolean }>(
      `/api/admin/enrollments/${id}`,
      { method: 'DELETE' },
      token
    ),

  getContacts: (token: string) =>
    requestJson<ContactMessage[]>('/api/admin/contacts', {}, token),
  updateContactStatus: (token: string, id: number, status: string) =>
    requestJson<ContactMessage>(
      `/api/admin/contacts/${id}`,
      { method: 'PATCH', body: JSON.stringify({ status }) },
      token
    ),
  deleteContact: (token: string, id: number) =>
    requestJson<{ ok: boolean }>(
      `/api/admin/contacts/${id}`,
      { method: 'DELETE' },
      token
    ),

  getStudentRecords: (token: string) =>
    requestJson<StudentEnrollment[]>('/api/admin/students', {}, token),
  createStudentRecord: (token: string, payload: Record<string, unknown>) =>
    requestJson<StudentEnrollment>(
      '/api/admin/students',
      { method: 'POST', body: JSON.stringify(payload) },
      token
    ),
  updateStudentRecord: (
    token: string,
    id: number,
    payload: Record<string, unknown>
  ) =>
    requestJson<StudentEnrollment>(
      `/api/admin/students/${id}`,
      { method: 'PATCH', body: JSON.stringify(payload) },
      token
    ),
  createAnnouncement: (
    token: string,
    payload: { title: string; body: string; targetGroup: string }
  ) =>
    requestJson(
      '/api/admin/announcements',
      { method: 'POST', body: JSON.stringify(payload) },
      token
    ),
  createCourseMaterial: (token: string, payload: Record<string, unknown>) =>
    requestJson(
      '/api/admin/materials',
      { method: 'POST', body: JSON.stringify(payload) },
      token
    ),
};
