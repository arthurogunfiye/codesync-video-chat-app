import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks
} from '@stream-io/video-react-sdk';
import {
  CheckCircle2,
  LayoutListIcon,
  LoaderIcon,
  UsersIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from './ui/resizable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import EndCallButton from './EndCallButton';
import CodeEditor from './CodeEditor';

function MeetingRoom() {
  const router = useRouter();
  const [hasEnded, setHasEnded] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'speaker'>('speaker');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      setHasEnded(true);
    }
  }, [callingState, router]);

  // UI for the Summary Screen
  if (hasEnded) {
    return (
      <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-6 text-center'>
        <div className='bg-green-100 p-4 rounded-full'>
          <CheckCircle2 className='size-12 text-green-600' />
        </div>
        <div>
          <h1 className='text-3xl font-bold'>Interview Completed</h1>
          <p className='text-muted-foreground mt-2'>
            The meeting has been ended by the interviewer.
          </p>
        </div>
        <div className='flex gap-4'>
          <Button variant='default' onClick={() => router.push('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (callingState !== CallingState.JOINED) {
    return (
      <div className='h-96 flex items-center justify-center'>
        <LoaderIcon className='size-6 animate-spin' />
      </div>
    );
  }

  return (
    <div className='h-[calc(100vh-4rem-1px)]'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel
          defaultSize={35}
          minSize={25}
          maxSize={100}
          className='relative'
        >
          {/* VIDEO LAYOUT */}
          <div className='absolute inset-0'>
            {layout === 'grid' ? <PaginatedGridLayout /> : <SpeakerLayout />}

            {/* PARTICIPANTS LIST OVERLAY */}
            {showParticipants && (
              <div className='absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                <CallParticipantsList
                  onClose={() => setShowParticipants(false)}
                />
              </div>
            )}
          </div>

          {/* VIDEO CONTROLS */}

          <div className='absolute bottom-4 left-0 right-0'>
            <div className='flex flex-col items-center gap-4'>
              <div className='flex items-center gap-2 flex-wrap justify-center px-4'>
                <CallControls onLeave={() => router.push('/')} />

                <div className='flex items-center gap-2'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='outline' size='icon' className='size-10'>
                        <LayoutListIcon className='size-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setLayout('grid')}>
                        Grid View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLayout('speaker')}>
                        Speaker View
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    variant='outline'
                    size='icon'
                    className='size-10'
                    onClick={() => setShowParticipants(!showParticipants)}
                  >
                    <UsersIcon className='size-4' />
                  </Button>
                  <EndCallButton />
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={65} minSize={25}>
          <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
export default MeetingRoom;
