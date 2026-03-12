Reusable CSS pattern: rounded background-image with reveal animation

Purpose
- Encapsulate the combination of background-image, rounded corners, clipping and a reveal animation into a single, reusable utility.

Utility class
- `.rounded-bg-image` - apply to any block element (div/section) to use the pattern.

How it works
- Accepts a CSS custom property `--bg-image` for the image URL (inline style or class can set it).
- Applies `border-radius: var(--radius)` and cross-browser clipping using `clip-path` and `-webkit-mask-image`.
- Uses the existing `@keyframes imageReveal` animation to reveal the image with a gentle scale effect.
- Provides a mobile fallback: include an `<img>` inside the element if you need an inline fallback; the class hides that image on desktop and shows it on small viewports with rounded corners.

Examples
1) Inline style (per-instance):

```html
<section class="rounded-bg-image" style="--bg-image: url('/obrazky/cisteni/cisteni-pruceli-bytoveho-domu-plosina-dek.jpg'); height: 420px;">
  <!-- optional fallback for mobile -->
  <img src="/obrazky/cisteni/cisteni-pruceli-bytoveho-domu-plosina-dek.jpg" alt="...">
</section>
```

2) Named class (CSS):

```css
.my-hero-bg { --bg-image: url('/obrazky/cisteni/hero.jpg'); height: 520px; }
```

```html
<section class="rounded-bg-image my-hero-bg"></section>
```

Notes & accessibility
- Keep an inline `<img>` fallback only if you need it for very old browsers or for semantic reasons; otherwise prefer background-image for layout.
- Ensure sufficient contrast of overlaid text; use the `.glass-box` pattern for readable overlays.
- The animation respects `prefers-reduced-motion` (defined in `styles.css`); no further work needed.

Where added
- Utility class is in `css/styles.css` (search for `.rounded-bg-image`).

If you want, I can:
- Convert this to a SCSS mixin for easier reuse with variables, or
- Replace existing hero and service-side rules to use this class instead of duplicated rules.