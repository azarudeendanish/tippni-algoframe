"use client";

import React, { useRef, useState } from "react";
import { useTheme } from "next-themes";

interface DustDeleteWrapperProps {
  children: React.ReactNode;
  onFinish: () => void;
  postId: number;
  duration?: number;
  density?: number;
}

export default function DustDeleteWrapper({
  children,
  onFinish,
  postId,
  duration = 1300,
  density = 5,
}: DustDeleteWrapperProps) {
  const { theme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  const triggerDust = () => {
    const el = wrapperRef.current;
    if (!el) return;

    // disable events only inside this wrapper
    el.style.pointerEvents = "none";

    const rect = el.getBoundingClientRect();
    const canvas = document.createElement("canvas");

    canvas.width = rect.width;
    canvas.height = rect.height;

    canvas.style.position = "absolute";
    canvas.style.left = "0";
    canvas.style.top = "0";
    canvas.style.zIndex = "9999";
    canvas.style.pointerEvents = "none";

    el.appendChild(canvas);

    const ctx = canvas.getContext("2d")!;

    // ★★ Telegram-style: white dust in dark mode, black dust in light mode
    const isDark = theme === "dark";
    const dustColor = isDark
      ? "rgba(255,255,255"
      : "rgba(0,0,0"; // ⚡ Correct base string

    const particles: any[] = [];
    const gravity = 0.35;
    const wind = isDark ? 0.22 : 0.12;

    for (let y = 0; y < canvas.height; y += density) {
      for (let x = 0; x < canvas.width; x += density) {
        particles.push({
          x,
          y,
          size: Math.random() * 2 + 1,
          alpha: 1,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.8) * 7,
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        ctx.fillStyle = `${dustColor}, ${p.alpha})`; // ⚡ Fixed: output valid rgba(...)
        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.x += p.vx + wind;
        p.y += p.vy + gravity;
        p.alpha -= 0.02;
      });

      if (particles.some((p) => p.alpha > 0)) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };

    animate();
    setHidden(true);

    setTimeout(() => {
      onFinish();
      el.style.pointerEvents = ""; // restore
    }, duration);
  };

  return (
    <div ref={wrapperRef} className="relative">
      {!hidden && children}

      <button
        id={`dust-trigger-btn-${postId}`}
        onClick={triggerDust}
        style={{ display: "none" }}
      />
    </div>
  );
}
