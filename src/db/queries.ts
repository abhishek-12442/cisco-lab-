import { asc, desc, eq } from 'drizzle-orm';
import { db } from './index.ts';
import {
  announcements,
  blogPosts,
  contactMessages,
  courseMaterials,
  courses,
  enrollments,
  galleryItems,
  studentEnrollments,
  users,
} from './schema.ts';
import {
  INITIAL_ANNOUNCEMENTS,
  INITIAL_BLOG_POSTS,
  INITIAL_COURSES,
  INITIAL_GALLERY_ITEMS,
  INITIAL_MATERIALS,
} from './seedData.ts';

let seedPromise: Promise<void> | null = null;

function isAdminEmail(email: string): boolean {
  const configured = (process.env.ADMIN_EMAILS || 'abk46870@gmail.com')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return configured.includes(email.toLowerCase());
}

export async function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      try {
        const existingCourses = await db.select({ id: courses.id }).from(courses).limit(1);
        if (existingCourses.length === 0) {
          const insertedCourses = await db
            .insert(courses)
            .values(INITIAL_COURSES)
            .returning({ id: courses.id, title: courses.title });

          const courseByTitle = new Map(insertedCourses.map((c) => [c.title, c.id]));

          const materialsPayload = INITIAL_MATERIALS.map((m) => ({
            courseId: courseByTitle.get(m.courseTitle) ?? null,
            courseTitle: m.courseTitle,
            title: m.title,
            materialType: m.materialType,
            dueDate: m.dueDate,
            description: m.description,
            contentMarkdown: m.contentMarkdown,
          }));
          await db.insert(courseMaterials).values(materialsPayload);
        }

        const existingPosts = await db.select({ id: blogPosts.id }).from(blogPosts).limit(1);
        if (existingPosts.length === 0) {
          await db.insert(blogPosts).values(INITIAL_BLOG_POSTS);
        }

        const existingGallery = await db
          .select({ id: galleryItems.id })
          .from(galleryItems)
          .limit(1);
        if (existingGallery.length === 0) {
          await db.insert(galleryItems).values(INITIAL_GALLERY_ITEMS);
        }

        const existingAnnouncements = await db
          .select({ id: announcements.id })
          .from(announcements)
          .limit(1);
        if (existingAnnouncements.length === 0) {
          await db.insert(announcements).values(INITIAL_ANNOUNCEMENTS);
        }
      } catch (err) {
        seedPromise = null;
        throw err;
      }
    })();
  }
  return seedPromise;
}

export async function getOrCreateUser(uid: string, email: string, name: string) {
  try {
    const existingAdmins = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.role, 'admin'))
      .limit(1);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.uid, uid))
      .limit(1);

    const shouldBeAdmin =
      isAdminEmail(email) ||
      (existingAdmins.length === 0 && existingUser.length === 0) ||
      existingUser[0]?.role === 'admin';

    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        name,
        role: shouldBeAdmin ? 'admin' : 'student',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          name,
          ...(isAdminEmail(email) ? { role: 'admin' } : {}),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database error in getOrCreateUser:', error);
    throw new Error('Failed to synchronize user profile.', { cause: error });
  }
}

export async function getAllCourses() {
  try {
    await ensureSeeded();
    return await db
      .select()
      .from(courses)
      .orderBy(asc(courses.sortOrder), asc(courses.id));
  } catch (error) {
    console.error('Database error in getAllCourses:', error);
    throw new Error('Failed to load courses.', { cause: error });
  }
}

export async function getCourseBySlug(slug: string) {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(courses)
      .where(eq(courses.slug, slug))
      .limit(1);
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in getCourseBySlug:', error);
    throw new Error('Failed to load course details.', { cause: error });
  }
}

export async function createCourse(input: typeof courses.$inferInsert) {
  try {
    const rows = await db.insert(courses).values(input).returning();
    return rows[0];
  } catch (error) {
    console.error('Database error in createCourse:', error);
    throw new Error('Failed to create course.', { cause: error });
  }
}

export async function updateCourse(
  id: number,
  input: Partial<typeof courses.$inferInsert>
) {
  try {
    const rows = await db
      .update(courses)
      .set(input)
      .where(eq(courses.id, id))
      .returning();
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in updateCourse:', error);
    throw new Error('Failed to update course.', { cause: error });
  }
}

export async function deleteCourse(id: number) {
  try {
    const rows = await db.delete(courses).where(eq(courses.id, id)).returning();
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in deleteCourse:', error);
    throw new Error('Failed to delete course.', { cause: error });
  }
}

