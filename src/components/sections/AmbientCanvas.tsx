import { useEffect, useRef } from 'react';

// ============================================================================
// SIGNATURE AMBIENT VISUAL — a restrained data/automation network. Nodes sit
// on a loose grid; pulses travel along the edges between them, evoking
// "systems that run autonomously." Lazy-loaded, reduced-motion aware, and
// gracefully absent without JS (nothing renders; the CSS backdrop remains).
//
// Cost controls: capped DPR, capped node count, pauses when off-screen or
// when the tab is hidden, and stops entirely under prefers-reduced-motion.
// ============================================================================

interface Node {
  x: number;
  y: number;
  bx: number; // base position (drift origin)
  by: number;
  phase: number;
}

interface Edge {
  a: number;
  b: number;
  len: number;
}

interface Pulse {
  edge: number;
  t: number; // 0..1 along the edge
  speed: number;
  dir: 1 | -1;
  hue: number;
}

const ACCENTS = [
  [53, 224, 200], // --accent-1
  [74, 168, 255], // --accent-2
  [124, 140, 255], // --accent-3
];

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let running = false;
    let last = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function build() {
      const parent = canvas!.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);

      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Loose grid of nodes, scaled to area but capped for performance.
      const area = width * height;
      const target = Math.max(14, Math.min(40, Math.round(area / 26000)));
      const cols = Math.ceil(Math.sqrt((target * width) / height));
      const rows = Math.ceil(target / cols);
      const cellW = width / cols;
      const cellH = height / rows;

      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const jitterX = rand(0.2, 0.8) * cellW;
          const jitterY = rand(0.2, 0.8) * cellH;
          const x = c * cellW + jitterX;
          const y = r * cellH + jitterY;
          nodes.push({ x, y, bx: x, by: y, phase: rand(0, Math.PI * 2) });
        }
      }

      // Connect near neighbors only (keeps the graph sparse and legible).
      edges = [];
      const maxDist = Math.min(cellW, cellH) * 2.1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].bx - nodes[j].bx;
          const dy = nodes[i].by - nodes[j].by;
          const d = Math.hypot(dx, dy);
          if (d < maxDist) edges.push({ a: i, b: j, len: d });
        }
      }

      // Seed a handful of travelling pulses.
      const pulseCount = Math.min(edges.length, Math.round(nodes.length * 0.6));
      pulses = [];
      for (let i = 0; i < pulseCount; i++) spawnPulse();
    }

    function spawnPulse() {
      if (!edges.length) return;
      pulses.push({
        edge: Math.floor(rand(0, edges.length)),
        t: Math.random(),
        speed: rand(0.06, 0.16),
        dir: Math.random() > 0.5 ? 1 : -1,
        hue: Math.floor(rand(0, ACCENTS.length)),
      });
    }

    function draw(now: number) {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      ctx!.clearRect(0, 0, width, height);

      // Gentle drift so the lattice breathes.
      const time = now / 1000;
      for (const n of nodes) {
        n.x = n.bx + Math.sin(time * 0.25 + n.phase) * 6;
        n.y = n.by + Math.cos(time * 0.22 + n.phase) * 6;
      }

      // Edges — faint hairlines.
      ctx!.lineWidth = 1;
      for (const e of edges) {
        const a = nodes[e.a];
        const b = nodes[e.b];
        ctx!.strokeStyle = 'rgba(120, 150, 165, 0.06)';
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.stroke();
      }

      // Nodes — small cool dots.
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.fillStyle = 'rgba(140, 170, 185, 0.28)';
        ctx!.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Pulses — glowing dots gliding along edges with a short trailing streak.
      for (const p of pulses) {
        const e = edges[p.edge];
        if (!e) continue;
        const a = nodes[e.a];
        const b = nodes[e.b];
        p.t += p.speed * p.dir * dt;
        if (p.t > 1 || p.t < 0) {
          // Retarget to a new edge at an endpoint — feels like flow through the net.
          p.edge = Math.floor(rand(0, edges.length));
          p.t = p.dir === 1 ? 0 : 1;
          p.dir = Math.random() > 0.5 ? 1 : -1;
          continue;
        }
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const [r, g, bl] = ACCENTS[p.hue];

        // trailing streak
        const trail = 0.06 * p.dir;
        const tx = a.x + (b.x - a.x) * (p.t - trail);
        const ty = a.y + (b.y - a.y) * (p.t - trail);
        const grad = ctx!.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `rgba(${r},${g},${bl},0)`);
        grad.addColorStop(1, `rgba(${r},${g},${bl},0.5)`);
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(x, y);
        ctx!.stroke();

        // glowing head
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${r},${g},${bl},0.9)`;
        ctx!.shadowColor = `rgba(${r},${g},${bl},0.8)`;
        ctx!.shadowBlur = 8;
        ctx!.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running || reduce.matches) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // Only animate while the hero is on screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    function onResize() {
      build();
      // Draw one static frame so a reduced-motion viewer still sees the lattice.
      if (reduce.matches) {
        running = true;
        last = performance.now();
        draw(performance.now());
        running = false;
      }
    }

    function onReduceChange() {
      if (reduce.matches) {
        stop();
        // paint a single frozen frame
        running = true;
        last = performance.now();
        draw(performance.now());
        running = false;
      } else {
        start();
      }
    }

    build();
    onReduceChange();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize);
    reduce.addEventListener('change', onReduceChange);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      reduce.removeEventListener('change', onReduceChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.9 }}
    />
  );
}
