import { useEffect, useRef, useState, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Icon } from '@/components/atoms/Icon';
import { GlobalLanguageSwitcher } from '@/components/molecules/GlobalLanguageSwitcher';
import { ThemeSwitcher } from '@/components/molecules/ThemeSwitcher';
import { useAuth } from '@/hooks/useAuth';

interface HeaderActionsDropdownProps {
  isLoggedIn: boolean;
  variant?: 'desktop' | 'mobile';
}

export const HeaderActionsDropdown: FC<HeaderActionsDropdownProps> = ({
  isLoggedIn,
  variant = 'desktop',
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) {
        return;
      }

      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }

    setOpen(false);
  };

  const handleDevPreviewClick = () => {
    navigate('/dev-preview');
    setOpen(false);
  };

  const rootClass =
    variant === 'mobile'
      ? 'relative flex h-14 flex-col items-center justify-center'
      : 'relative';

  const trigger =
    variant === 'mobile'
      ? (
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="flex h-14 flex-col items-center justify-center"
          aria-label="Open actions menu"
        >
          <span className="text-2xl">⋮</span>
          <span className="mt-2 h-0.5 w-12 bg-transparent" />
        </button>
      )
      : isLoggedIn ? (
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DADADA] bg-card text-sm leading-none hover:border-[#C5C5C5] cursor-pointer transition-colors overflow-hidden"
          aria-label="Open user menu"
        >
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="User avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>
              {(user?.user_metadata?.full_name ||
                user?.email ||
                'U')[0].toUpperCase()}
            </span>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(prev => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DADADA] bg-card text-xl leading-none hover:border-[#C5C5C5] cursor-pointer transition-colors"
          aria-label="Open actions menu"
        >
          ⋮
        </button>
      );

  const menuPositionClasses =
    variant === 'mobile'
      ? 'absolute bottom-full mb-2 translate-x-[10%]'
      : 'absolute right-0 top-full mt-1 translate-x-[20%]';

  return (
    <div className={rootClass} ref={wrapperRef}>
      {trigger}

      {open && (
        <div
          className={`${menuPositionClasses} rounded-xl border border-[#E2E2E2] bg-card shadow-lg z-40 p-2 flex flex-col gap-2`}
        >
          <button
            type="button"
            onClick={handleProfileClick}
            className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-md hover:bg-[#f7f4ef]"
            aria-label="Open profile or login"
          >
            <Icon name="user" className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleDevPreviewClick}
            className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-md hover:bg-[#f7f4ef]"
            aria-label="Open dev preview"
          >
            <span className="text-lg">⚙️</span>
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-[#f7f4ef]">
            <GlobalLanguageSwitcher />
          </div>

          <div className="flex h-9 w-9 items-center cursor-pointer justify-center rounded-md hover:bg-[#f7f4ef]">
            <ThemeSwitcher />
          </div>
        </div>
      )}
    </div>
  );
};