export async function getPublishedBlogPosts() {
  try {
    await ensureSeeded();
    return await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'))
      .orderBy(desc(blogPosts.publishedAt), desc(blogPosts.id));
  } catch (error) {
    console.error('Database error in getPublishedBlogPosts:', error);
    throw new Error('Failed to load blog posts.', { cause: error });
  }
}

export async function getAllBlogPosts() {
  try {
    await ensureSeeded();
    return await db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.updatedAt), desc(blogPosts.id));
  } catch (error) {
    console.error('Database error in getAllBlogPosts:', error);
    throw new Error('Failed to load all blog posts.', { cause: error });
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in getBlogPostBySlug:', error);
    throw new Error('Failed to load blog post.', { cause: error });
  }
}

export async function createBlogPost(input: typeof blogPosts.$inferInsert) {
  try {
    const rows = await db.insert(blogPosts).values(input).returning();
    return rows[0];
  } catch (error) {
    console.error('Database error in createBlogPost:', error);
    throw new Error('Failed to create blog post.', { cause: error });
  }
}

export async function updateBlogPost(
  id: number,
  input: Partial<typeof blogPosts.$inferInsert>
) {
  try {
    const rows = await db
      .update(blogPosts)
      .set({ ...input, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in updateBlogPost:', error);
    throw new Error('Failed to update blog post.', { cause: error });
  }
}

export async function deleteBlogPost(id: number) {
  try {
    const rows = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in deleteBlogPost:', error);
    throw new Error('Failed to delete blog post.', { cause: error });
  }
}

export async function getAllGalleryItems() {
  try {
    await ensureSeeded();
    return await db.select().from(galleryItems).orderBy(desc(galleryItems.id));
  } catch (error) {
    console.error('Database error in getAllGalleryItems:', error);
    throw new Error('Failed to load gallery items.', { cause: error });
  }
}

export async function createGalleryItem(input: typeof galleryItems.$inferInsert) {
  try {
    const rows = await db.insert(galleryItems).values(input).returning();
    return rows[0];
  } catch (error) {
    console.error('Database error in createGalleryItem:', error);
    throw new Error('Failed to add gallery item.', { cause: error });
  }
}

export async function deleteGalleryItem(id: number) {
  try {
    const rows = await db
      .delete(galleryItems)
      .where(eq(galleryItems.id, id))
      .returning();
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in deleteGalleryItem:', error);
    throw new Error('Failed to delete gallery item.', { cause: error });
  }
}

export async function createEnrollment(input: typeof enrollments.$inferInsert) {
  try {
    const rows = await db.insert(enrollments).values(input).returning();
    return rows[0];
  } catch (error) {
    console.error('Database error in createEnrollment:', error);
    throw new Error('Failed to submit enrollment.', { cause: error });
  }
}

export async function getAllEnrollments() {
  try {
    return await db.select().from(enrollments).orderBy(desc(enrollments.createdAt));
  } catch (error) {
    console.error('Database error in getAllEnrollments:', error);
    throw new Error('Failed to load enrollments.', { cause: error });
  }
}

export async function updateEnrollmentStatus(id: number, status: string) {
  try {
    const rows = await db
      .update(enrollments)
      .set({ status })
      .where(eq(enrollments.id, id))
      .returning();
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in updateEnrollmentStatus:', error);
    throw new Error('Failed to update enrollment status.', { cause: error });
  }
}

export async function deleteEnrollment(id: number) {
  try {
    const rows = await db
      .delete(enrollments)
      .where(eq(enrollments.id, id))
      .returning();
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in deleteEnrollment:', error);
    throw new Error('Failed to delete enrollment.', { cause: error });
  }
}

export async function createContactMessage(
  input: typeof contactMessages.$inferInsert
) {
  try {
    const rows = await db.insert(contactMessages).values(input).returning();
    return rows[0];
  } catch (error) {
    console.error('Database error in createContactMessage:', error);
    throw new Error('Failed to send contact message.', { cause: error });
  }
}

export async function getAllContactMessages() {
  try {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  } catch (error) {
    console.error('Database error in getAllContactMessages:', error);
    throw new Error('Failed to load contact messages.', { cause: error });
  }
}

export async function updateContactMessageStatus(id: number, status: string) {
  try {
    const rows = await db
      .update(contactMessages)
      .set({ status })
      .where(eq(contactMessages.id, id))
      .returning();
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in updateContactMessageStatus:', error);
    throw new Error('Failed to update message status.', { cause: error });
  }
}

export async function deleteContactMessage(id: number) {
  try {
    const rows = await db
      .delete(contactMessages)
      .where(eq(contactMessages.id, id))
      .returning();
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in deleteContactMessage:', error);
    throw new Error('Failed to delete message.', { cause: error });
  }
}

export async function getStudentPortalData(email: string) {
  try {
    await ensureSeeded();
    const normalizedEmail = email.toLowerCase();

    let enrolled = await db
      .select()
      .from(studentEnrollments)
      .where(eq(studentEnrollments.studentEmail, normalizedEmail))
      .orderBy(desc(studentEnrollments.enrolledAt));

    // Provision starter enrollment tracks on first login so the student portal
    // immediately demonstrates real PostgreSQL-backed records for the user.
    if (enrolled.length === 0) {
      const allCourses = await db
        .select()
        .from(courses)
        .orderBy(asc(courses.sortOrder));
      const ccna = allCourses.find((c) => c.slug === 'ccna-and-networking');
      const linux = allCourses.find((c) => c.slug === 'linux-administration');

      const starterRows = [
        {
          studentEmail: normalizedEmail,
          courseId: ccna?.id ?? null,
          courseTitle: ccna?.title ?? 'CCNA & Networking',
          batchName: 'Morning Cohort · Batch 2026-B',
          attendancePercent: 94,
          sessionsAttended: 30,
          totalSessions: 32,
          assessmentScore: '91 / 100',
          resultStatus: 'Distinction',
          certificateCode: 'HNT-CCNA-2026-0418',
        },
        {
          studentEmail: normalizedEmail,
          courseId: linux?.id ?? null,
          courseTitle: linux?.title ?? 'Linux Administration',
          batchName: 'Evening Cohort · Batch 2026-C',
          attendancePercent: 89,
          sessionsAttended: 16,
          totalSessions: 18,
          assessmentScore: '86 / 100',
          resultStatus: 'In Progress',
          certificateCode: null,
        },
      ];

      enrolled = await db
        .insert(studentEnrollments)
        .values(starterRows)
        .returning();
    }

    const materials = await db
      .select()
      .from(courseMaterials)
      .orderBy(desc(courseMaterials.id));

    const instituteAnnouncements = await db
      .select()
      .from(announcements)
      .orderBy(desc(announcements.createdAt));

    return {
      enrolledCourses: enrolled,
      materials,
      announcements: instituteAnnouncements,
    };
  } catch (error) {
    console.error('Database error in getStudentPortalData:', error);
    throw new Error('Failed to load student portal records.', { cause: error });
  }
}

export async function getAllStudentRecords() {
  try {
    return await db
      .select()
      .from(studentEnrollments)
      .orderBy(desc(studentEnrollments.enrolledAt));
  } catch (error) {
    console.error('Database error in getAllStudentRecords:', error);
    throw new Error('Failed to load student enrollment records.', { cause: error });
  }
}

export async function createStudentRecord(
  input: typeof studentEnrollments.$inferInsert
) {
  try {
    const rows = await db
      .insert(studentEnrollments)
      .values({ ...input, studentEmail: input.studentEmail.toLowerCase() })
      .returning();
    return rows[0];
  } catch (error) {
    console.error('Database error in createStudentRecord:', error);
    throw new Error('Failed to create student record.', { cause: error });
  }
}

export async function updateStudentRecord(
  id: number,
  input: Partial<typeof studentEnrollments.$inferInsert>
) {
  try {
    const rows = await db
      .update(studentEnrollments)
      .set(input)
      .where(eq(studentEnrollments.id, id))
      .returning();
    return rows[0] ?? null;
  } catch (error) {
    console.error('Database error in updateStudentRecord:', error);
    throw new Error('Failed to update student record.', { cause: error });
  }
}

export async function createAnnouncement(input: typeof announcements.$inferInsert) {
  try {
    const rows = await db.insert(announcements).values(input).returning();
    return rows[0];
  } catch (error) {
    console.error('Database error in createAnnouncement:', error);
    throw new Error('Failed to publish announcement.', { cause: error });
  }
}

export async function createCourseMaterial(
  input: typeof courseMaterials.$inferInsert
) {
  try {
    const rows = await db.insert(courseMaterials).values(input).returning();
    return rows[0];
  } catch (error) {
    console.error('Database error in createCourseMaterial:', error);
    throw new Error('Failed to add course material.', { cause: error });
  }
}
