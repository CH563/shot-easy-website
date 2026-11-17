// Build a plain HTML/CSS embed snippet that recreates the current
// Screenshot Beautifier styling (background, padding, corner radius,
// shadow, light/dark glass frame) around the user's image, so the
// result can be pasted into a blog post, docs page or README.
// Pure functions only — no DOM access — so they are unit-testable.
//
// What the snippet deliberately does NOT reproduce:
// - MacBook Pro / iPhone device frames and macOS / Windows title bars
//   (they are drawn as images/shapes, not CSS) — the snippet notes this.
// - Annotations and the watermark — export the PNG for the full result.
// The image src is a placeholder: the user downloads the PNG as
// shotEasy.png (the beautifier's export name) or points src at a hosted URL.

import backgroundConfig from './backgroundConfig.js';

// Tailwind v3 default palette values used by backgroundConfig.
const TAILWIND_COLORS = {
    'indigo-500': '#6366f1',
    'purple-500': '#a855f7',
    'pink-500': '#ec4899',
    'red-500': '#ef4444',
    'violet-500': '#8b5cf6',
    'violet-800': '#5b21b6',
    'orange-500': '#f97316',
    'orange-400': '#fb923c',
    'rose-400': '#fb7185',
    'slate-400': '#94a3b8',
    'gray-400': '#9ca3af',
    'stone-400': '#a8a29e',
    'red-400': '#f87171',
    'amber-400': '#fbbf24',
    'yellow-400': '#facc15',
    'lime-400': '#a3e635',
    'green-400': '#4ade80',
    'emerald-400': '#34d399',
    'teal-400': '#2dd4bf',
    'cyan-400': '#22d3ee',
    'sky-400': '#38bdf8',
    'blue-400': '#60a5fa',
    'indigo-400': '#818cf8',
    'violet-400': '#a78bfa',
    'purple-400': '#c084fc',
    'fuchsia-400': '#e879f9',
    'pink-400': '#f472b6'
};

// Tailwind v3 shadow scale (shadow, shadow-sm, ... shadow-2xl).
const SHADOWS = {
    0: 'none',
    1: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    2: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    3: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    4: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    5: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    6: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
};

const GRADIENT_DIRECTIONS = {
    r: 'to right',
    l: 'to left',
    t: 'to top',
    b: 'to bottom',
    tr: 'to top right',
    br: 'to bottom right',
    bl: 'to bottom left',
    tl: 'to top left'
};

function resolveColor(token) {
    if (!token) return null;
    if (token.startsWith('[') && token.endsWith(']')) return token.slice(1, -1);
    return TAILWIND_COLORS[token] || null;
}

function parseGradientStop(parts, kind) {
    const colorClass = parts.find((part) => {
        if (!part.startsWith(kind + '-')) return false;
        const rest = part.slice(kind.length + 1);
        if (rest.endsWith('%')) return false;
        return rest.startsWith('[') || Boolean(TAILWIND_COLORS[rest]);
    });
    if (!colorClass) return null;
    const color = resolveColor(colorClass.slice(kind.length + 1));
    const positionClass = parts.find((part) => part.startsWith(kind + '-') && part.slice(kind.length + 1).endsWith('%'));
    return color + (positionClass ? ' ' + positionClass.slice(kind.length + 1) : '');
}

function tailwindBackgroundToCss(classes) {
    const parts = classes.split(/\s+/).filter(Boolean);
    const directionClass = parts.find((part) => part.startsWith('bg-gradient-to-'));
    if (directionClass) {
        const direction = GRADIENT_DIRECTIONS[directionClass.replace('bg-gradient-to-', '')] || 'to right';
        const stops = ['from', 'via', 'to'].map((kind) => parseGradientStop(parts, kind)).filter(Boolean);
        if (stops.length) return `background-image: linear-gradient(${direction}, ${stops.join(', ')});`;
        return 'background-color: #ffffff;';
    }
    if (parts.includes('bg-transparent')) return 'background-color: transparent;';
    const solidClass = parts.find((part) => part.startsWith('bg-'));
    if (solidClass) {
        const color = resolveColor(solidClass.slice(3));
        if (color) return `background-color: ${color};`;
    }
    return 'background-color: #ffffff;';
}

function styleObjectToCss(style) {
    const allowed = ['background', 'backgroundImage', 'backgroundColor', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat'];
    return Object.keys(style)
        .filter((key) => allowed.includes(key) && style[key])
        .map((key) => `${key.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase())}: ${style[key]};`)
        .join(' ');
}

// CSS declarations for the outer background of the beautifier canvas.
export function backgroundCss(bgValue, boxStyle) {
    if (boxStyle && (boxStyle.background || boxStyle.backgroundImage)) {
        const css = styleObjectToCss(boxStyle);
        if (css) return css;
    }
    const preset = backgroundConfig[bgValue];
    if (!preset) return 'background-color: #ffffff;';
    if (bgValue.includes('_img_')) {
        return `background-image: url('${preset}'); background-size: cover; background-position: center;`;
    }
    return tailwindBackgroundToCss(preset);
}

export function buildBeautifierEmbedHtml(options) {
    const {
        bgValue,
        boxStyle = {},
        marginValue = 150,
        paddingValue = 0,
        paddingBg = 'rgba(255,255,255,.85)',
        roundValue = 10,
        shadowValue = 3,
        frame = 'none',
        hasAnnotations = false
    } = options;
    const outerPadding = Math.max(Math.round(marginValue / 2), 0);
    const bgCss = backgroundCss(bgValue, boxStyle);
    const shadow = SHADOWS[shadowValue] || 'none';
    const isGlass = frame === 'light' || frame === 'dark';
    const glassCss = frame === 'light'
        ? 'background-color: rgba(255, 255, 255, 0.4); padding: 6px; '
        : frame === 'dark'
            ? 'background-color: rgba(0, 0, 0, 0.3); padding: 6px; '
            : '';
    const innerRadius = isGlass ? Math.max(roundValue - 2, 0) : 0;
    const notes = [];
    if (frame === 'macbookPro' || frame === 'iphonePro') {
        notes.push('Device frame is not included in this snippet — export the PNG for the framed version.');
    } else if (frame.includes('Bar')) {
        notes.push('Title bar is not included in this snippet — export the PNG for the framed version.');
    }
    if (hasAnnotations) {
        notes.push('Annotations and watermark are not included — export the PNG for the full result.');
    }
    const lines = [
        '<!-- Screenshot styled with ShotEasy Screenshot Beautifier (https://shoteasy.fun/screenshot-beautifier/) -->',
        '<!-- Replace shotEasy.png with your image file, or point src at a hosted image URL. -->'
    ];
    notes.forEach((note) => lines.push(`<!-- ${note} -->`));
    lines.push(
        `<div style="${bgCss} padding: ${outerPadding}px; display: inline-block;">`,
        `  <div style="${glassCss}border-radius: ${roundValue}px; box-shadow: ${shadow}; overflow: hidden;">`,
        `    <div style="padding: ${paddingValue}px; background-color: ${paddingBg}; border-radius: ${innerRadius}px; overflow: hidden;">`,
        '      <img src="shotEasy.png" alt="Screenshot" style="display: block; width: 100%;" />',
        '    </div>',
        '  </div>',
        '</div>'
    );
    return lines.join('\n');
}
