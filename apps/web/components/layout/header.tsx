import { UserNav } from './user-nav';
import { cn } from '@/lib/utils';

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'flex h-16 items-center border-b bg-background px-4 md:px-6',
        className
      )}
    >
      {/* TODO: Add mobile nav button here */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <UserNav />
      </div>
    </header>
  );
}