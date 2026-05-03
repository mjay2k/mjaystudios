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
  { id: 'snellenberg', label: 'Studio Noir', tag: 'x3' },
];

const allVersions = [mainVersion, ...experimentalVersions];

interface VersionSwitcherProps {
  mobileInline?: boolean;
  dark?: boolean;
  onSelect?: () => void;
}

export default function VersionSwitcher({ mobileInline = false, dark, onSelect }: VersionSwitcherProps = {}) {
  const siteVersion = useAppStore((s) => s.siteVersion);
  const setSiteVersion = useAppStore((s) => s.setSiteVersion);
  const theme = useAppStore((s) => s.theme);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === 'dark';

  // Close on outside click — popover mode only
  useEffect(() => {
    if (!open || mobileInline) return;
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
  }, [open, mobileInline]);

  // Animate menu — popover mode only
  useEffect(() => {
    if (!menuRef.current || mobileInline) return;
    if (open) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -8, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power3.out' }
      );
    }
  }, [open, mobileInline]);

  const current = allVersions.find((v) => v.id === siteVersion)!;

  const handlePick = (id: SiteVersion) => {
    if (id !== siteVersion && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
    setSiteVersion(id);
    setOpen(false);
    onSelect?.();
  };

  if (mobileInline) {
    const inlineDark = dark ?? isDark;
    const triggerBg = open
      ? inlineDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
      : 'transparent';
    const triggerBorder = open
      ? inlineDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'
      : inlineDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
    const labelColor = inlineDark ? 'rgba(255,255,255,0.5)' : '#737373';
    const valueColor = inlineDark ? '#ffffff' : '#262626';
    const iconColor = inlineDark ? 'rgba(255,255,255,0.5)' : '#525252';
    const chevronColor = inlineDark ? 'rgba(255,255,255,0.5)' : '#737373';
    const listBg = inlineDark ? '#1a1a1a' : '#ffffff';
    const listBorder = inlineDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';
    const sectionDivider = inlineDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0';
    const sectionLabel = inlineDark ? 'rgba(255,255,255,0.35)' : '#a3a3a3';
    const helperText = inlineDark ? 'rgba(255,255,255,0.35)' : '#a3a3a3';

    return (
      <div className="w-full">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-colors"
          style={{
            background: triggerBg,
            border: `1px solid ${triggerBorder}`,
          }}
          aria-expanded={open}
        >
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: iconColor }}>
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: labelColor }}>Theme</span>
            <span className="text-sm font-bold font-display" style={{ color: valueColor }}>{current.label}</span>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{
              color: chevronColor,
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {open && (
          <div
            className="mt-2 overflow-hidden rounded-xl"
            style={{ background: listBg, border: `1px solid ${listBorder}` }}
          >
            <div
              className="px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ color: sectionLabel, borderBottom: `1px solid ${sectionDivider}` }}
            >
              Portfolio
            </div>
            <VersionButton
              version={mainVersion}
              isActive={siteVersion === mainVersion.id}
              isDark={inlineDark}
              onClick={() => handlePick(mainVersion.id)}
            />
            <div
              className="px-3 pt-3 pb-2 text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ color: sectionLabel, borderTop: `1px solid ${sectionDivider}` }}
            >
              Experimental
            </div>
            <p className="px-4 pb-2 text-[10px] leading-relaxed" style={{ color: helperText }}>
              Just for fun — not all features work in these views.
            </p>
            {experimentalVersions.map((v) => (
              <VersionButton
                key={v.id}
                version={v}
                isActive={v.id === siteVersion}
                isDark={inlineDark}
                onClick={() => handlePick(v.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

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
            onClick={() => handlePick(mainVersion.id)}
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
              onClick={() => handlePick(v.id)}
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
