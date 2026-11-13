import { useEffect, useState } from 'react';
import {
  Award,
  Bell,
  BookOpen,
  CalendarCheck,
  Download,
  FileText,
  LogOut,
  Printer,
  Shield,
  X,
} from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/institute.ts';
import { useAuth } from '../lib/authContext.tsx';
import { api } from '../lib/api.ts';
import type {
  CourseMaterial,
  StudentEnrollment,
  StudentPortalPayload,
} from '../types.ts';

interface StudentPortalPageProps {
  onNavigate: (path: string) => void;
}

type StudentTab =
  | 'overview'
  | 'materials'
  | 'assignments'
  | 'attendance'
  | 'certificates'
  | 'announcements';

export function StudentPortalPage({ onNavigate }: StudentPortalPageProps) {
  const { firebaseUser, dbUser, loading: authLoading, authError, signInWithGoogle, signOut, getToken } =
    useAuth();

  const [tab, setTab] = useState<StudentTab>('overview');
  const [portal, setPortal] = useState<StudentPortalPayload | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<CourseMaterial | null>(null);
  const [selectedCert, setSelectedCert] = useState<StudentEnrollment | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!firebaseUser || !dbUser) return;
      setLoadingData(true);
      setError(null);
      try {
        const token = await getToken();
        if (!token) return;
        const data = await api.getStudentPortal(token);
        if (active) setPortal(data);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : 'Unable to load student portal.'
          );
        }
      } finally {
        if (active) setLoadingData(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [firebaseUser, dbUser, getToken]);

  const downloadNote = (material: CourseMaterial) => {
    const blob = new Blob(
      [
        `${INSTITUTE_CONFIG.name}\nCourse: ${material.courseTitle}\nType: ${material.materialType}\n\n${material.contentMarkdown}`,
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${material.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="h-64 bg-white border border-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (!firebaseUser || !dbUser) {
    return (
      <div className="bg-[#F8FAFC] min-h-[80vh] py-16 px-4">
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-xl p-8">
          <p className="text-xs font-semibold text-[#1D4ED8]">
            {INSTITUTE_CONFIG.shortName} Portal
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-[#0B1B36]">
            Student Portal Login
          </h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Sign in with your Google account to access enrolled courses, PDF lab
            manuals, assignments, attendance records, exam results, certificates,
            and institute announcements.
          </p>

          {authError && (
            <div
              role="alert"
              className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700"
            >
              {authError}
            </div>
          )}

          <button
            type="button"
            onClick={signInWithGoogle}
            className="mt-6 w-full py-3 px-4 flex items-center justify-center gap-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors"
          >
            Sign In with Google
          </button>

          <div className="mt-6 pt-5 border-t border-slate-200 text-xs text-slate-500 space-y-2">
            <p>
              New applicant?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/enroll')}
                className="font-semibold text-[#1D4ED8] hover:underline"
              >
                Submit Enrollment Form
              </button>
            </p>
            <p>
              Institute staff or administrator?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/admin')}
                className="font-semibold text-[#0B1B36] hover:text-[#1D4ED8] hover:underline"
              >
                Go to Admin Panel →
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const pdfAndGuides =
    portal?.materials.filter((m) => m.materialType !== 'Assignment') ?? [];
  const assignments =
    portal?.materials.filter((m) => m.materialType === 'Assignment') ?? [];
  const certificates =
    portal?.enrolledCourses.filter((c) => Boolean(c.certificateCode)) ?? [];

  return (
    <div className="bg-[#F8FAFC] min-h-[82vh] pb-20">
      {/* Portal Top Header */}
      <div className="bg-[#071429] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-blue-300">
              Student Learning Portal · {dbUser.email}
            </p>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome, {dbUser.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {dbUser.role === 'admin' && (
              <button
                type="button"
                onClick={() => onNavigate('/admin')}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors"
              >
                <Shield className="w-4 h-4" aria-hidden="true" />
                Open Admin Dashboard
              </button>
            )}
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 border border-slate-600 hover:border-slate-400 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Portal Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-xl">
          {[
            { id: 'overview', label: 'Enrolled Courses', icon: BookOpen },
            { id: 'materials', label: 'Course Materials & PDF Notes', icon: FileText },
            { id: 'assignments', label: 'Assignments', icon: CalendarCheck },
            { id: 'attendance', label: 'Attendance & Results', icon: CalendarCheck },
            { id: 'certificates', label: 'Certificates', icon: Award },
            { id: 'announcements', label: 'Announcements', icon: Bell },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id as StudentTab)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  tab === item.id
                    ? 'bg-[#0B1B36] text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B1B36]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {loadingData || !portal ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-44 rounded-xl bg-white border border-slate-200 animate-pulse" />
            <div className="h-44 rounded-xl bg-white border border-slate-200 animate-pulse" />
          </div>
        ) : (
          <div className="mt-8">
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portal.enrolledCourses.map((enr) => (
                    <div
                      key={enr.id}
                      className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                    >
                      <div>
                        <p className="text-xs font-medium text-[#1D4ED8]">
                          {enr.batchName}
                        </p>
                        <h2 className="mt-1 font-display text-xl font-bold text-[#0B1B36]">
                          {enr.courseTitle}
                        </h2>
                        <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
                          <div>
                            <p className="text-slate-500">Attendance</p>
                            <p className="mt-1 font-mono text-base font-bold text-[#0B1B36] tabular-nums">
                              {enr.attendancePercent}%
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500">Score</p>
                            <p className="mt-1 font-mono text-base font-bold text-[#0B1B36] tabular-nums">
                              {enr.assessmentScore}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-500">Status</p>
                            <p className="mt-1 text-sm font-semibold text-[#1D4ED8]">
                              {enr.resultStatus}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setTab('materials')}
                          className="text-xs font-semibold text-[#1D4ED8] hover:underline"
                        >
                          Open Study Materials →
                        </button>
                        {enr.certificateCode && (
                          <button
                            type="button"
                            onClick={() => setSelectedCert(enr)}
                            className="text-xs font-semibold text-[#0B1B36] hover:text-[#1D4ED8]"
                          >
                            View Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Announcements preview */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-display text-lg font-bold text-[#0B1B36]">
                    Recent Campus Announcements
                  </h3>
                  <div className="mt-4 divide-y divide-slate-100">
                    {portal.announcements.slice(0, 3).map((ann) => (
                      <div key={ann.id} className="py-3">
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-[#1D4ED8]">
                            {ann.targetGroup}
                          </span>
                          <span className="tabular-nums">
                            {new Date(ann.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 font-semibold text-sm text-[#0B1B36]">
                          {ann.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                          {ann.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'materials' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pdfAndGuides.map((mat) => (
                  <div
                    key={mat.id}
                    className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-semibold text-[#1D4ED8]">
                          {mat.materialType}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{mat.courseTitle}</span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold text-[#0B1B36]">
                        {mat.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">{mat.description}</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedMaterial(mat)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#0B1B36] hover:bg-[#102A52] rounded-lg"
                      >
                        Read Study Notes
                      </button>
                      <button
                        type="button"
                        onClick={() => downloadNote(mat)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B1B36] border border-slate-300 hover:bg-slate-50 rounded-lg"
                      >
                        <Download className="w-3.5 h-3.5" aria-hidden="true" />
                        Download Notes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'assignments' && (
              <div className="space-y-4">
                {assignments.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-sm text-slate-600">
                    No active assignments posted yet.
                  </div>
                ) : (
                  assignments.map((assign) => (
                    <div
                      key={assign.id}
                      className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="font-semibold text-[#1D4ED8]">
                            {assign.courseTitle}
                          </span>
                          {assign.dueDate && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono tabular-nums">
                                Due {assign.dueDate}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="mt-1 font-display text-lg font-bold text-[#0B1B36]">
                          {assign.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {assign.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedMaterial(assign)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg whitespace-nowrap shrink-0"
                      >
                        View Lab Instructions
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === 'attendance' && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h2 className="font-display text-lg font-bold text-[#0B1B36]">
                    Attendance &amp; Assessment Results
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-6 font-semibold">Course</th>
                        <th className="py-3 px-6 font-semibold">Batch</th>
                        <th className="py-3 px-6 font-semibold text-right">
                          Sessions
                        </th>
                        <th className="py-3 px-6 font-semibold text-right">
                          Attendance
                        </th>
                        <th className="py-3 px-6 font-semibold text-right">
                          Score
                        </th>
                        <th className="py-3 px-6 font-semibold">Result Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {portal.enrolledCourses.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/60">
                          <td className="py-3.5 px-6 font-semibold text-[#0B1B36]">
                            {row.courseTitle}
                          </td>
                          <td className="py-3.5 px-6 text-slate-600">
                            {row.batchName}
                          </td>
                          <td className="py-3.5 px-6 text-right font-mono tabular-nums text-slate-700">
                            {row.sessionsAttended} / {row.totalSessions}
                          </td>
                          <td className="py-3.5 px-6 text-right font-mono tabular-nums font-semibold text-[#0B1B36]">
                            {row.attendancePercent}%
                          </td>
                          <td className="py-3.5 px-6 text-right font-mono tabular-nums text-slate-700">
                            {row.assessmentScore}
                          </td>
                          <td className="py-3.5 px-6 font-medium text-[#1D4ED8]">
                            {row.resultStatus}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'certificates' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.length === 0 ? (
                  <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-10 text-center text-sm text-slate-600">
                    Certificates are issued upon completing final lab practical
                    assessments.
                  </div>
                ) : (
                  certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
                    >
                      <div>
                        <p className="font-mono text-xs text-[#1D4ED8] tabular-nums">
                          Verification ID: {cert.certificateCode}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-bold text-[#0B1B36]">
                          {cert.courseTitle}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          Result: {cert.resultStatus} ({cert.assessmentScore})
                        </p>
                      </div>
                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setSelectedCert(cert)}
                          className="px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg"
                        >
                          Open Printable Certificate
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === 'announcements' && (
              <div className="space-y-4">
                {portal.announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="bg-white border border-slate-200 rounded-xl p-6"
                  >
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-[#1D4ED8]">
                        {ann.targetGroup}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {new Date(ann.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold text-[#0B1B36]">
                      {ann.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {ann.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Material Reader Modal */}
      {selectedMaterial && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#071429]/75 flex items-center justify-center p-4"
          onClick={() => setSelectedMaterial(null)}
        >
          <div
            className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#1D4ED8]">
                  {selectedMaterial.courseTitle} · {selectedMaterial.materialType}
                </p>
                <h3 className="font-display text-lg font-bold text-[#0B1B36]">
                  {selectedMaterial.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMaterial(null)}
                aria-label="Close material"
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto whitespace-pre-wrap font-mono text-xs sm:text-sm text-slate-800 leading-relaxed bg-slate-50">
              {selectedMaterial.contentMarkdown}
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => downloadNote(selectedMaterial)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                Download Study File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Certificate Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#071429]/80 flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white rounded-xl border-2 border-[#0B1B36] max-w-2xl w-full p-8 sm:p-10 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCert(null)}
              aria-label="Close certificate"
              className="absolute top-4 right-4 p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-xs font-semibold tracking-wider text-[#1D4ED8]">
              {INSTITUTE_CONFIG.name} · {INSTITUTE_CONFIG.city}, {INSTITUTE_CONFIG.country}
            </p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-[#0B1B36]">
              Certificate of Technical Completion
            </h2>
            <p className="mt-6 text-sm text-slate-600">This certifies that</p>
            <p className="mt-2 font-display text-2xl font-bold text-[#0B1B36]">
              {dbUser.name}
            </p>
            <p className="mt-4 text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              has successfully completed the practical laboratory coursework and
              technical evaluation in
            </p>
            <p className="mt-2 font-display text-xl font-bold text-[#1D4ED8]">
              {selectedCert.courseTitle}
            </p>

            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <p className="text-slate-400">Standing</p>
                <p className="mt-1 font-semibold text-[#0B1B36]">
                  {selectedCert.resultStatus}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Assessment</p>
                <p className="mt-1 font-mono font-semibold text-[#0B1B36] tabular-nums">
                  {selectedCert.assessmentScore}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Verification ID</p>
                <p className="mt-1 font-mono font-semibold text-[#0B1B36] tabular-nums">
                  {selectedCert.certificateCode}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#0B1B36] hover:bg-[#102A52] rounded-lg"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                Print / Save as PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
