import { Button } from '@/components/ui/button';
import { SignInButton, SignOutButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className='m-10'>
      <SignInButton>
        <Button>Login</Button>
      </SignInButton>
      <div className='m-2'></div>
      <SignOutButton>
        <Button>Logout</Button>
      </SignOutButton>
    </div>
  );
}
