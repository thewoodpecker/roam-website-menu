"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";

type MenuItem = {
  title: string;
  description: string;
  href: string;
};

type MenuColumn = {
  heading: string;
  items: MenuItem[];
};

const productsMenu: MenuColumn[] = [
  {
    heading: "Virtual Office Platform",
    items: [
      { title: "Virtual Office", description: "Company Visualization", href: "/virtual-office" },
      { title: "Drop-In Meetings", description: "Virtual Meeting Rooms", href: "/drop-in-meetings" },
      { title: "Theater", description: "All-Hands Presentations", href: "/theater" },
      { title: "AInbox", description: "Enterprise Messaging", href: "/ainbox" },
      { title: "Lobby", description: "Meeting Scheduler", href: "/lobby" },
      { title: "Magicast", description: "Integrated AI Screen Recorder", href: "/magicast" },
      { title: "Magic Minutes", description: "AI Meeting Summarization", href: "/magic-minutes" },
      { title: "On-It", description: "Your AI Assistant", href: "/on-it" },
      { title: "On-Air", description: "Immersive Events", href: "/on-air" },
      { title: "Mobile", description: "Roam While You Roam", href: "/mobile" },
    ],
  },
];

const resourcesMenu: MenuColumn[] = [
  {
    heading: "Solutions",
    items: [
      { title: "Roam vs Zoom", description: "", href: "/solutions/vszoom" },
      { title: "Roam vs Slack", description: "", href: "/solutions/vsslack" },
      { title: "Roam vs Teams", description: "", href: "/solutions/vsteams" },
      { title: "Roam vs Meet", description: "", href: "/solutions/vsmeet" },
      { title: "Roam vs Discord", description: "", href: "/solutions/vsdiscord" },
      { title: "Roam vs Webex", description: "", href: "/solutions/vswebex" },
    ],
  },
  {
    heading: "Resources",
    items: [
      { title: "Platform Guide", description: "", href: "/virtual-office-platform-guide" },
      { title: "Support", description: "", href: "/support" },
      { title: "Contact Us", description: "", href: "/support/contact-us" },
      { title: "Download", description: "", href: "/download" },
    ],
  },
  {
    heading: "Features",
    items: [
      { title: "Google Calendar Sync", description: "", href: "/features/google-calendar-sync" },
      { title: "Google Meetings", description: "", href: "/features/google-meetings" },
      { title: "Outlook Meetings", description: "", href: "/features/outlook-meetings" },
    ],
  },
];

const companyMenu: MenuColumn[] = [
  {
    heading: "Company",
    items: [
      { title: "Roam Makes Remote Work", description: "", href: "/about-us" },
      { title: "Our Team", description: "", href: "/about-us#team" },
      { title: "Careers", description: "", href: "/careers" },
    ],
  },
  {
    heading: "Legal & Support",
    items: [
      { title: "Support", description: "", href: "/support" },
      { title: "Terms of Use", description: "", href: "/terms" },
      { title: "Privacy Policy", description: "", href: "/privacy" },
    ],
  },
];

type NavItem = {
  label: string;
  href: string;
  menu?: MenuColumn[];
};

const navItems: NavItem[] = [
  { label: "Products", href: "#", menu: productsMenu },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "#", menu: resourcesMenu },
  { label: "Company", href: "#", menu: companyMenu },
];

const existingMembersMenu: MenuColumn[] = [
  {
    heading: "Existing Members",
    items: [
      { title: "Download", description: "", href: "/download" },
      { title: "Sign In", description: "", href: "/sign-in" },
    ],
  },
];

const allMenuItems: NavItem[] = [
  ...navItems,
  { label: "Existing Members", href: "#", menu: existingMembersMenu },
];

