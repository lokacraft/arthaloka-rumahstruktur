"use client";

import React from "react";

export default function FontShowcase() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Font Showcase</h1>

      <div className="space-y-2">
        <p className="font-sans text-lg">Default Tailwind font-sans</p>
        <p className="font-mono text-lg">Default Tailwind font-mono</p>
      </div>

      <div className="space-y-2">
        <p className="font-clash font-normal text-lg">
          Clash Grotesk (400) → The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-clash font-bold text-lg">
          Clash Grotesk (700) → The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-geist text-lg">
          Geist Sans → The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-geistMono text-lg">
          Geist Mono → The quick brown fox jumps over the lazy dog
        </p>
        <p className="font-instrument text-lg">
          Instrument Sans → The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
  );
}
