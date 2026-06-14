import type { CSSProperties } from "react";

/**
 * Ambient green microbubbles that rise up the screen — a signature Algaeo motif.
 * Values are derived from the bubble index (deterministic), NOT Math.random(),
 * so the server and client render identical markup and there's no hydration
 * mismatch. Purely decorative: fixed, behind the header, pointer-events: none.
 */
const BUBBLE_COUNT = 26;

// Cheap deterministic pseudo-random in [0,1) from a seed.
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const bubbles = Array.from({ length: BUBBLE_COUNT }, (_, i) => {
  const left = rand(i + 1) * 100; // vw position
  const size = 4 + rand(i + 2) * 16; // 4–20px (microbubbles, a few larger)
  const duration = 10 + rand(i + 3) * 12; // 10–22s
  const delay = -rand(i + 4) * 22; // negative → staggered, already mid-flight
  const drift = (rand(i + 5) - 0.5) * 80; // -40–40px horizontal wander
  const opacity = 0.18 + rand(i + 6) * 0.3; // 0.18–0.48
  return { left, size, duration, delay, drift, opacity };
});

export function Bubbles() {
  return (
    <div className="bubble-field" aria-hidden="true">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={
            {
              left: `${b.left}vw`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              "--bubble-duration": `${b.duration}s`,
              "--bubble-delay": `${b.delay}s`,
              "--bubble-drift": `${b.drift}px`,
              "--bubble-opacity": b.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
