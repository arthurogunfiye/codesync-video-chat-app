'use client';

import InterviewScheduleUI from './InterviewScheduleUI';
import LoaderUI from '@/components/LoaderUI';
import { useUserRole } from '@/hooks/useUserRole';
import { useRouter } from 'next/navigation';

const SchedulePage = () => {
  const router = useRouter();
  const { isInterviewer, isCandidate, isLoading } = useUserRole();

  if (isLoading) return <LoaderUI />;

  if (!isInterviewer) return router.push('/');

  return <InterviewScheduleUI />;
};

export default SchedulePage;
