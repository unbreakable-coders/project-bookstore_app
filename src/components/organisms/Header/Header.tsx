import { useState } from "react";
import { Logo } from "../../atoms/Logo";
import { Icon } from "../../atoms/Icon";
import type { IconName } from "../../atoms/Icon";
import { Input } from "../../atoms/Input";
import { Dropdown } from "../../atoms/Dropdown";

const navItems = ["Home", "Paper", "Kindle", "Audiobook"];

type MobileIcon = Extract<IconName, "heart" | "cart" | "user">;

export const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobileIcon, setActiveMobileIcon] =
    useState<MobileIcon>("heart");

  const toggleMobile = () => setIsMobileOpen(prev => !prev);
  const closeMobile = () => setIsMobileOpen(false);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* TOP BAR (logo + nav + right block) */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* LEFT: logo + nav */}
          <div className="flex items-center gap-8">
            <Logo className="h-7 w-auto" />

            {/* Desktop/tablet nav */}
            <nav className="hidden md:flex items-center gap-6 text-[11px] font-semibold uppercase tracking-[0.18em]">
              {navItems.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={`relative pb-1 transition-colors ${
                    index === 0
                      ? "text-[#050505]"
                      : "text-[#9F9F9F] hover:text-[#050505]"
                  }`}
                >
                  {item}
                  {index === 0 && (
                    <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#050505]" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* RIGHT: search/categories (lg+) + icons + burger */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search + Categories (only lg+) */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="w-[289px]">
                <Input
                  withSearchIcon
                  placeholder="Find a book or author"
                />
              </div>

              <Dropdown label="Categories" />
            </div>

            {/* Tablet icons (md–lg): search + heart + cart + user */}
            <div className="hidden md:flex lg:hidden items-center gap-2">
              {["search", "heart", "cart", "user"].map(name => (
                <button
                  key={name}
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DADADA] bg-white hover:border-[#C5C5C5]"
                >
                  <Icon name={name as IconName} className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Desktop icons (lg+): heart + cart + user */}
            <div className="hidden lg:flex items-center gap-2">
              {["heart", "cart", "user"].map(name => (
                <button
                  key={name}
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DADADA] bg-white hover:border-[#C5C5C5]"
                >
                  <Icon name={name as IconName} className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Burger (mobile only) */}
            <button
              type="button"
              onClick={toggleMobile}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#DADADA] bg-white md:hidden"
              aria-label="Toggle navigation"
            >
              <Icon
                name={isMobileOpen ? "close" : "menu"}
                className="h-4 w-4"
              />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY MENU (320–639) */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white border-t">
          <div className="flex h-full flex-col">
            {/* scrollable content: nav + search + categories */}
            <div className="flex-1 overflow-auto px-4 pt-6 pb-4">
              <nav className="space-y-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9F9F9F]">
                {navItems.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    className={`block w-full text-left ${
                      index === 0
                        ? "text-[#050505]"
                        : "hover:text-[#050505]"
                    }`}
                    onClick={closeMobile}
                  >
                    {item}
                    {index === 0 && (
                      <span className="mt-1 block h-[2px] w-10 bg-[#050505]" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Search field */}
              <div className="mt-6">
                <Input
                  withSearchIcon
                  placeholder="Find a book or author"
                />
              </div>

              {/* Categories dropdown (full width) */}
              <div className="mt-3">
                <Dropdown label="Categories" fullWidth />
              </div>
            </div>

            {/* bottom icon bar (heart + cart + user) */}
            <div className="border-t">
              <div className="grid grid-cols-3">
                {(["heart", "cart", "user"] as MobileIcon[]).map(name => {
                  const isActive = activeMobileIcon === name;

                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setActiveMobileIcon(name)}
                      className="flex h-14 flex-col items-center justify-center"
                    >
                      <Icon name={name} className="h-5 w-5" />
                      <span
                        className={`mt-2 h-[2px] w-12 ${
                          isActive ? "bg-[#050505]" : "bg-transparent"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
