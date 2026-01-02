import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoiningMeeting: boolean;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  isJoiningMeeting
}: MeetingModalProps) => {
  const [meetingUrl, setMeetingUrl] = useState('');

  const createMeeting = () => {};
  const joinMeeting = () => {};

  const handleStart = () => {};

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className='hidden'>
          Dialog to start or join a meeting
        </DialogDescription>
        <div className='space-y-4 pt-4'>
          {isJoiningMeeting && (
            <Input
              placeholder='Paste meeting link here...'
              value={meetingUrl}
              onChange={event => setMeetingUrl(event.target.value)}
            />
          )}
          <div className='flex justify-end gap-3'>
            <Button variant='outline' onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={isJoiningMeeting && !meetingUrl.trim()}
            >
              {isJoiningMeeting ? 'Join Meeting' : 'Start Meeting'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
