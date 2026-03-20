# Cercado Logo Usage Guide

## Logo Files

### Vector Logos (SVG)
- `logo-mark.svg` - Icon only (36×36px) - For tight spaces
- `logo-full.svg` - Icon + "Cercado" wordmark (180×48px) - For headers/hero

### Favicons & PWA Icons
Located in `/static/`:
- `favicon.svg` - Browser favicon (32×32px)
- `icon-192.svg` - PWA icon (192×192px)
- `icon-512.svg` - PWA icon (512×512px)
- `manifest.json` - PWA manifest

## Usage Examples

### In Svelte Components

```svelte
<script>
  import logoMark from '$lib/assets/logo-mark.svg';
  import logoFull from '$lib/assets/logo-full.svg';
</script>

<!-- Logo Mark (icon only) -->
<img src={logoMark} alt="Cercado" class="w-9 h-9" />

<!-- Full Logo (with wordmark) -->
<img src={logoFull} alt="Cercado" class="h-8" />
```

### Current Usage (CSS Gradient - Alternative)

The sidebar currently uses a CSS gradient instead of the SVG:

```svelte
<div class="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[#00B8E6] via-[#E6007E] to-[#FFD700]">
  <span class="text-white font-bold text-lg">C</span>
</div>
```

Both approaches work! CSS gradient = 0 bytes, SVG = ~2KB.

## CMYK Gradient Colors

Our signature gradient uses CMYK process colors:
- **Cyan**: `#00B8E6`
- **Magenta**: `#E6007E` (primary brand color)
- **Yellow**: `#FFD700`

Perfect for a screen printing platform! 🎨

## Sizing Guidelines

| Context | Recommended Size | File |
|---------|-----------------|------|
| Sidebar icon | 36×36px | logo-mark.svg or CSS |
| Header logo | 180×48px | logo-full.svg |
| Hero/Login | Scale up | logo-full.svg |
| Favicon | 32×32px | favicon.svg (auto) |
| PWA Icon | 192×192px | icon-192.svg (auto) |

## File Sizes

- `logo-mark.svg` - ~1.2KB
- `logo-full.svg` - ~1.5KB
- `favicon.svg` - ~1KB
- `icon-192.svg` - ~1.2KB
- `icon-512.svg` - ~1.3KB

All optimized and production-ready!

## Notes

- All logos use SVG format for crisp display at any size
- Gradient is defined in each SVG (no external dependencies)
- Favicons are automatically loaded from `/static/` directory
- PWA manifest is configured in `/static/manifest.json`
