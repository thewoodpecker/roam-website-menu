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
    heading: "Products",
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

function MegaMenu({ columns }: { columns: MenuColumn[] }) {
  const isSingleColumn = columns.length === 1;

  if (isSingleColumn) {
    const items = columns[0].items;
    return (
      <div className="flex gap-20 px-10 py-8">
        <div>
          <h3 className="mb-4 text-xs text-white/40">
            {columns[0].heading}
          </h3>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.title}>
                <a
                  href={item.href}
                  className="group/link inline-flex items-center gap-1 text-2xl font-semibold tracking-[-0.5px] text-white/90 transition-colors hover:text-white"
                >
                  {item.title}
                  <svg className="inline-block w-3 h-3 opacity-0 -translate-x-1 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-white/50" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs text-white/40">
            Use Cases
          </h3>
          <ul className="flex flex-col gap-2">
            {["Remote Teams", "Hybrid Work", "All-Hands", "Onboarding", "Collaboration"].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm font-normal text-white/60 transition-colors hover:text-white">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs text-white/40">
            Resources
          </h3>
          <ul className="flex flex-col gap-2">
            {["What's New", "Product Updates", "Integrations", "Compare Plans", "Watch Demo"].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm font-normal text-white/60 transition-colors hover:text-white">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
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
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedMenu, setDisplayedMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState(0);
  const prevMenuRef = useRef<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | "none">("none");

  const closeMenu = useCallback(() => {
    setIsAnimating(false);
    // Wait for the exit animation to finish before removing from DOM
    setTimeout(() => {
      setDisplayedMenu(null);
    }, 250);
  }, []);

  useEffect(() => {
    if (activeMenu) {
      // Determine slide direction based on nav item order
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
      // Trigger enter animation on next frame
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

  const menuIsOpen = displayedMenu !== null;

  function handleMouseEnter(label: string, hasMenu: boolean) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (hasMenu) {
      setActiveMenu(label);
    } else if (menuIsOpen) {
      // Keep menu open but don't switch — just keep current
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

  const activeItem = allMenuItems.find((item) => item.label === displayedMenu);

  return (
    <nav
      ref={navRef}
      className="absolute top-0 left-0 right-0 z-50"
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid h-[56px] grid-cols-[1fr_auto_1fr] items-stretch pr-1">
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
            src="/images/roam-logo.png"
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


      {/* Mega menu backdrop + dropdown with Stripe-style animation */}
      {displayedMenu && activeItem?.menu && (
        <>
          {/* Solid black background behind nav + menu */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-[-1] transition-all duration-300 ease-out"
            style={{
              opacity: isAnimating ? 1 : 0,
              height: isAnimating && menuHeight ? 56 + 1 + menuHeight : 56,
              background: "#131415",
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
                // Inactive panels slide out in the opposite direction
                translateX = myIndex < activeIndex ? "-40px" : "40px";
              } else if (isActive && slideDirection !== "none") {
                // Active panel is already at 0 (arrived)
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
                  <MegaMenu columns={navItem.menu!} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </nav>
  );
}
