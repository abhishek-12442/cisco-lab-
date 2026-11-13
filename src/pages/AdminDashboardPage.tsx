import React, { useCallback, useEffect, useState } from 'react';
import {
  BookOpen,
  FileEdit,
  GraduationCap,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Plus,
  Trash2,
  UserPlus,
} from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/institute.ts';
import { useAuth } from '../lib/authContext.tsx';
import { api } from '../lib/api.ts';
import { IMAGE_PRESET_OPTIONS } from '../lib/images.ts';
import { GALLERY_CATEGORIES } from './GalleryPage.tsx';
import type {
  AdminOverviewPayload,
  BlogPost,
  ContactMessage,
  Course,
  Enrollment,
  GalleryItem,
  StudentEnrollment,
} from '../types.ts';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
  onRefreshPublicData: () => Promise<void>;
}

type AdminSection =
  | 'overview'
  | 'courses'
  | 'blog'
  | 'gallery'
  | 'enquiries'
  | 'messages'
  | 'students';

export function AdminDashboardPage({
  onNavigate,
  onRefreshPublicData,
}: AdminDashboardPageProps) {
  const {
    firebaseUser,
    dbUser,
    loading: authLoading,
    authError,
    signInWithGoogle,
    signOut,
    getToken,
  } = useAuth();

  const [section, setSection] = useState<AdminSection>('overview');
  const [overview, setOverview] = useState<AdminOverviewPayload | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [enquiries, setEnquiries] = useState<Enrollment[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [students, setStudents] = useState<StudentEnrollment[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Course Editor State
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseShort, setCourseShort] = useState('');
  const [courseOverview, setCourseOverview] = useState('');
  const [courseDuration, setCourseDuration] = useState('12 Weeks');
  const [courseLevel, setCourseLevel] = useState('Beginner to Intermediate');
  const [courseSchedule, setCourseSchedule] = useState(
    'Morning (7:00 AM) · Day (11:00 AM) · Evening (5:30 PM)'
  );
  const [courseFee, setCourseFee] = useState('NPR 20,000');
  const [courseImageKey, setCourseImageKey] = useState('ccna-rack');
  const [courseIcon, setCourseIcon] = useState('Network');

  // Blog Editor State
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState('Career Guide');
  const [postTags, setPostTags] = useState('Networking, Nepal IT');
  const [postImage, setPostImage] = useState('classroom-training');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postStatus, setPostStatus] = useState<'published' | 'draft'>('published');

  // Gallery Form State
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState('Networking Lab');
  const [galCaption, setGalCaption] = useState('');
  const [galImageKey, setGalImageKey] = useState('ccna-rack');

  // Student Portal Management State
  const [stuEmail, setStuEmail] = useState('');
  const [stuCourseTitle, setStuCourseTitle] = useState('CCNA & Networking');
  const [stuBatch, setStuBatch] = useState('Morning Cohort · 2026-C');
  const [stuCertCode, setStuCertCode] = useState('');
  const [annTitle, setAnnTitle] = useState('');
  const [annBody, setAnnBody] = useState('');

  const loadAllAdminData = useCallback(async () => {
    const token = await getToken();
    if (!token) return;
    setLoadingData(true);
    try {
      const [ov, cs, ps, gs, ens, msgs, stus] = await Promise.all([
        api.getAdminOverview(token),
        api.getCourses(),
        api.getAdminBlogPosts(token),
        api.getGallery(),
        api.getEnrollments(token),
        api.getContacts(token),
        api.getStudentRecords(token),
      ]);
      setOverview(ov);
      setCourses(cs);
      setPosts(ps);
      setGallery(gs);
      setEnquiries(ens);
      setMessages(msgs);
      setStudents(stus);
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : 'Failed to load admin data');
    } finally {
      setLoadingData(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (firebaseUser && dbUser?.role === 'admin') {
      loadAllAdminData();
    }
  }, [firebaseUser, dbUser, loadAllAdminData]);

  const resetCourseForm = () => {
    setEditingCourseId(null);
    setCourseTitle('');
    setCourseShort('');
    setCourseOverview('');
    setCourseDuration('12 Weeks');
    setCourseLevel('Beginner to Intermediate');
    setCourseSchedule('Morning (7:00 AM) · Day (11:00 AM) · Evening (5:30 PM)');
    setCourseFee('NPR 20,000');
    setCourseImageKey('ccna-rack');
    setCourseIcon('Network');
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken();
    if (!token) return;
    setFeedback(null);
    try {
      const payload = {
        title: courseTitle,
        shortDescription: courseShort,
        overview: courseOverview || courseShort,
        duration: courseDuration,
        level: courseLevel,
        schedule: courseSchedule,
        feeNpr: courseFee,
        imageKey: courseImageKey,
        iconName: courseIcon,
      };
      if (editingCourseId) {
        await api.updateCourse(token, editingCourseId, payload);
        setFeedback('Course updated successfully.');
      } else {
        await api.createCourse(token, payload);
        setFeedback('New course created.');
      }
      resetCourseForm();
      await Promise.all([loadAllAdminData(), onRefreshPublicData()]);
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : 'Failed to save course');
    }
  };

  const handleEditCourse = (c: Course) => {
    setEditingCourseId(c.id);
    setCourseTitle(c.title);
    setCourseShort(c.shortDescription);
    setCourseOverview(c.overview);
    setCourseDuration(c.duration);
    setCourseLevel(c.level);
    setCourseSchedule(c.schedule);
    setCourseFee(c.feeNpr);
    setCourseImageKey(c.imageKey);
    setCourseIcon(c.iconName);
  };

  const handleDeleteCourse = async (id: number) => {
    const token = await getToken();
    if (!token) return;
    await api.deleteCourse(token, id);
    setFeedback('Course deleted.');
    await Promise.all([loadAllAdminData(), onRefreshPublicData()]);
  };

  const resetPostForm = () => {
    setEditingPostId(null);
    setPostTitle('');
    setPostCategory('Career Guide');
    setPostTags('Networking, Nepal IT');
    setPostImage('classroom-training');
    setPostExcerpt('');
    setPostContent('');
    setPostStatus('published');
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken();
    if (!token) return;
    setFeedback(null);
    try {
      const payload = {
        title: postTitle,
        category: postCategory,
        tags: postTags,
        featuredImage: postImage,
        excerpt: postExcerpt,
        content: postContent,
        status: postStatus,
      };
      if (editingPostId) {
        await api.updateBlogPost(token, editingPostId, payload);
        setFeedback('Blog post updated.');
      } else {
        await api.createBlogPost(token, payload);
        setFeedback(
          postStatus === 'published'
            ? 'Blog post published to public website.'
            : 'Blog post saved as draft.'
        );
      }
      resetPostForm();
      await Promise.all([loadAllAdminData(), onRefreshPublicData()]);
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : 'Failed to save blog post');
    }
  };

  const handleTogglePostStatus = async (post: BlogPost) => {
    const token = await getToken();
    if (!token) return;
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    await api.updateBlogPost(token, post.id, { status: nextStatus });
    setFeedback(
      nextStatus === 'published' ? 'Post published live.' : 'Post moved to draft.'
    );
    await Promise.all([loadAllAdminData(), onRefreshPublicData()]);
  };

  const handleDeletePost = async (id: number) => {
    const token = await getToken();
    if (!token) return;
    await api.deleteBlogPost(token, id);
    setFeedback('Blog post deleted.');
    await Promise.all([loadAllAdminData(), onRefreshPublicData()]);
  };

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken();
    if (!token) return;
    await api.createGalleryItem(token, {
      title: galTitle,
      category: galCategory,
      caption: galCaption,
      imageKey: galImageKey,
    });
    setGalTitle('');
    setGalCaption('');
    setFeedback('Gallery photo added.');
    await Promise.all([loadAllAdminData(), onRefreshPublicData()]);
  };

  const handleDeleteGallery = async (id: number) => {
    const token = await getToken();
    if (!token) return;
    await api.deleteGalleryItem(token, id);
    setFeedback('Gallery item deleted.');
    await Promise.all([loadAllAdminData(), onRefreshPublicData()]);
  };

  const handleProvisionStudentFromEnquiry = async (enr: Enrollment) => {
    const token = await getToken();
    if (!token) return;
    await api.createStudentRecord(token, {
      studentEmail: enr.email,
      courseId: enr.courseId,
      courseTitle: enr.courseTitle,
      batchName: `${enr.preferredTime.split(' ')[0]} Cohort · 2026`,
    });
    await api.updateEnrollmentStatus(token, enr.id, 'Enrolled');
    setFeedback(`Enrolled ${enr.fullName} (${enr.email}) into Student Portal.`);
    await loadAllAdminData();
  };

  const handleAddStudentRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken();
    if (!token) return;
    await api.createStudentRecord(token, {
      studentEmail: stuEmail,
      courseTitle: stuCourseTitle,
      batchName: stuBatch,
      certificateCode: stuCertCode || null,
    });
    setStuEmail('');
    setStuCertCode('');
    setFeedback('Student portal enrollment assigned.');
    await loadAllAdminData();
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken();
    if (!token) return;
    await api.createAnnouncement(token, {
      title: annTitle,
      body: annBody,
      targetGroup: 'All Students',
    });
    setAnnTitle('');
    setAnnBody('');
    setFeedback('Announcement posted to Student Portal.');
  };

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="h-64 rounded-xl bg-white border border-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!firebaseUser || !dbUser) {
    return (
      <div className="bg-[#F8FAFC] min-h-[80vh] py-16 px-4">
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-8">
          <p className="text-xs font-semibold text-[#1D4ED8]">
            {INSTITUTE_CONFIG.shortName} Staff Access
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-[#0B1B36]">
            Admin Panel Login
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Sign in with your authorized administrator Google account to manage
            courses, blog posts, gallery photos, student enquiries, and contact
            messages.
          </p>

          {authError && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {authError}
            </div>
          )}

          <button
            type="button"
            onClick={signInWithGoogle}
            className="mt-6 w-full py-3 px-4 text-sm font-semibold text-white bg-[#0B1B36] hover:bg-[#102A52] rounded-lg transition-colors"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  if (dbUser.role !== 'admin') {
    return (
      <div className="bg-[#F8FAFC] min-h-[80vh] py-16 px-4">
        <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-xl p-8 text-center">
          <h1 className="font-display text-xl font-bold text-[#0B1B36]">
            Administrator Access Required
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Signed in as <strong>{dbUser.email}</strong> (Student role). Only
            designated institute administrators can access the management console.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/student')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg"
            >
              Go to Student Portal
            </button>
            <button
              type="button"
              onClick={signOut}
              className="px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navItems: { id: AdminSection; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Manage Courses', icon: BookOpen },
    { id: 'blog', label: 'Manage Blog Posts', icon: FileEdit },
    { id: 'gallery', label: 'Manage Gallery', icon: ImageIcon },
    { id: 'enquiries', label: 'Student Enquiries', icon: Inbox },
    { id: 'messages', label: 'Contact Messages', icon: Mail },
    { id: 'students', label: 'Student Portal Records', icon: GraduationCap },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-[85vh] flex flex-col lg:flex-row">
      {/* Sidebar 240px */}
      <aside className="w-full lg:w-64 bg-[#071429] text-slate-300 border-b lg:border-b-0 lg:border-r border-slate-800 shrink-0 flex flex-col justify-between">
        <div>
          <div className="px-5 py-5 border-b border-slate-800">
            <p className="text-xs font-medium text-blue-300">Admin Console</p>
            <p className="mt-0.5 font-display text-sm font-bold text-white truncate">
              {dbUser.name}
            </p>
            <p className="text-[11px] text-slate-400 truncate">{dbUser.email}</p>
          </div>

          <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    section === item.id
                      ? 'bg-[#1D4ED8] text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800 hidden lg:block">
          <button
            type="button"
            onClick={signOut}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <p className="text-xs text-slate-500">
              Admin Dashboard / {navItems.find((n) => n.id === section)?.label}
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-[#0B1B36]">
              {navItems.find((n) => n.id === section)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="px-3.5 py-2 text-xs font-semibold text-[#0B1B36] border border-slate-300 bg-white rounded-lg hover:bg-slate-50"
            >
              View Public Site
            </button>
            <button
              type="button"
              onClick={signOut}
              className="lg:hidden px-3.5 py-2 text-xs font-semibold text-white bg-[#0B1B36] rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {feedback && (
          <div className="mt-5 p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-medium text-[#0B1B36] flex items-center justify-between">
            <span>{feedback}</span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="text-slate-500 hover:text-slate-900"
            >
              Dismiss
            </button>
          </div>
        )}

        {loadingData && !overview ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="h-24 rounded-xl bg-white border border-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 space-y-8">
            {/* OVERVIEW */}
            {section === 'overview' && overview && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Active Courses', value: overview.counts.courses },
                    {
                      label: 'Published Blog Posts',
                      value: overview.counts.publishedPosts,
                    },
                    {
                      label: 'Pending Enquiries',
                      value: overview.counts.pendingEnrollments,
                    },
                    {
                      label: 'Unread Contact Messages',
                      value: overview.counts.unreadMessages,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white border border-slate-200 rounded-xl p-5"
                    >
                      <p className="text-xs text-slate-500">{stat.label}</p>
                      <p className="mt-2 font-mono text-2xl font-bold text-[#0B1B36] tabular-nums">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-base font-bold text-[#0B1B36]">
                        Recent Student Enquiries
                      </h2>
                      <button
                        type="button"
                        onClick={() => setSection('enquiries')}
                        className="text-xs font-semibold text-[#1D4ED8]"
                      >
                        Manage All →
                      </button>
                    </div>
                    {overview.recentEnrollments.length === 0 ? (
                      <p className="mt-4 text-xs text-slate-500">
                        No student enrollment submissions yet.
                      </p>
                    ) : (
                      <ul className="mt-4 divide-y divide-slate-100 text-sm">
                        {overview.recentEnrollments.map((enr) => (
                          <li key={enr.id} className="py-2.5 flex justify-between gap-2">
                            <div>
                              <p className="font-semibold text-[#0B1B36]">
                                {enr.fullName}
                              </p>
                              <p className="text-xs text-slate-500">
                                {enr.courseTitle} · {enr.preferredTime}
                              </p>
                            </div>
                            <span className="text-xs font-medium text-[#1D4ED8] shrink-0">
                              {enr.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-base font-bold text-[#0B1B36]">
                        Recent Contact Messages
                      </h2>
                      <button
                        type="button"
                        onClick={() => setSection('messages')}
                        className="text-xs font-semibold text-[#1D4ED8]"
                      >
                        Manage All →
                      </button>
                    </div>
                    {overview.recentMessages.length === 0 ? (
                      <p className="mt-4 text-xs text-slate-500">
                        No contact messages received yet.
                      </p>
                    ) : (
                      <ul className="mt-4 divide-y divide-slate-100 text-sm">
                        {overview.recentMessages.map((msg) => (
                          <li key={msg.id} className="py-2.5 flex justify-between gap-2">
                            <div>
                              <p className="font-semibold text-[#0B1B36]">
                                {msg.subject}
                              </p>
                              <p className="text-xs text-slate-500">
                                From {msg.fullName} ({msg.email})
                              </p>
                            </div>
                            <span className="text-xs font-medium text-slate-600 shrink-0">
                              {msg.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* MANAGE COURSES */}
            {section === 'courses' && (
              <div className="space-y-8">
                <form
                  onSubmit={handleSaveCourse}
                  className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold text-[#0B1B36]">
                      {editingCourseId ? 'Edit Course' : 'Add New Course'}
                    </h2>
                    {editingCourseId && (
                      <button
                        type="button"
                        onClick={resetCourseForm}
                        className="text-xs font-semibold text-slate-500 hover:text-[#0B1B36]"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="e.g., Cloud & AWS Fundamentals"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Duration *
                      </label>
                      <input
                        type="text"
                        required
                        value={courseDuration}
                        onChange={(e) => setCourseDuration(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Course Fee *
                      </label>
                      <input
                        type="text"
                        required
                        value={courseFee}
                        onChange={(e) => setCourseFee(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Level
                      </label>
                      <input
                        type="text"
                        value={courseLevel}
                        onChange={(e) => setCourseLevel(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Lab Image Preset
                      </label>
                      <select
                        value={courseImageKey}
                        onChange={(e) => setCourseImageKey(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                      >
                        {IMAGE_PRESET_OPTIONS.map((opt) => (
                          <option key={opt.key} value={opt.key}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Schedule
                      </label>
                      <input
                        type="text"
                        value={courseSchedule}
                        onChange={(e) => setCourseSchedule(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                      Short Description *
                    </label>
                    <input
                      type="text"
                      required
                      value={courseShort}
                      onChange={(e) => setCourseShort(e.target.value)}
                      placeholder="Concise summary displayed on course cards..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                      Detailed Course Overview
                    </label>
                    <textarea
                      rows={3}
                      value={courseOverview}
                      onChange={(e) => setCourseOverview(e.target.value)}
                      placeholder="Full overview shown on the Course Details page..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    {editingCourseId ? 'Update Course' : 'Add Course'}
                  </button>
                </form>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-5 font-semibold">Course</th>
                          <th className="py-3 px-5 font-semibold">Duration</th>
                          <th className="py-3 px-5 font-semibold">Fee</th>
                          <th className="py-3 px-5 font-semibold">Level</th>
                          <th className="py-3 px-5 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {courses.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50/70">
                            <td className="py-3 px-5 font-semibold text-[#0B1B36]">
                              {c.title}
                            </td>
                            <td className="py-3 px-5 tabular-nums text-slate-600">
                              {c.duration}
                            </td>
                            <td className="py-3 px-5 font-mono tabular-nums text-slate-700">
                              {c.feeNpr}
                            </td>
                            <td className="py-3 px-5 text-slate-600">{c.level}</td>
                            <td className="py-3 px-5 text-right space-x-3 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleEditCourse(c)}
                                className="text-xs font-semibold text-[#1D4ED8] hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCourse(c.id)}
                                className="text-xs font-semibold text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* MANAGE BLOG POSTS */}
            {section === 'blog' && (
              <div className="space-y-8">
                <form
                  onSubmit={handleSavePost}
                  className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold text-[#0B1B36]">
                      {editingPostId ? 'Edit Blog / News Post' : 'Write New Post'}
                    </h2>
                    {editingPostId && (
                      <button
                        type="button"
                        onClick={resetPostForm}
                        className="text-xs font-semibold text-slate-500 hover:text-[#0B1B36]"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Post Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="e.g., MikroTik Routing Workshop Schedule"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Category *
                      </label>
                      <input
                        type="text"
                        required
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value)}
                        placeholder="e.g., Career Guide, Technical Guide, Institute News"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Tags (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={postTags}
                        onChange={(e) => setPostTags(e.target.value)}
                        placeholder="CCNA, Linux, Kathmandu"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Featured Image
                      </label>
                      <select
                        value={postImage}
                        onChange={(e) => setPostImage(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                      >
                        {IMAGE_PRESET_OPTIONS.map((opt) => (
                          <option key={opt.key} value={opt.key}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Status
                      </label>
                      <select
                        value={postStatus}
                        onChange={(e) =>
                          setPostStatus(e.target.value as 'published' | 'draft')
                        }
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                      >
                        <option value="published">Published (Visible on Site)</option>
                        <option value="draft">Draft (Hidden)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                      Short Excerpt
                    </label>
                    <input
                      type="text"
                      value={postExcerpt}
                      onChange={(e) => setPostExcerpt(e.target.value)}
                      placeholder="1–2 sentence summary shown on blog cards..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                      Post Content *
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Write the full article or institute news update..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg"
                  >
                    {editingPostId
                      ? 'Save Changes'
                      : postStatus === 'published'
                        ? 'Publish Post'
                        : 'Save as Draft'}
                  </button>
                </form>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-5 font-semibold">Post Title</th>
                          <th className="py-3 px-5 font-semibold">Category</th>
                          <th className="py-3 px-5 font-semibold">Status</th>
                          <th className="py-3 px-5 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {posts.map((post) => (
                          <tr key={post.id} className="hover:bg-slate-50/70">
                            <td className="py-3 px-5 font-semibold text-[#0B1B36]">
                              {post.title}
                            </td>
                            <td className="py-3 px-5 text-slate-600">{post.category}</td>
                            <td className="py-3 px-5">
                              <span
                                className={`text-xs font-semibold ${
                                  post.status === 'published'
                                    ? 'text-emerald-700'
                                    : 'text-amber-700'
                                }`}
                              >
                                {post.status === 'published' ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td className="py-3 px-5 text-right space-x-3 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleTogglePostStatus(post)}
                                className="text-xs font-semibold text-[#0B1B36] hover:underline"
                              >
                                {post.status === 'published' ? 'Unpublish' : 'Publish'}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingPostId(post.id);
                                  setPostTitle(post.title);
                                  setPostCategory(post.category);
                                  setPostTags(post.tags.join(', '));
                                  setPostImage(post.featuredImage);
                                  setPostExcerpt(post.excerpt);
                                  setPostContent(post.content);
                                  setPostStatus(post.status);
                                }}
                                className="text-xs font-semibold text-[#1D4ED8] hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeletePost(post.id)}
                                className="text-xs font-semibold text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* MANAGE GALLERY */}
            {section === 'gallery' && (
              <div className="space-y-8">
                <form
                  onSubmit={handleAddGallery}
                  className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                >
                  <h2 className="font-display text-lg font-bold text-[#0B1B36]">
                    Add Gallery Item
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={galTitle}
                        onChange={(e) => setGalTitle(e.target.value)}
                        placeholder="e.g., Batch 2026 Lab Assessment"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Category *
                      </label>
                      <select
                        value={galCategory}
                        onChange={(e) => setGalCategory(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                      >
                        {GALLERY_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Image Asset
                      </label>
                      <select
                        value={galImageKey}
                        onChange={(e) => setGalImageKey(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                      >
                        {IMAGE_PRESET_OPTIONS.map((opt) => (
                          <option key={opt.key} value={opt.key}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                      Caption *
                    </label>
                    <input
                      type="text"
                      required
                      value={galCaption}
                      onChange={(e) => setGalCaption(e.target.value)}
                      placeholder="Brief description of the lab or event photo..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg"
                  >
                    Add to Gallery
                  </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gallery.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between"
                    >
                      <div>
                        <p className="text-xs font-semibold text-[#1D4ED8]">
                          {item.category}
                        </p>
                        <p className="mt-1 font-display text-sm font-bold text-[#0B1B36]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">{item.caption}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteGallery(item.id)}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:underline"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STUDENT ENQUIRIES */}
            {section === 'enquiries' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                {enquiries.length === 0 ? (
                  <div className="p-10 text-center text-sm text-slate-500">
                    No student enrollment enquiries submitted yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4 font-semibold">Applicant</th>
                          <th className="py-3 px-4 font-semibold">Course &amp; Shift</th>
                          <th className="py-3 px-4 font-semibold">Contact</th>
                          <th className="py-3 px-4 font-semibold">Status</th>
                          <th className="py-3 px-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {enquiries.map((enr) => (
                          <tr key={enr.id} className="hover:bg-slate-50/70">
                            <td className="py-3 px-4">
                              <p className="font-semibold text-[#0B1B36]">
                                {enr.fullName}
                              </p>
                              <p className="text-xs text-slate-500">{enr.address}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="font-medium text-[#0B1B36]">
                                {enr.courseTitle}
                              </p>
                              <p className="text-xs text-slate-500">
                                {enr.preferredTime}
                              </p>
                            </td>
                            <td className="py-3 px-4 text-xs text-slate-600">
                              <p className="tabular-nums">{enr.phone}</p>
                              <p>{enr.email}</p>
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={enr.status}
                                onChange={async (e) => {
                                  const token = await getToken();
                                  if (!token) return;
                                  await api.updateEnrollmentStatus(
                                    token,
                                    enr.id,
                                    e.target.value
                                  );
                                  await loadAllAdminData();
                                }}
                                className="px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Enrolled">Enrolled</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right space-x-3 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleProvisionStudentFromEnquiry(enr)}
                                className="inline-flex items-center gap-1 text-xs font-semibold text-[#1D4ED8] hover:underline"
                              >
                                <UserPlus className="w-3.5 h-3.5" aria-hidden="true" />
                                Enroll Portal
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  const token = await getToken();
                                  if (!token) return;
                                  await api.deleteEnrollment(token, enr.id);
                                  await loadAllAdminData();
                                }}
                                className="text-xs font-semibold text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* CONTACT MESSAGES */}
            {section === 'messages' && (
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-500">
                    No contact messages yet.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-[#1D4ED8]">
                            {msg.status}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">
                            {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <h3 className="font-display text-base font-bold text-[#0B1B36]">
                          {msg.subject}
                        </h3>
                        <p className="text-xs text-slate-600">
                          {msg.fullName} · {msg.email}{' '}
                          {msg.phone ? `· ${msg.phone}` : ''}
                        </p>
                        <p className="mt-2 text-sm text-slate-700">{msg.message}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={msg.status}
                          onChange={async (e) => {
                            const token = await getToken();
                            if (!token) return;
                            await api.updateContactStatus(
                              token,
                              msg.id,
                              e.target.value
                            );
                            await loadAllAdminData();
                          }}
                          className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
                        >
                          <option value="Unread">Unread</option>
                          <option value="Read">Read</option>
                          <option value="Replied">Replied</option>
                        </select>
                        <button
                          type="button"
                          onClick={async () => {
                            const token = await getToken();
                            if (!token) return;
                            await api.deleteContact(token, msg.id);
                            await loadAllAdminData();
                          }}
                          className="px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* STUDENT PORTAL RECORDS */}
            {section === 'students' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <form
                    onSubmit={handleAddStudentRecord}
                    className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                  >
                    <h2 className="font-display text-base font-bold text-[#0B1B36]">
                      Assign Course to Student Account
                    </h2>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Student Google Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={stuEmail}
                        onChange={(e) => setStuEmail(e.target.value)}
                        placeholder="student@gmail.com"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                          Course
                        </label>
                        <select
                          value={stuCourseTitle}
                          onChange={(e) => setStuCourseTitle(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                        >
                          {courses.map((c) => (
                            <option key={c.id} value={c.title}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                          Batch Name
                        </label>
                        <input
                          type="text"
                          required
                          value={stuBatch}
                          onChange={(e) => setStuBatch(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Certificate Code (Optional)
                      </label>
                      <input
                        type="text"
                        value={stuCertCode}
                        onChange={(e) => setStuCertCode(e.target.value)}
                        placeholder="e.g., HNT-CCNA-2026-0912"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg"
                    >
                      Assign to Student Portal
                    </button>
                  </form>

                  <form
                    onSubmit={handleAddAnnouncement}
                    className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
                  >
                    <h2 className="font-display text-base font-bold text-[#0B1B36]">
                      Publish Student Announcement
                    </h2>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Announcement Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={annTitle}
                        onChange={(e) => setAnnTitle(e.target.value)}
                        placeholder="e.g., Lab Exam Schedule Released"
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1B36] mb-1">
                        Message Body *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={annBody}
                        onChange={(e) => setAnnBody(e.target.value)}
                        placeholder="Write announcement for logged-in students..."
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#0B1B36] rounded-lg"
                    >
                      Post Announcement
                    </button>
                  </form>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-200">
                    <h3 className="font-display text-base font-bold text-[#0B1B36]">
                      Enrolled Student Academic Records
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-xs text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4 font-semibold">Student Email</th>
                          <th className="py-3 px-4 font-semibold">Course</th>
                          <th className="py-3 px-4 font-semibold">Batch</th>
                          <th className="py-3 px-4 font-semibold text-right">
                            Attendance %
                          </th>
                          <th className="py-3 px-4 font-semibold">Result</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {students.map((st) => (
                          <tr key={st.id}>
                            <td className="py-3 px-4 font-medium text-[#0B1B36]">
                              {st.studentEmail}
                            </td>
                            <td className="py-3 px-4 text-slate-700">
                              {st.courseTitle}
                            </td>
                            <td className="py-3 px-4 text-slate-600">{st.batchName}</td>
                            <td className="py-3 px-4 text-right font-mono tabular-nums">
                              {st.attendancePercent}%
                            </td>
                            <td className="py-3 px-4 text-[#1D4ED8] font-medium">
                              {st.resultStatus} ({st.assessmentScore})
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
