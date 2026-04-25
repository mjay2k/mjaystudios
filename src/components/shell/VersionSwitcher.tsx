'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useAppStore } from '@/stores/useAppStore';
import type { SiteVersion } from '@/stores/useAppStore';

const mainVersion = { id: 'classic' as SiteVersion, label: 'Timeline', tag: 'v1' };

const experimentalVersions: { id: SiteVersion; label: string; tag: string }[] = [
  { id: 'cinematic', label: 'Cinematic Vault', tag: 'exp' },
  { id: 'glitch', label: 'Dimensional Glitch', tag: 'x1' },
  { id: 'magnetic', label: 'Magnetic', tag: 'x2' },
];

const allVersions = [mainVersion, ...experimentalVersions];

export default function VersionSwitcher() {
  const siteVersion = useAppStore((s) => s.siteVersion);
  const setSiteVersion = useAppStore((s) => s.setSiteVersion);
  const theme = useAppStore((s) => s.theme);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === 'dark';

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Animate menu
  useEffect(() => {
    if (!menuRef.current) return;
    if (open) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -8, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power3.out' }
      );
    }
  }, [open]);

  const current = allVersions.find((v) => v.id === siteVersion)!;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all duration-200"
        style={{
          background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
          color: isDark ? '#a3a3a3' : '#737373',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#F15A29';
          e.currentTarget.style.color = '#F15A29';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
          e.currentTarget.style.color = isDark ? '#a3a3a3' : '#737373';
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        {current.tag}
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-2 w-64 rounded-xl overflow-hidden shadow-2xl"
          style={{
            background: isDark ? '#1a1a1a' : '#ffffff',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            zIndex: 100,
          }}
        >
          {/* ── Main version ── */}
          <div
            className="px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em]"
            style={{ color: isDark ? '#555' : '#aaa', borderBottom: `1px solid ${isDark ? '#262626' : '#f0f0f0'}` }}
          >
            Portfolio
          </div>
          <VersionButton
            version={mainVersion}
            isActive={siteVersion === mainVersion.id}
            isDark={isDark}
            onClick={() => { setSiteVersion(mainVersion.id); setOpen(false); }}
          />

          {/* ── Experimental section ── */}
          <div
            className="px-3 pt-3 pb-2 text-[9px] font-bold uppercase tracking-[0.2em]"
            style={{ color: isDark ? '#555' : '#aaa', borderTop: `1px solid ${isDark ? '#262626' : '#f0f0f0'}` }}
          >
            Experimental
          </div>
          <p
            className="px-4 pb-2 text-[10px] leading-relaxed"
            style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.35)' }}
          >
            Just for fun — not all features work in these views.
          </p>
          {experimentalVersions.map((v) => (
            <VersionButton
              key={v.id}
              version={v}
              isActive={v.id === siteVersion}
              isDark={isDark}
              onClick={() => { setSiteVersion(v.id); setOpen(false); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function VersionButton({
  version,
  isActive,
  isDark,
  onClick,
}: {
  version: { id: SiteVersion; label: string; tag: string };
  isActive: boolean;
  isDark: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors duration-150"
      style={{
        background: isActive
          ? isDark ? 'rgba(241,90,41,0.1)' : 'rgba(241,90,41,0.06)'
          : 'transparent',
        color: isActive ? '#F15A29' : isDark ? '#d4d4d4' : '#404040',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.background = 'transparent';
      }}
    >
      <div className="text-xs font-bold font-display">{version.label}</div>
      <div className="flex items-center gap-2">
        <span
          className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase"
          style={{
            background: version.id === 'classic'
              ? isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
              : version.id === 'glitch'
                ? 'rgba(0,255,136,0.15)'
                : 'rgba(241,90,41,0.15)',
            color: version.id === 'classic'
              ? isDark ? '#888' : '#999'
              : version.id === 'glitch'
                ? '#00ff88'
                : '#F15A29',
          }}
        >
          {version.tag}
        </span>
        {isActive && (
          <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#F15A29' }} />
        )}
      </div>
    </button>
  );
}
