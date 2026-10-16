import type MatterNS from "matter-js";

/**
 * The hero "souvenir table": the METASOFTCO letters and a handful of event
 * keepsakes fall onto the bottom of the hero and pile up under Matter.js
 * physics. Mice can drag and throw them; a quick click (or tap) flips a
 * keepsake, and a click on a flipped one adds its service to the cart.
 * Scrolling tilts the table: gravity swings right and the right wall opens.
 *
 * The DOM owns every element; this module only reads their sizes and writes
 * their transforms, so the markup stays in React and renders without JS.
 */

type Matter = typeof MatterNS;

interface Piece {
    el: HTMLElement;
    w: number;
    h: number;
    letter: boolean;
    service: string | null;
    body?: MatterNS.Body;
    flipped: boolean;
    flipTimer?: number;
}

export interface TableOptions {
    /** Mouse drag and throw; touch devices only get tap-to-flip so the page still scrolls. */
    drag: boolean;
    /** Settle the pile instantly and never tilt (prefers-reduced-motion). */
    still: boolean;
    /** A flipped keepsake was clicked again. */
    onAdd: (service: string) => void;
    isInCart: (service: string) => boolean;
    labels: { grab: string; holding: string; flip: string; plus: string; added: string };
}

export interface Table {
    /** Advance one frame; `tilt` is 0 at the top of the hero and 1 once it has scrolled away. */
    step: (tilt: number) => void;
    /** Cursor label for whatever is under the pointer. */
    label: () => string;
    destroy: () => void;
}

const FLIP_MS = 6000;
const TAP_MS = 260;
const TAP_PX = 8;

