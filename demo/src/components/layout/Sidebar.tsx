'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Shield,
  CreditCard,
  PieChart,
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: TrendingUp },
  { name: 'Clients', href: '/dashboard/clients', icon: Users },
  { name: 'Trusts', href: '/dashboard/trusts', icon: Shield },
  { name: 'Transactions', href: '/dashboard/transactions', icon: CreditCard },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Analytics', href: '/dashboard/analytics', icon: PieChart },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded-md shadow-md border border-gray-200"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

       {/* Sidebar // #f68e36 #271e76 */}
       <div
         className={cn(
           'fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0',
           isOpen ? 'translate-x-0' : '-translate-x-full'
         )}
         style={{ backgroundColor: '#271e76' }}
       >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
                <Image 
                  src="/images/logo.webp" 
                  alt="TrustCo Logo" 
                  width={36} 
                  height={36}
                />
                <span className="text-xl font-bold text-gray-900" style={{ color: '#271e76' }}>Endeavor Trust</span> 
            </div>
          </div>

          {/* User info */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-300 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                   className={cn(
                     'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                     isActive
                       ? 'shadow-sm'
                       : 'text-white hover:bg-gray-700 hover:text-white'
                   )}
                   style={isActive ? { backgroundColor: '#f68e36', color: 'white' } : {}}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-white hover:bg-gray-700 hover:text-white w-full transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
