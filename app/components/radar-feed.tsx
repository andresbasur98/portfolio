"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import {
  radarSources,
  type RadarItem,
} from "../data/radar";

const DESKTOP_VISIBLE_ITEMS = 5;
const ROTATION_INTERVAL_MS = 7_000;
const FLIP_DURATION_MS = 720;
const FLIP_STAGGER_MS = 120;

type ContentTeaserProps = {
  teaser: RadarItem;
  className?: string;
  tabIndex?: number;
};

type FlipStyle = CSSProperties & {
  "--flip-delay": string;
};

type CarouselStyle = CSSProperties & {
  "--carousel-duration": string;
};

function ContentTeaser({
  teaser,
  className = "",
  tabIndex,
}: ContentTeaserProps) {
  const source = radarSources[teaser.source];
  const external = /^https?:\/\//i.test(teaser.href);
  const classes = ["content-teaser", className].filter(Boolean).join(" ");
  const content = (
    <>
      <span className="content-source">
        <Image src={source.icon} alt="" width={24} height={24} />
        <span className="content-type">{source.label}</span>
      </span>
      <strong>{teaser.title}</strong>
      <span className="content-meta">
        {teaser.meta}
        <i aria-hidden="true">{external ? "↗" : "→"}</i>
      </span>
    </>
  );

  if (external) {
    return (
      <a
        className={classes}
        href={teaser.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={tabIndex}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={teaser.href} tabIndex={tabIndex}>
      {content}
    </Link>
  );
}

function getVisibleItems(items: RadarItem[], offset: number, count: number) {
  return Array.from(
    { length: count },
    (_, index) => items[(offset + index) % items.length],
  );
}

function DesktopRadarFeed({ items }: { items: RadarItem[] }) {
  const visibleCount = Math.min(DESKTOP_VISIBLE_ITEMS, items.length);
  const [offset, setOffset] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (items.length <= visibleCount) return;

    let resetTimer: number | undefined;
    const cycleDuration =
      FLIP_DURATION_MS + FLIP_STAGGER_MS * (visibleCount - 1);
    const interval = window.setInterval(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setOffset((current) => (current + visibleCount) % items.length);
        return;
      }

      setIsFlipping(true);
      resetTimer = window.setTimeout(() => {
        setOffset((current) => (current + visibleCount) % items.length);
        setIsFlipping(false);
      }, cycleDuration);
    }, ROTATION_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
      if (resetTimer !== undefined) window.clearTimeout(resetTimer);
    };
  }, [items.length, visibleCount]);

  if (items.length === 0) return null;

  const currentItems = getVisibleItems(items, offset, visibleCount);
  const nextOffset = (offset + visibleCount) % items.length;
  const nextItems = getVisibleItems(items, nextOffset, visibleCount);

  return (
    <div
      className={`radar-desktop-feed${isFlipping ? " is-flipping" : ""}`}
      aria-live="off"
    >
      {currentItems.map((teaser, index) => (
        <div
          className="radar-flip-card"
          key={`radar-slot-${index}`}
        >
          <div
            className="radar-flip-card-inner"
            style={{
              "--flip-delay": `${index * FLIP_STAGGER_MS}ms`,
            } as FlipStyle}
          >
            <div className="radar-card-face radar-card-front">
              <ContentTeaser teaser={teaser} />
            </div>
            <div className="radar-card-face radar-card-back" aria-hidden="true">
              <ContentTeaser teaser={nextItems[index]} tabIndex={-1} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MobileRadarFeed({ items }: { items: RadarItem[] }) {
  if (items.length === 0) return null;

  const duration = Math.max(28, items.length * 6);

  return (
    <div className="radar-carousel-viewport" aria-label="Recomendaciones en movimiento">
      <div
        className="radar-carousel-track"
        style={{ "--carousel-duration": `${duration}s` } as CarouselStyle}
      >
        {[0, 1].map((copy) => (
          <div
            className="radar-carousel-group"
            aria-hidden={copy === 1 ? "true" : undefined}
            key={copy}
          >
            {items.map((teaser) => (
              <ContentTeaser
                className="radar-carousel-card"
                teaser={teaser}
                tabIndex={copy === 1 ? -1 : undefined}
                key={`${copy}-${teaser.source}-${teaser.href}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RadarFeed({
  items,
  mobile,
}: {
  items: RadarItem[];
  mobile: boolean;
}) {
  return mobile
    ? <MobileRadarFeed items={items} />
    : <DesktopRadarFeed items={items} />;
}
