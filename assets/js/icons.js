// Small inline SVG icon set. Keeping icons as plain strings avoids an
// icon-font dependency and keeps the whole site self-contained / offline-friendly.
const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A5 5 0 0 1 16 8Z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  twitter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 9.4-9.5 16.2-17 10.9 2.4.1 4.8-.6 6.6-2C6 15.8 3.9 13.6 3 10.6c.9.2 1.8.1 2.6-.1C2.9 9.7 1.1 7.2 1 4.4c.9.5 1.9.8 3 .8C1.7 3.4 1 .9 2.2-1c2.9 3.5 7 5.7 11.6 5.9-.9-3.9 3.4-6.7 6.6-4.4 1 0 2.4-.7 3-1.3-.3 1.2-1.1 2.2-2.1 2.8 1-.1 1.9-.4 2.7-.8-.6 1-1.4 1.9-2.4 2.6-.1.1 0 .2 0 .2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>',
  arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
  android: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 16v-4a7 7 0 0 1 14 0v4"/><path d="M5 16h14v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2Z"/><path d="M9 3 8 5"/><path d="m15 3 1 2"/><path d="M9 20v2"/><path d="M15 20v2"/></svg>',
  windows: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5.5 10.5 4.4V11H3V5.5Z"/><path d="M11.5 4.3 21 3v8H11.5V4.3Z"/><path d="M3 12h7.5v6.6L3 17.5V12Z"/><path d="M11.5 12H21v9l-9.5-1.3V12Z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/></svg>',
  headset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="20" height="9" rx="3"/><circle cx="7.5" cy="12.5" r="1.5"/><circle cx="16.5" cy="12.5" r="1.5"/></svg>',
  gamepad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="17" cy="10.5" r="1"/><circle cx="15" cy="13.5" r="1"/><path d="M17.3 7H6.7A4.7 4.7 0 0 0 2 11.7v.6a4.7 4.7 0 0 0 8.9 2.1l.4-.8a1.9 1.9 0 0 1 3.4 0l.4.8A4.7 4.7 0 0 0 24 12.3v-.6A4.7 4.7 0 0 0 17.3 7Z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 6-6 6 6 6"/><path d="m16 6 6 6-6 6"/></svg>'
};

// Platform metadata: label, icon key, and the CSS class used for chip coloring.
const PLATFORM_META = {
  android: { label: "Android", icon: "android", cls: "android" },
  web:     { label: "Web",     icon: "globe",   cls: "web" },
  windows: { label: "Windows", icon: "windows", cls: "windows" },
  game:    { label: "Game",    icon: "gamepad", cls: "game" },
  meta:    { label: "Meta / XR", icon: "headset", cls: "meta" }
};

// Link keys -> display label + icon, used on both cards and detail sidebar.
const LINK_META = {
  androidStore:   { label: "Get it on Google Play", icon: "android" },
  windowsDownload:{ label: "Download for Windows",  icon: "windows" },
  windowsPortable:{ label: "Portable build (.zip)", icon: "download" },
  webApp:         { label: "Open web app",          icon: "globe" },
  metaStore:      { label: "Get it on Meta Quest",  icon: "headset" },
  sourceCode:     { label: "Source code",           icon: "github" },
  privacyPolicy:  { label: "Privacy policy",        icon: "shield" }
};
