import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Import all the icons you need from lucide-react here
import { 
  Zap, 
  LogOut, 
  X, 
  LayoutDashboard, 
  Briefcase, 
  UserCheck, 
  MessageSquare, 
  FolderOpen, 
  Settings 
} from 'lucide-react';

// Fixed iconMap: No 'require' needed, just use the imported components
const iconMap = {
  LayoutDashboard: LayoutDashboard,
  Briefcase: Briefcase,
  UserCheck: UserCheck,
  MessageSquare: MessageSquare,
  FolderOpen: FolderOpen,
  Settings: Settings,
};

const Sidebar = ({ 
  navItems = [], // Default to empty array to prevent map errors
  user = { name: "User", campus: "Campus" }, 
  onLogout, 
  mobileMenuOpen, 
  onMobileMenuClose 
}) => {
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/5">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-lg font-extrabold text-white tracking-tight">
            Gig<span className="text-purple-500">Campus</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const IconComponent = iconMap[item.icon];

          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onMobileMenuClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl 
                transition-all duration-200 group
                ${isActive
                  ? 'bg-purple-600/10 text-purple-500 border border-purple-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {IconComponent && (
                <IconComponent 
                  size={18} 
                  className={
                    isActive 
                      ? 'text-purple-500' 
                      : 'text-white/30 group-hover:text-white/70'
                  } 
                />
              )}
              <span className="text-sm font-semibold">{item.name}</span>
              
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-3">
          <div className="w-9 h-9 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0">
            <span className="text-purple-500 text-xs font-extrabold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-medium text-white/40">{user.campus}</span>
              {user.verified && (
                <span className="text-[9px] font-extrabold bg-purple-600/10 text-purple-500 px-1.5 py-0.5 rounded">
                  VERIFIED
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium transition-colors w-full px-3 py-2 rounded-xl hover:bg-white/5"
        >
          <LogOut size={15} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-64 bg-[#0a0a0a] border-r border-white/5 flex-col fixed h-full z-20">
        <SidebarContent />
      </aside>

      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={onMobileMenuClose} />
          <aside className="fixed top-0 left-0 h-full w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-50 md:hidden">
            <button onClick={onMobileMenuClose} className="absolute top-5 right-5 text-white/50 hover:text-white">
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;