function MegaMenu({ columns, align = "left" }: { columns: MenuColumn[]; align?: "left" | "right" }) {
  const isSingleColumn = columns.length === 1;

  if (isSingleColumn) {
    const items = columns[0].items;

    // Small lists: single vertical column (like Existing Members)
    if (items.length <= 4) {
      return (
        <div className={`flex gap-20 px-10 py-8 ${align === "right" ? "justify-end" : ""}`}>
          <div>
            <h3 className="mb-4 text-xs text-white/40">
              {columns[0].heading}
            </h3>
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.title}>
                  <a href={item.href} className="block text-lg font-semibold tracking-[-0.3px] text-white/90 transition-colors hover:text-white">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    // Larger lists: split into 3 columns (Products)
    const colSize = Math.ceil(items.length / 3);
    const col1 = items.slice(0, colSize);
    const col2 = items.slice(colSize, colSize * 2);
    const col3 = items.slice(colSize * 2);

    return (
      <div className="flex gap-20 px-10 py-8">
        {[col1, col2, col3].map((col, i) => (
          <div key={i}>
            {i === 0 && (
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.5px] text-white/40" style={{ fontFamily: "var(--font-possibility), sans-serif" }}>
                {columns[0].heading}
              </h3>
            )}
            {i > 0 && <div className="mb-4 h-[16px]" />}
            <ul className="flex flex-col gap-1">
              {col.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    className="group/link block"
                  >
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-white transition-colors group-hover/link:text-white/70">
                      {item.title}
                      <svg className="inline-block w-2.5 h-2.5 opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-white/50" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item.description && (
                      <span className="block text-xs text-white/40 mt-0.5">{item.description}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-20 px-10 py-8">
      {columns.map((column) => (
        <div key={column.heading}>
          <h3 className="mb-4 text-xs text-white/40">
            {column.heading}
          </h3>
          <ul className="flex flex-col gap-1">
            {column.items.map((item) => (
              <li key={item.title}>
                <a
                  href={item.href}
                  className="block text-lg font-semibold tracking-[-0.3px] text-white/90 transition-colors hover:text-white"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Navbar() {
  // Desktop state
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedMenu, setDisplayedMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);
  const prevMenuRef = useRef<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | "none">("none");

  // Mobile state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActivePanel, setMobileActivePanel] = useState<string | null>(null);

  // Desktop menu logic
  const closeMenu = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      setDisplayedMenu(null);
    }, 250);
  }, []);

  useEffect(() => {
    if (activeMenu) {
      const menuLabels = allMenuItems.filter(n => n.menu).map(n => n.label);
      const prevIndex = prevMenuRef.current ? menuLabels.indexOf(prevMenuRef.current) : -1;
      const nextIndex = menuLabels.indexOf(activeMenu);

      if (prevMenuRef.current && prevMenuRef.current !== activeMenu && prevIndex !== -1) {
        setSlideDirection(nextIndex > prevIndex ? "right" : "left");
      } else {
        setSlideDirection("none");
      }

      prevMenuRef.current = activeMenu;
      setDisplayedMenu(activeMenu);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      prevMenuRef.current = null;
      setSlideDirection("none");
      closeMenu();
    }
  }, [activeMenu, closeMenu]);

  useLayoutEffect(() => {
    if (displayedMenu && menuContentRef.current) {
      const activeEl = menuContentRef.current.querySelector<HTMLElement>(
        `[data-menu="${displayedMenu}"]`
      );
      if (activeEl) {
        setMenuHeight(activeEl.scrollHeight);
      }
    }
  }, [displayedMenu]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile: lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Mobile: close on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setMobileActivePanel(null);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuIsOpen = displayedMenu !== null;

  function handleMouseEnter(label: string, hasMenu: boolean) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hasMenu) {
      setActiveMenu(label);
    } else if (menuIsOpen) {
      // Keep menu open but don't switch
    } else {
      setActiveMenu(null);
    }
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  }

  function handleMenuMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  // Mobile handlers
  function toggleMobileMenu() {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      setTimeout(() => setMobileActivePanel(null), 300);
    } else {
      setMobileMenuOpen(true);
    }
  }

  function openMobilePanel(label: string) {
    setMobileActivePanel(label);
  }

  function closeMobilePanel() {
    setMobileActivePanel(null);
  }

  const activeItem = allMenuItems.find((item) => item.label === displayedMenu);

  return (
    <nav
      ref={navRef}
      className="absolute top-0 left-0 right-0 z-50"
      onMouseLeave={handleMouseLeave}
    >
      {/* ===== Desktop Header ===== */}
      <div className="hidden lg:grid h-[56px] grid-cols-[1fr_auto_1fr] items-stretch pr-1">
        {/* Left nav links */}
        <div className="flex items-stretch overflow-hidden">
          {navItems.map((item) => (
            <button
              key={item.label}
              onMouseEnter={() => handleMouseEnter(item.label, !!item.menu)}
              onClick={() =>
                item.menu
                  ? setActiveMenu(activeMenu === item.label ? null : item.label)
                  : setActiveMenu(null)
              }
              className={`flex items-center gap-1.5 px-5 text-sm font-normal leading-5 tracking-[-0.15px] transition-colors duration-200 ${
                activeMenu === item.label
                  ? "text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              {item.label}
              {item.menu && (
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className={`transition-transform duration-250 ${activeMenu === item.label ? "rotate-180" : ""}`}
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Center logo */}
        <div className="flex items-center justify-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/roam-logo.png`}
            alt="Roam"
            width={109}
            height={32}
            className="object-contain"
            priority
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center justify-end gap-2">
          <button
            onMouseEnter={() => handleMouseEnter("Existing Members", true)}
            onClick={() => setActiveMenu(activeMenu === "Existing Members" ? null : "Existing Members")}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-normal leading-5 tracking-[-0.15px] transition-colors duration-200 ${
              activeMenu === "Existing Members"
                ? "text-white"
                : "text-white/50 hover:text-white"
            }`}
          >
            Existing Members
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              className={`transition-transform duration-200 ${activeMenu === "Existing Members" ? "rotate-180" : ""}`}
            >
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="rounded-lg bg-white/5 px-4 py-2 text-sm font-normal leading-5 tracking-[-0.15px] text-white shadow-[inset_0px_0.5px_0px_0px_rgba(255,255,255,0.1)] transition-colors hover:bg-white/10">
            Book Demo
          </button>
          <button className="rounded-lg bg-white/5 px-4 py-2 text-sm font-normal leading-5 tracking-[-0.15px] text-white shadow-[inset_0px_0.5px_0px_0px_rgba(255,255,255,0.1)] transition-colors hover:bg-white/10">
            Free Trial
          </button>
        </div>
      </div>

      {/* ===== Mobile Header ===== */}
      <div
        className="relative z-10 flex lg:hidden h-[56px] items-center justify-between px-4"
        style={{
          background: mobileMenuOpen ? "#000000" : "transparent",
          transition: mobileMenuOpen
            ? "background-color 400ms cubic-bezier(0.33,1,0.68,1)"
            : "background-color 300ms cubic-bezier(0.32,0,0.67,0)",
        }}
      >
        {/* Logo */}
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/roam-logo.png`}
          alt="Roam"
          width={90}
          height={26}
          className="object-contain"
          priority
        />

        {/* Hamburger / Close button */}
        <button
          onClick={toggleMobileMenu}
          className="relative flex items-center justify-center w-10 h-10"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <div className="relative w-[16px] h-[7px]">
            <span
              className="absolute left-0 right-0 h-[1.5px] rounded-full bg-white transition-all duration-300 ease-out"
              style={
                mobileMenuOpen
                  ? { top: "3px", transform: "rotate(45deg)" }
                  : { top: 0, transform: "rotate(0deg)" }
              }
            />
            <span
              className="absolute left-0 right-0 h-[1.5px] rounded-full bg-white transition-all duration-300 ease-out"
              style={
                mobileMenuOpen
                  ? { top: "3px", transform: "rotate(-45deg)" }
                  : { top: "6px", transform: "rotate(0deg)" }
              }
            />
          </div>
        </button>
      </div>

      {/* ===== Desktop Mega Menu ===== */}
      {displayedMenu && activeItem?.menu && (
        <div className="hidden lg:block">
          {/* Solid black background behind nav + menu */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[-1] transition-all duration-300 ease-out"
            style={{
              opacity: isAnimating ? 1 : 0,
              height: isAnimating && menuHeight ? 56 + 1 + menuHeight : 56,
              background: "#000000",
              transformOrigin: "top",
            }}
          />
          {/* Dark blur scrim over the rest of the page */}
          <div
            className="fixed inset-0 z-[-2] transition-opacity duration-300 ease-out"
            style={{
              opacity: isAnimating ? 1 : 0,
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(20px) brightness(0.4)",
              WebkitBackdropFilter: "blur(20px) brightness(0.4)",
            }}
            onClick={() => setActiveMenu(null)}
            onMouseEnter={() => setActiveMenu(null)}
          />
          {/* Menu content */}
          <div
            ref={menuContentRef}
            onMouseEnter={handleMenuMouseEnter}
            className="relative left-0 right-0 z-50 overflow-hidden transition-[height] duration-300 ease-out"
            style={{
              height: isAnimating && menuHeight ? menuHeight : 0,
            }}
          >
            {allMenuItems.filter(n => n.menu).map((navItem) => {
              const isActive = displayedMenu === navItem.label;
              const menuLabels = allMenuItems.filter(n => n.menu).map(n => n.label);
              const myIndex = menuLabels.indexOf(navItem.label);
              const activeIndex = displayedMenu ? menuLabels.indexOf(displayedMenu) : -1;

              let translateX = "0px";
              if (!isActive && slideDirection !== "none") {
                translateX = myIndex < activeIndex ? "-40px" : "40px";
              } else if (isActive && slideDirection !== "none") {
                translateX = "0px";
              }

              return (
                <div
                  key={navItem.label}
                  data-menu={navItem.label}
                  className="absolute inset-x-0 top-0 transition-all duration-300 ease-out"
                  style={{
                    opacity: isActive && isAnimating ? 1 : 0,
                    transform: `translateX(${isActive ? "0px" : translateX})`,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <MegaMenu columns={navItem.menu!} align={navItem.label === "Existing Members" ? "right" : "left"} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===== Mobile Menu Overlay ===== */}
      <div
        className="fixed inset-x-0 top-[56px] bottom-0 z-[5] overflow-hidden lg:hidden"
        style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{
            opacity: mobileMenuOpen ? 1 : 0,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            transition: mobileMenuOpen
              ? "opacity 400ms cubic-bezier(0.33, 1, 0.68, 1)"
              : "opacity 300ms cubic-bezier(0.32, 0, 0.67, 0)",
          }}
          onClick={toggleMobileMenu}
        />

        {/* Menu panel — slides down from top */}
        <div
          className="relative h-full overflow-hidden"
          style={{
            background: "#000000",
            transform: mobileMenuOpen ? "translateY(0)" : "translateY(-110%)",
            opacity: mobileMenuOpen ? 1 : 0,
            transition: mobileMenuOpen
              ? "transform 400ms cubic-bezier(0.33, 1, 0.68, 1), opacity 400ms cubic-bezier(0.33, 1, 0.68, 1)"
              : "transform 300ms cubic-bezier(0.32, 0, 0.67, 0), opacity 300ms cubic-bezier(0.32, 0, 0.67, 0)",
          }}
        >
          {/* Root panel */}
          <div
            className="absolute inset-0 overflow-y-auto transition-transform duration-300 ease-out"
            style={{
              transform: mobileActivePanel ? "translateX(-100%)" : "translateX(0)",
            }}
          >
            <div className="relative flex flex-col h-full">
              {/* Top gradient fade */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-black to-transparent" />
              {/* Bottom gradient fade — sits above the button */}
              <div className="pointer-events-none absolute inset-x-0 bottom-[calc(env(safe-area-inset-bottom,12px)+68px)] z-10 h-24 bg-gradient-to-t from-black to-transparent" />

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 pt-5 pb-6">
                {/* Products inline */}
                <h3
                  className="animate-silver-swipe bg-[length:500%_100%] bg-no-repeat bg-clip-text pt-2 pb-2 text-[11px] font-bold uppercase tracking-[0.5px] text-transparent"
                  style={{
                    fontFamily: "var(--font-possibility), sans-serif",
                    backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.3) 35%, #e0e0e0 50%, rgba(255,255,255,0.3) 65%, rgba(255,255,255,0.3) 100%)",
                  }}
                >
                  Virtual Office Platform
                </h3>
                <div className="flex flex-col gap-[16px]">
                  {productsMenu[0].items.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={toggleMobileMenu}
                      className="active:opacity-70"
                    >
                      <span className="block text-[15px] font-medium text-white">{item.title}</span>
                      {item.description && (
                        <span className="block text-[12px] text-white/40 mt-0.5">{item.description}</span>
                      )}
                    </a>
                  ))}
                </div>

                <div className="my-[24px] -mx-6 h-px bg-white/10" />

                {/* Nav items + Existing Members */}
                <div className="flex flex-col gap-[16px]">
                  {navItems.filter(item => item.label !== "Products").map((item) =>
                    item.menu ? (
                      <button
                        key={item.label}
                        onClick={() => openMobilePanel(item.label)}
                        className="flex w-full items-center justify-between text-[17px] font-semibold text-white active:opacity-70"
                      >
                        {item.label}
                        <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="shrink-0 ml-4 text-white/30">
                          <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    ) : (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={toggleMobileMenu}
                        className="text-[17px] font-semibold text-white active:opacity-70"
                      >
                        {item.label}
                      </a>
                    )
                  )}

                  <button
                    onClick={() => openMobilePanel("Existing Members")}
                    className="flex w-full items-center justify-between text-[17px] font-semibold text-white/60 active:opacity-70"
                  >
                    Existing Members
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="shrink-0 ml-4 text-white/30">
                      <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

              </div>

              {/* Pinned button at bottom */}
              <div className="shrink-0 relative z-20 px-6 pb-[env(safe-area-inset-bottom,12px)] pt-3">
                <a
                  href="/demo"
                  className="flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-base font-medium leading-6 tracking-[-0.32px] text-[#1a1a1a] active:bg-white/90"
                >
                  Book Demo
                </a>
              </div>
            </div>
          </div>

          {/* Sub-panels */}
          {allMenuItems
            .filter((n) => n.menu)
            .map((navItem) => (
              <div
                key={navItem.label}
                className="absolute inset-0 overflow-y-auto transition-transform duration-300 ease-out"
                style={{
                  transform:
                    mobileActivePanel === navItem.label
                      ? "translateX(0)"
                      : "translateX(100%)",
                }}
              >
                <div className="flex flex-col px-6 py-3 pb-[env(safe-area-inset-bottom,24px)]">
                  {/* Back button */}
                  <button
                    onClick={closeMobilePanel}
                    className="flex items-center gap-2 py-3 text-[15px] font-medium text-white/50 active:opacity-70"
                  >
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" className="text-white/40">
                      <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                  </button>

                  {/* Menu columns stacked vertically */}
                  {navItem.menu!.map((column, colIndex) => (
                    <div key={column.heading} className="py-3">
                      {/* Only show heading if multiple columns or if it differs from the nav item label */}
                      {(navItem.menu!.length > 1 || column.heading !== navItem.label) && (
                        <h3
                          className="pb-2 text-[11px] font-bold uppercase tracking-[0.5px] text-white/35"
                          style={{ fontFamily: "var(--font-possibility), sans-serif" }}
                        >
                          {column.heading}
                        </h3>
                      )}
                      <div className="flex flex-col">
                        {column.items.map((item) => (
                          <a
                            key={item.title}
                            href={item.href}
                            onClick={toggleMobileMenu}
                            className="py-2.5 active:opacity-70"
                          >
                            <span className="block text-[15px] font-medium text-white">
                              {item.title}
                            </span>
                            {item.description && (
                              <span className="block text-[12px] text-white/40 mt-0.5">
                                {item.description}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                      {colIndex < navItem.menu!.length - 1 && (
                        <div className="mt-3 h-px bg-white/10" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </nav>
  );
}
