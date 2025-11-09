import Link from 'next/link';
import { SidebarNav } from './sidebar-nav';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-full w-60 flex-col border-r', className)}>
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">Buchhaltung</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarNav
          className="px-4 py-6"
          items={[
            { title: 'Dashboard', href: '/dashboard', icon: 'Home' },
            { title: 'Invoice', href: '/invoice', icon: 'FileText' },
            { title: 'Other Files', href: '/files', icon: 'FolderOpen' },
            { title: 'Departments', href: '/departments', icon: 'Users' },
            { title: 'Users', href: '/users', icon: 'Users' },
            { title: 'Settings', href: '/settings', icon: 'Settings' },
          ]}
        />
      </div>
      <div className="mt-auto border-t p-4">
        <Link
          href="/chat"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
        >
          <Bot className="h-5 w-5" />
          Flowbit AI
        </Link>
      </div>
    </div>
  );
}