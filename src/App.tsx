import { useCallback, useEffect, useState } from 'react';
import { AuthProvider } from './lib/authContext.tsx';
import { api } from './lib/api.ts';
import type { BlogPost, Course, GalleryItem } from './types.ts';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { CoursesPage } from './pages/CoursesPage.tsx';
import { CourseDetailPage } from './pages/CourseDetailPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';
import { BlogPage } from './pages/BlogPage.tsx';
import { BlogPostPage } from './pages/BlogPostPage.tsx';
import { EnrollPage } from './pages/EnrollPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { StudentPortalPage } from './pages/StudentPortalPage.tsx';
import { AdminDashboardPage } from './pages/AdminDashboardPage.tsx';

function AppShell() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loadingPublic, setLoadingPublic] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [preselectedCourse, setPreselectedCourse] = useState<Course | null>(null);

  const loadPublicData = useCallback(async () => {
    try {
      const [c, p, g] = await Promise.all([
        api.getCourses(),
        api.getBlogPosts(),
        api.getGallery(),
      ]);
      setCourses(c);
      setPosts(p);
      setGallery(g);
      setLoadError(null);
    } catch (err) {
      console.error('Failed to load initial catalog:', err);
      setLoadError(
        err instanceof Error ? err.message : 'Unable to reach training database.'
      );
    } finally {
      setLoadingPublic(false);
    }
  }, []);

  useEffect(() => {
    loadPublicData();
  }, [loadPublicData]);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback((path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCourseForEnroll = useCallback(
    (course: Course) => {
      setPreselectedCourse(course);
      navigate('/enroll');
    },
    [navigate]
  );

  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '') {
      return (
        <HomePage
          courses={courses}
          posts={posts}
          loadingCourses={loadingPublic}
          onNavigate={navigate}
          onSelectCourseForEnroll={handleSelectCourseForEnroll}
        />
      );
    }
    if (currentPath === '/courses') {
      return (
        <CoursesPage
          courses={courses}
          loading={loadingPublic}
          onNavigate={navigate}
          onSelectCourseForEnroll={handleSelectCourseForEnroll}
        />
      );
    }
    if (currentPath.startsWith('/courses/')) {
      const slug = currentPath.replace('/courses/', '').replace(/\/$/, '');
      const course = courses.find((c) => c.slug === slug) || null;
      return (
        <CourseDetailPage
          course={course}
          loading={loadingPublic}
          onNavigate={navigate}
          onEnroll={handleSelectCourseForEnroll}
        />
      );
    }
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/services') {
      return <ServicesPage onNavigate={navigate} />;
    }
    if (currentPath === '/gallery') {
      return <GalleryPage items={gallery} loading={loadingPublic} />;
    }
    if (currentPath === '/blog') {
      return (
        <BlogPage posts={posts} loading={loadingPublic} onNavigate={navigate} />
      );
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
      const post = posts.find((p) => p.slug === slug) || null;
      return (
        <BlogPostPage post={post} loading={loadingPublic} onNavigate={navigate} />
      );
    }
    if (currentPath === '/enroll') {
      return (
        <EnrollPage
          courses={courses}
          preselectedCourse={preselectedCourse}
          onNavigate={navigate}
        />
      );
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/student') {
      return <StudentPortalPage onNavigate={navigate} />;
    }
    if (currentPath === '/admin') {
      return (
        <AdminDashboardPage
          onNavigate={navigate}
          onRefreshPublicData={loadPublicData}
        />
      );
    }

    return (
      <HomePage
        courses={courses}
        posts={posts}
        loadingCourses={loadingPublic}
        onNavigate={navigate}
        onSelectCourseForEnroll={handleSelectCourseForEnroll}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {loadError && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-center text-xs text-amber-800">
          {loadError}{' '}
          <button
            type="button"
            onClick={loadPublicData}
            className="font-semibold underline ml-2"
          >
            Retry
          </button>
        </div>
      )}

      <main className="flex-1">{renderRoute()}</main>

      <Footer courses={courses} onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
