import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export interface SyllabusModule {
  module: string;
  topics: string[];
}

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name').notNull().default('Student'),
  role: text('role').notNull().default('student'), // 'admin' | 'student'
  phone: text('phone'),
  address: text('address'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  shortDescription: text('short_description').notNull(),
  overview: text('overview').notNull(),
  duration: text('duration').notNull(),
  level: text('level').notNull(),
  schedule: text('schedule').notNull(),
  feeNpr: text('fee_npr').notNull(),
  imageKey: text('image_key').notNull(),
  iconName: text('icon_name').notNull(),
  learningObjectives: jsonb('learning_objectives').$type<string[]>().notNull(),
  syllabus: jsonb('syllabus').$type<SyllabusModule[]>().notNull(),
  labInfo: text('lab_info').notNull(),
  certificationInfo: text('certification_info').notNull(),
  careerOpportunities: jsonb('career_opportunities').$type<string[]>().notNull(),
  featured: boolean('featured').default(true).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  featuredImage: text('featured_image').notNull(),
  category: text('category').notNull(),
  tags: jsonb('tags').$type<string[]>().notNull(),
  status: text('status').notNull().default('published'), // 'published' | 'draft'
  authorName: text('author_name').notNull(),
  publishedAt: timestamp('published_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const galleryItems = pgTable('gallery_items', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  caption: text('caption').notNull(),
  imageKey: text('image_key').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const enrollments = pgTable('enrollments', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  address: text('address').notNull(),
  courseId: integer('course_id').references(() => courses.id, {
    onDelete: 'set null',
  }),
  courseTitle: text('course_title').notNull(),
  preferredTime: text('preferred_time').notNull(),
  message: text('message'),
  status: text('status').notNull().default('Pending'), // 'Pending' | 'Contacted' | 'Enrolled' | 'Archived'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('Unread'), // 'Unread' | 'Read' | 'Replied'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const studentEnrollments = pgTable('student_enrollments', {
  id: serial('id').primaryKey(),
  studentEmail: text('student_email').notNull(),
  courseId: integer('course_id').references(() => courses.id, {
    onDelete: 'cascade',
  }),
  courseTitle: text('course_title').notNull(),
  batchName: text('batch_name').notNull(),
  attendancePercent: integer('attendance_percent').notNull().default(92),
  sessionsAttended: integer('sessions_attended').notNull().default(22),
  totalSessions: integer('total_sessions').notNull().default(24),
  assessmentScore: text('assessment_score').notNull().default('88 / 100'),
  resultStatus: text('result_status').notNull().default('In Progress'), // 'In Progress' | 'Passed' | 'Distinction'
  certificateCode: text('certificate_code'),
  enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
});

export const courseMaterials = pgTable('course_materials', {
  id: serial('id').primaryKey(),
  courseId: integer('course_id').references(() => courses.id, {
    onDelete: 'cascade',
  }),
  courseTitle: text('course_title').notNull(),
  title: text('title').notNull(),
  materialType: text('material_type').notNull(), // 'PDF Notes' | 'Lab Guide' | 'Assignment'
  dueDate: text('due_date'),
  description: text('description').notNull(),
  contentMarkdown: text('content_markdown').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  targetGroup: text('target_group').notNull().default('All Students'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
