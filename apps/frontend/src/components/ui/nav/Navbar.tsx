import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavItemProps {
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ label, href, active }: NavItemProps) => (
  <Link 
    href={href} 
    className={cn(
      'relative py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:text-white',
      active ? 'text-white' : 'text-neutral-500'
    )}
  >
    {label}
    {active && (
      <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-white" />
    )}
  </Link>
);

export const Navbar = () => {
  const navItems = [
    { label: 'Portfolio', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Studio', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 transition-all duration-500 backdrop-blur-sm bg-black/5 border-b border-neutral-800/30">
      <Link href="/" className="group flex items-center gap-2">
        <div className="h-6 w-6 bg-white" />
        <span className="text-sm font-medium uppercase tracking-[0.3em] text-white group-hover:opacity-80 transition-opacity">
          HexaStudio
        </span>
      </Link>
      
      <div className="hidden md:flex items-center gap-12">
        {navItems.map((item, idx) => (
          <NavItem 
            key={idx} 
            {...item} 
            active={item.href === '/'} // Simplified active state
          />
        ))}
      </div>

      <div className="md:hidden">
        <button className="text-white text-xs uppercase tracking-widest">Menu</button>
      </div>
    </nav>
  );
};
