"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface TubelightNavProps {
  items: NavItem[];
  className?: string;
}

export function TubelightNav({ items, className }: TubelightNavProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(items[0].name);

  // Sync active tab with current route
  useEffect(() => {
    const current = items.find(
      (item) => pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url))
    );
    if (current) setActiveTab(current.name);
  }, [pathname, items]);

  return (
    <nav className={cn("hidden md:flex items-center gap-1", className)}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.name;
        return (
          <Link
            key={item.name}
            href={item.url}
            onClick={() => setActiveTab(item.name)}
            className={cn(
              "relative cursor-pointer px-5 py-2 rounded-full transition-colors duration-200",
              "text-[15px] tracking-wide",
              isActive
                ? "text-warm-white font-[500]"
                : "text-warm-white/45 font-[400] hover:text-warm-white/80"
            )}
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {/* Text label */}
            <span className="relative z-10">{item.name}</span>

            {/* Sliding background pill */}
            {isActive && (
              <motion.div
                layoutId="tubelight-lamp"
                className="absolute inset-0 rounded-full -z-10"
                style={{
                  background: "rgba(var(--crimson-rgb),0.08)",
                  border: "1px solid rgba(var(--crimson-rgb),0.15)",
                }}
                initial={false}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              >
                {/* The "tube" glow above */}
                <div
                  className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-10 h-[3px] rounded-t-full"
                  style={{ background: "rgb(var(--crimson-rgb))" }}
                >
                  <div
                    className="absolute w-14 h-5 rounded-full blur-md -top-1 -left-2"
                    style={{ background: "rgba(var(--crimson-rgb),0.35)" }}
                  />
                  <div
                    className="absolute w-10 h-4 rounded-full blur-sm -top-0.5"
                    style={{ background: "rgba(var(--crimson-rgb),0.25)" }}
                  />
                </div>
              </motion.div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
