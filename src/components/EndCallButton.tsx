import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useMutation, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import { api } from '../../convex/_generated/api';
import { Button } from './ui/button';
import toast from 'react-hot-toast';

const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const updateInterviewStatus = useMutation(
    api.interviews.updateInterviewStatus
  );

  const interview = useQuery(api.interviews.getInterviewByStreamCallId, {
    streamCallId: call?.id || ''
  });

  const isMeetingOwner =
    localParticipant?.userId === call?.state?.createdBy?.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    try {
      // 1. Always end the Stream call for everyone
      await call?.endCall();

      // 2. ONLY update Convex if this was a scheduled interview
      if (interview) {
        await updateInterviewStatus({
          id: interview._id,
          status: 'completed'
        });
      }

      router.push('/');
      toast.success('Meeting ended');
    } catch (error) {
      console.error(error);
      toast.error('Failed to end the meeting');
    }
  };

  return (
    <Button
      variant='destructive'
      onClick={endCall}
      // Note: We no longer disable the button while loading
      // because on-the-fly calls will never finish loading an interview.
    >
      End Meeting
    </Button>
  );
};

export default EndCallButton;
