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

  if (!call || !interview) return null;

  const isThisUserTheMeetingOwner =
    localParticipant?.userId === call.state.createdBy?.id;

  if (!isThisUserTheMeetingOwner) return null;

  const endCall = async () => {
    try {
      await call.endCall();

      await updateInterviewStatus({
        id: interview._id,
        status: 'completed'
      });

      router.push('/');
      toast.success('Meeting ended for everyone');
    } catch (error) {
      console.error(error);
      toast.error('Failed to end the meeting');
    }
  };

  return (
    <Button variant={'destructive'} onClick={endCall}>
      End Meeting
    </Button>
  );
};

export default EndCallButton;
