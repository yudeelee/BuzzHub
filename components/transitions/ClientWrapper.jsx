"use client";

import { useState, useEffect } from "react";

export default function ClientWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // нічого не показуємо поки сторінка не змонтована
  return <>{children}</>;
}