export async function startTable(host: HTMLElement, options: TableOptions): Promise<Table> {
    const M: Matter = (await import("matter-js")).default;
    if (document.fonts?.ready) await document.fonts.ready;

    const W = host.clientWidth, H = host.clientHeight, T = 400;
    const engine = M.Engine.create();
    engine.gravity.y = 1.1;
    const ground = M.Bodies.rectangle(W / 2, H + T / 2, W * 4, T, { isStatic: true, friction: 0.8 });
    const left = M.Bodies.rectangle(-T / 2, 0, T, H * 4, { isStatic: true });
    const right = M.Bodies.rectangle(W + T / 2, 0, T, H * 4, { isStatic: true });
    M.Composite.add(engine.world, [ground, left, right]);

    const pieces: Piece[] = [...host.querySelectorAll<HTMLElement>("[data-phys]")].map((el) => ({
        el,
        w: el.offsetWidth,
        h: el.offsetHeight,
        letter: el.dataset.phys === "letter",
        service: el.dataset.service ?? null,
        flipped: false,
    }));
    const timers: number[] = [];

    const spawn = (piece: Piece, x: number, y: number) => {
        const body = M.Bodies.rectangle(x, y, piece.w, piece.h, {
            restitution: 0.32,
            friction: 0.5,
            frictionAir: 0.014,
            angle: (Math.random() - 0.5) * 0.9,
            chamfer: { radius: Math.min(piece.w, piece.h) * 0.06 },
        });
        M.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
        M.Composite.add(engine.world, body);
        piece.body = body;
        piece.el.style.visibility = "visible";
    };

    const letters = pieces.filter((piece) => piece.letter);
    const keepsakes = pieces.filter((piece) => !piece.letter);
    const startX = new Map<Piece, number>();
    letters.forEach((piece, i) => startX.set(piece, W * (0.06 + (0.88 * i) / Math.max(1, letters.length - 1))));
    keepsakes.forEach((piece) => startX.set(piece, W * (0.1 + Math.random() * 0.8)));
    const order = [...letters, ...keepsakes];

    if (options.still) {
        order.forEach((piece) => spawn(piece, startX.get(piece)!, -piece.h - Math.random() * H));
        for (let i = 0; i < 700; i++) M.Engine.update(engine, 1000 / 60);
    } else {
        order.forEach((piece, i) => {
            timers.push(window.setTimeout(() => spawn(piece, startX.get(piece)!, -piece.h - 40 - Math.random() * 120), i * 95));
        });
    }

    const bodies = () => pieces.flatMap((piece) => (piece.body ? [piece.body] : []));
    const pieceOf = (body: MatterNS.Body | undefined) => pieces.find((piece) => piece.body === body);

    const flip = (piece: Piece) => {
        if (piece.letter || !piece.service) return;
        if (piece.flipped) {
            options.onAdd(piece.service);
            return;
        }
        piece.flipped = true;
        piece.el.classList.add("is-flipped");
        clearTimeout(piece.flipTimer);
        piece.flipTimer = window.setTimeout(() => {
            piece.flipped = false;
            piece.el.classList.remove("is-flipped");
        }, FLIP_MS);
        timers.push(piece.flipTimer);
    };

    // Tap/click detection works the same for mouse and touch.
    let down: { t: number; x: number; y: number } | null = null;
    const local = (event: PointerEvent) => {
        const r = host.getBoundingClientRect();
        return { x: event.clientX - r.left, y: event.clientY - r.top };
    };
    const onDown = (event: PointerEvent) => {
        down = { t: performance.now(), ...local(event) };
    };
    const onUp = (event: PointerEvent) => {
        const start = down;
        down = null;
        if (!start) return;
        const p = local(event);
        if (performance.now() - start.t > TAP_MS || Math.hypot(p.x - start.x, p.y - start.y) > TAP_PX) return;
        const hit = pieceOf(M.Query.point(bodies(), p)[0]);
        if (hit) flip(hit);
    };
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointerup", onUp);

    let mouse: MatterNS.Mouse | null = null;
    let constraint: MatterNS.MouseConstraint | null = null;
    let pointer = { x: -1, y: -1 };
    const onMove = (event: PointerEvent) => {
        pointer = local(event);
    };
    host.addEventListener("pointermove", onMove);

    if (options.drag) {
        mouse = M.Mouse.create(host);
        // Matter's own wheel and touch handlers would swallow page scrolling.
        const m = mouse as unknown as Record<string, EventListener>;
        for (const type of ["wheel", "mousewheel", "DOMMouseScroll"]) host.removeEventListener(type, m.mousewheel);
        host.removeEventListener("touchstart", m.mousedown);
        host.removeEventListener("touchmove", m.mousemove);
        host.removeEventListener("touchend", m.mouseup);
        constraint = M.MouseConstraint.create(engine, {
            mouse,
            constraint: { stiffness: 0.2, damping: 0.08, render: { visible: false } } as MatterNS.IConstraintDefinition,
        });
        M.Composite.add(engine.world, constraint);
    }

    let rightOpen = false;
    const step = (tilt: number) => {
        const p = options.still ? 0 : tilt;
        if (p >= 1) return; // The hero is off screen; nothing to draw.
        engine.gravity.x = p * 1.5;
        const open = p > 0.25;
        if (open !== rightOpen) {
            rightOpen = open;
            M.Body.setPosition(right, { x: open ? W * 6 : W + T / 2, y: 0 });
        }
        if (!options.still) M.Engine.update(engine, 1000 / 60);
        for (const piece of pieces) {
            const b = piece.body;
            if (!b) continue;
            if (p < 0.05 && (b.position.x > W + 300 || b.position.y > H + 500 || b.position.x < -300)) {
                M.Body.setPosition(b, { x: W * (0.1 + Math.random() * 0.8), y: -piece.h - 60 });
                M.Body.setVelocity(b, { x: 0, y: 0 });
            }
            piece.el.style.transform = `translate(${b.position.x - piece.w / 2}px,${b.position.y - piece.h / 2}px) rotate(${b.angle}rad)`;
        }
    };

    const label = () => {
        if (constraint?.body) return options.labels.holding;
        if (pointer.x < 0) return "";
        const hit = pieceOf(M.Query.point(bodies(), pointer)[0]);
        if (!hit) return "";
        if (hit.letter) return options.drag ? options.labels.grab : "";
        if (!hit.flipped) return options.labels.flip;
        return hit.service && options.isInCart(hit.service) ? options.labels.added : options.labels.plus;
    };
    host.addEventListener("pointerleave", () => {
        pointer = { x: -1, y: -1 };
    });

    const destroy = () => {
        timers.forEach(clearTimeout);
        host.removeEventListener("pointerdown", onDown);
        host.removeEventListener("pointerup", onUp);
        host.removeEventListener("pointermove", onMove);
        if (mouse) {
            const m = mouse as unknown as Record<string, EventListener>;
            host.removeEventListener("mousedown", m.mousedown);
            host.removeEventListener("mousemove", m.mousemove);
            host.removeEventListener("mouseup", m.mouseup);
        }
        M.Engine.clear(engine);
        for (const piece of pieces) {
            piece.el.style.visibility = "";
            piece.el.style.transform = "";
            piece.el.classList.remove("is-flipped");
        }
    };

    return { step, label, destroy };
}
