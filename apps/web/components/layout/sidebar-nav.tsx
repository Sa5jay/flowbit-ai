'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: keyof typeof Icons;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex space-x-0 space-y-1',
        'flex-col',
        className
      )}
      {...props}
    >
      <span className="px-3 py-2 text-xs font-medium uppercase text-muted-foreground">
        General
      </span>
      {items.map((item) => {
        const Icon = Icons[item.icon] as React.ComponentType<{ className?: string }>;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground transition-colors hover:bg-muted hover:text-primary',
              'justify-start'
            )}
          >
            {Icon ? <Icon className="h-5 w-5" /> : null}
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}