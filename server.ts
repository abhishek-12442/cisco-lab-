import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createAnnouncement,
  createBlogPost,
  createContactMessage,
  createCourse,
  createCourseMaterial,
  createEnrollment,
  createGalleryItem,
  createStudentRecord,
  deleteBlogPost,
  deleteContactMessage,
  deleteCourse,
  deleteEnrollment,
  deleteGalleryItem,
  getAllBlogPosts,
  getAllContactMessages,
  getAllCourses,
  getAllEnrollments,
  getAllGalleryItems,
  getAllStudentRecords,
  getBlogPostBySlug,
  getCourseBySlug,
  getPublishedBlogPosts,
  getStudentPortalData,
  updateBlogPost,
  updateContactMessageStatus,
  updateCourse,
  updateEnrollmentStatus,
  updateStudentRecord,
} from './src/db/queries.ts';
import { requireAdmin, requireAuth } from './src/middleware/auth.ts';
import type { AuthRequest } from './src/middleware/auth.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  // Public Courses API
  app.get('/api/courses', async (_req, res) => {
    try {
      const items = await getAllCourses();
      res.json(items);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to load courses';
      res.status(500).json({ error: msg });
    }
  });

  app.get('/api/courses/:slug', async (req, res) => {
    try {
      const item = await getCourseBySlug(req.params.slug);
      if (!item) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.json(item);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to load course';
      res.status(500).json({ error: msg });
    }
  });

  // Public Blog / News API
  app.get('/api/blog', async (_req, res) => {
    try {
      const posts = await getPublishedBlogPosts();
      res.json(posts);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to load blog posts';
      res.status(500).json({ error: msg });
    }
  });

  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const post = await getBlogPostBySlug(req.params.slug);
      if (!post || post.status !== 'published') {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to load post';
      res.status(500).json({ error: msg });
    }
  });

  // Public Gallery API
  app.get('/api/gallery', async (_req, res) => {
    try {
      const items = await getAllGalleryItems();
      res.json(items);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Failed to load gallery';
      res.status(500).json({ error: msg });
    }
  });

  // Public Enrollment Submission API
  app.post('/api/enrollments', async (req, res) => {
    try {
      const {
        fullName,
        phone,
        email,
        address,
        courseId,
        courseTitle,
        preferredTime,
        message,
      } = req.body ?? {};

      if (
        !fullName ||
        !phone ||
        !email ||
        !address ||
        !courseTitle ||
        !preferredTime
      ) {
        return res.status(400).json({
          error: 'Please complete all required enrollment fields.',
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(email).trim())) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }

      const created = await createEnrollment({
        fullName: String(fullName).trim(),
        phone: String(phone).trim(),
        email: String(email).trim(),
        address: String(address).trim(),
        courseId: courseId ? Number(courseId) : null,
        courseTitle: String(courseTitle).trim(),
        preferredTime: String(preferredTime).trim(),
        message: message ? String(message).trim() : null,
        status: 'Pending',
      });

      res.status(201).json(created);
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : 'Failed to submit enrollment';
      res.status(500).json({ error: msg });
    }
  });

  // Public Contact Form API
  app.post('/api/contact', async (req, res) => {
    try {
      const { fullName, email, phone, subject, message } = req.body ?? {};
      if (!fullName || !email || !subject || !message) {
        return res.status(400).json({
          error: 'Please fill in your name, email, subject, and message.',
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(String(email).trim())) {
        return res.status(400).json({ error: 'Please provide a valid email address.' });
      }

      const created = await createContactMessage({
        fullName: String(fullName).trim(),
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : null,
        subject: String(subject).trim(),
        message: String(message).trim(),
        status: 'Unread',
      });

      res.status(201).json(created);
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : 'Failed to submit message';
      res.status(500).json({ error: msg });
    }
  });

  // Authenticated User Profile & Student Portal
  app.get('/api/auth/me', requireAuth, async (req: AuthRequest, res) => {
    res.json({ user: req.dbUser });
  });

  app.get('/api/student/portal', requireAuth, async (req: AuthRequest, res) => {
    try {
      const email = req.dbUser?.email;
      if (!email) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const data = await getStudentPortalData(email);
      res.json(data);
    } catch (error: unknown) {
      const msg =
        error instanceof Error ? error.message : 'Failed to load student portal';
      res.status(500).json({ error: msg });
    }
  });

  // Admin Dashboard Overview
  app.get(
    '/api/admin/overview',
    requireAuth,
    requireAdmin,
    async (_req: AuthRequest, res) => {
      try {
        const [allCourses, allPosts, allGallery, allEnrollments, allContacts, allStudents] =
          await Promise.all([
            getAllCourses(),
            getAllBlogPosts(),
            getAllGalleryItems(),
            getAllEnrollments(),
            getAllContactMessages(),
            getAllStudentRecords(),
          ]);

        res.json({
          counts: {
            courses: allCourses.length,
            publishedPosts: allPosts.filter((p) => p.status === 'published').length,
            draftPosts: allPosts.filter((p) => p.status !== 'published').length,
            galleryItems: allGallery.length,
            pendingEnrollments: allEnrollments.filter((e) => e.status === 'Pending').length,
            totalEnrollments: allEnrollments.length,
            unreadMessages: allContacts.filter((c) => c.status === 'Unread').length,
            studentEnrollments: allStudents.length,
          },
          recentEnrollments: allEnrollments.slice(0, 5),
          recentMessages: allContacts.slice(0, 5),
        });
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to load dashboard overview';
        res.status(500).json({ error: msg });
      }
    }
  );

  // Admin Courses CRUD
  app.post(
    '/api/admin/courses',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const body = req.body ?? {};
        if (!body.title || !body.shortDescription || !body.duration || !body.feeNpr) {
          return res.status(400).json({
            error: 'Title, short description, duration, and fee are required.',
          });
        }
        const baseSlug = slugify(body.slug || body.title);
        const created = await createCourse({
          slug: `${baseSlug}-${Date.now().toString().slice(-4)}`,
          title: String(body.title).trim(),
          shortDescription: String(body.shortDescription).trim(),
          overview: String(body.overview || body.shortDescription).trim(),
          duration: String(body.duration).trim(),
          level: String(body.level || 'Beginner to Intermediate').trim(),
          schedule: String(
            body.schedule || 'Morning (7:00 AM) · Day (11:00 AM) · Evening (5:30 PM)'
          ).trim(),
          feeNpr: String(body.feeNpr).trim(),
          imageKey: String(body.imageKey || 'ccna-rack').trim(),
          iconName: String(body.iconName || 'Network').trim(),
          learningObjectives: Array.isArray(body.learningObjectives)
            ? body.learningObjectives
            : ['Practical lab training and assessment', 'Real-world deployment scenarios'],
          syllabus: Array.isArray(body.syllabus)
            ? body.syllabus
            : [
                {
                  module: 'Module 01: Core Foundations & Lab Setup',
                  topics: ['Architecture overview', 'Hands-on configuration exercises'],
                },
              ],
          labInfo: String(
            body.labInfo ||
              'Hands-on workstation and physical rack access at our Putalisadak lab.'
          ).trim(),
          certificationInfo: String(
            body.certificationInfo ||
              'Himalaya NetTech Verified Completion Certificate.'
          ).trim(),
          careerOpportunities: Array.isArray(body.careerOpportunities)
            ? body.careerOpportunities
            : ['IT Support Specialist', 'Technical Operations Associate'],
          featured: Boolean(body.featured ?? true),
          sortOrder: Number(body.sortOrder ?? 10),
        });
        res.status(201).json(created);
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Failed to create course';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.put(
    '/api/admin/courses/:id',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const id = Number(req.params.id);
        const body = req.body ?? {};
        const updated = await updateCourse(id, {
          title: body.title,
          shortDescription: body.shortDescription,
          overview: body.overview,
          duration: body.duration,
          level: body.level,
          schedule: body.schedule,
          feeNpr: body.feeNpr,
          imageKey: body.imageKey,
          iconName: body.iconName,
          learningObjectives: body.learningObjectives,
          syllabus: body.syllabus,
          labInfo: body.labInfo,
          certificationInfo: body.certificationInfo,
          careerOpportunities: body.careerOpportunities,
        });
        if (!updated) {
          return res.status(404).json({ error: 'Course not found' });
        }
        res.json(updated);
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Failed to update course';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.delete(
    '/api/admin/courses/:id',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const deleted = await deleteCourse(Number(req.params.id));
        if (!deleted) {
          return res.status(404).json({ error: 'Course not found' });
        }
        res.json({ ok: true });
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Failed to delete course';
        res.status(500).json({ error: msg });
      }
    }
  );

  // Admin Blog / News CRUD
  app.get(
    '/api/admin/blog',
    requireAuth,
    requireAdmin,
    async (_req: AuthRequest, res) => {
      try {
        const posts = await getAllBlogPosts();
        res.json(posts);
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Failed to load blog posts';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.post(
    '/api/admin/blog',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const body = req.body ?? {};
        if (!body.title || !body.content || !body.category) {
          return res
            .status(400)
            .json({ error: 'Post title, category, and content are required.' });
        }
        const slug = `${slugify(body.title)}-${Date.now().toString().slice(-4)}`;
        const status = body.status === 'draft' ? 'draft' : 'published';
        const excerpt =
          body.excerpt && String(body.excerpt).trim()
            ? String(body.excerpt).trim()
            : `${String(body.content).trim().slice(0, 155)}...`;

        const created = await createBlogPost({
          slug,
          title: String(body.title).trim(),
          excerpt,
          content: String(body.content).trim(),
          featuredImage: String(body.featuredImage || 'classroom-training').trim(),
          category: String(body.category).trim(),
          tags: Array.isArray(body.tags)
            ? body.tags
            : String(body.tags || '')
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean),
          status,
          authorName: String(
            body.authorName || req.dbUser?.name || 'Editorial Team'
          ).trim(),
          publishedAt: new Date(),
        });
        res.status(201).json(created);
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Failed to create post';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.put(
    '/api/admin/blog/:id',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const id = Number(req.params.id);
        const body = req.body ?? {};
        const tags = Array.isArray(body.tags)
          ? body.tags
          : typeof body.tags === 'string'
            ? body.tags
                .split(',')
                .map((t: string) => t.trim())
                .filter(Boolean)
            : undefined;

        const updated = await updateBlogPost(id, {
          ...(body.title !== undefined ? { title: String(body.title).trim() } : {}),
          ...(body.excerpt !== undefined
            ? { excerpt: String(body.excerpt).trim() }
            : {}),
          ...(body.content !== undefined
            ? { content: String(body.content).trim() }
            : {}),
          ...(body.featuredImage !== undefined
            ? { featuredImage: String(body.featuredImage).trim() }
            : {}),
          ...(body.category !== undefined
            ? { category: String(body.category).trim() }
            : {}),
          ...(tags !== undefined ? { tags } : {}),
          ...(body.status !== undefined
            ? { status: body.status === 'draft' ? 'draft' : 'published' }
            : {}),
          ...(body.authorName !== undefined
            ? { authorName: String(body.authorName).trim() }
            : {}),
        });
        if (!updated) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.json(updated);
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Failed to update post';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.delete(
    '/api/admin/blog/:id',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const deleted = await deleteBlogPost(Number(req.params.id));
        if (!deleted) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ ok: true });
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Failed to delete post';
        res.status(500).json({ error: msg });
      }
    }
  );

  // Admin Gallery CRUD
  app.post(
    '/api/admin/gallery',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const body = req.body ?? {};
        if (!body.title || !body.category || !body.caption) {
          return res
            .status(400)
            .json({ error: 'Title, category, and caption are required.' });
        }
        const created = await createGalleryItem({
          title: String(body.title).trim(),
          category: String(body.category).trim(),
          caption: String(body.caption).trim(),
          imageKey: String(body.imageKey || 'hero-lab').trim(),
        });
        res.status(201).json(created);
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Failed to add gallery item';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.delete(
    '/api/admin/gallery/:id',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const deleted = await deleteGalleryItem(Number(req.params.id));
        if (!deleted) {
          return res.status(404).json({ error: 'Gallery item not found' });
        }
        res.json({ ok: true });
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to delete gallery item';
        res.status(500).json({ error: msg });
      }
    }
  );

  // Admin Enrollments Management
  app.get(
    '/api/admin/enrollments',
    requireAuth,
    requireAdmin,
    async (_req: AuthRequest, res) => {
      try {
        const items = await getAllEnrollments();
        res.json(items);
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to load enrollments';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.patch(
    '/api/admin/enrollments/:id',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const { status } = req.body ?? {};
        if (!status) {
          return res.status(400).json({ error: 'Status is required' });
        }
        const updated = await updateEnrollmentStatus(Number(req.params.id), String(status));
        if (!updated) {
          return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.json(updated);
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to update enrollment';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.delete(
    '/api/admin/enrollments/:id',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const deleted = await deleteEnrollment(Number(req.params.id));
        if (!deleted) {
          return res.status(404).json({ error: 'Enrollment not found' });
        }
        res.json({ ok: true });
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to delete enrollment';
        res.status(500).json({ error: msg });
      }
    }
  );

  // Admin Contact Messages Management
  app.get(
    '/api/admin/contacts',
    requireAuth,
    requireAdmin,
    async (_req: AuthRequest, res) => {
      try {
        const items = await getAllContactMessages();
        res.json(items);
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to load contact messages';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.patch(
    '/api/admin/contacts/:id',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const { status } = req.body ?? {};
        if (!status) {
          return res.status(400).json({ error: 'Status is required' });
        }
        const updated = await updateContactMessageStatus(
          Number(req.params.id),
          String(status)
        );
        if (!updated) {
          return res.status(404).json({ error: 'Message not found' });
        }
        res.json(updated);
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to update message status';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.delete(
    '/api/admin/contacts/:id',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const deleted = await deleteContactMessage(Number(req.params.id));
        if (!deleted) {
          return res.status(404).json({ error: 'Message not found' });
        }
        res.json({ ok: true });
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Failed to delete message';
        res.status(500).json({ error: msg });
      }
    }
  );

  // Admin Student Portal Records & Announcements
  app.get(
    '/api/admin/students',
    requireAuth,
    requireAdmin,
    async (_req: AuthRequest, res) => {
      try {
        const items = await getAllStudentRecords();
        res.json(items);
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to load student records';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.post(
    '/api/admin/students',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const body = req.body ?? {};
        if (!body.studentEmail || !body.courseTitle || !body.batchName) {
          return res.status(400).json({
            error: 'Student email, course title, and batch name are required.',
          });
        }
        const created = await createStudentRecord({
          studentEmail: String(body.studentEmail).trim(),
          courseId: body.courseId ? Number(body.courseId) : null,
          courseTitle: String(body.courseTitle).trim(),
          batchName: String(body.batchName).trim(),
          attendancePercent: Number(body.attendancePercent ?? 90),
          sessionsAttended: Number(body.sessionsAttended ?? 18),
          totalSessions: Number(body.totalSessions ?? 20),
          assessmentScore: String(body.assessmentScore || 'Pending').trim(),
          resultStatus: String(body.resultStatus || 'In Progress').trim(),
          certificateCode: body.certificateCode
            ? String(body.certificateCode).trim()
            : null,
        });
        res.status(201).json(created);
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to create student record';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.patch(
    '/api/admin/students/:id',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const body = req.body ?? {};
        const updated = await updateStudentRecord(Number(req.params.id), {
          ...(body.attendancePercent !== undefined
            ? { attendancePercent: Number(body.attendancePercent) }
            : {}),
          ...(body.assessmentScore !== undefined
            ? { assessmentScore: String(body.assessmentScore) }
            : {}),
          ...(body.resultStatus !== undefined
            ? { resultStatus: String(body.resultStatus) }
            : {}),
          ...(body.certificateCode !== undefined
            ? { certificateCode: body.certificateCode || null }
            : {}),
        });
        if (!updated) {
          return res.status(404).json({ error: 'Student record not found' });
        }
        res.json(updated);
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to update student record';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.post(
    '/api/admin/announcements',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const { title, body, targetGroup } = req.body ?? {};
        if (!title || !body) {
          return res
            .status(400)
            .json({ error: 'Announcement title and message body are required.' });
        }
        const created = await createAnnouncement({
          title: String(title).trim(),
          body: String(body).trim(),
          targetGroup: String(targetGroup || 'All Students').trim(),
        });
        res.status(201).json(created);
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to publish announcement';
        res.status(500).json({ error: msg });
      }
    }
  );

  app.post(
    '/api/admin/materials',
    requireAuth,
    requireAdmin,
    async (req: AuthRequest, res) => {
      try {
        const body = req.body ?? {};
        if (!body.courseTitle || !body.title || !body.materialType || !body.description) {
          return res.status(400).json({ error: 'Missing required material fields.' });
        }
        const created = await createCourseMaterial({
          courseId: body.courseId ? Number(body.courseId) : null,
          courseTitle: String(body.courseTitle).trim(),
          title: String(body.title).trim(),
          materialType: String(body.materialType).trim(),
          dueDate: body.dueDate ? String(body.dueDate).trim() : null,
          description: String(body.description).trim(),
          contentMarkdown: String(body.contentMarkdown || body.description).trim(),
        });
        res.status(201).json(created);
      } catch (error: unknown) {
        const msg =
          error instanceof Error ? error.message : 'Failed to create course material';
        res.status(500).json({ error: msg });
      }
    }
  );

  // Vite middleware in development, static dist in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
