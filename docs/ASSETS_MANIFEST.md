# KisanRoute — Visual Asset Manifest & Provenance

All visual assets utilized across the KisanRoute platform adhere to strict attribution and open licensing standards.

---

## 1. Brand Identity & Logo
- **Asset:** `assets/logo.png`, `frontend/public/logo.png`, and `components/Logo.tsx`
- **Design:** Custom-designed agricultural emblem combining an organic leaf contour, curved furrow field lines, and a 4-node intelligent routing network.
- **License:** Proprietary to KisanRoute (Open Source MIT Platform).
- **Format:** High-resolution PNG and scalable vector SVG.

---

## 2. Agricultural Visual Photography
All photographic backgrounds and editorial gallery media are sourced from **Unsplash** under the [Unsplash License](https://unsplash.com/license) (commercial and non-commercial use permitted without permission, attribution appreciated).

| Asset URL | Primary Depiction | Agro-Climatic Context | License |
|---|---|---|---|
| `photo-1500937386664-56d1dfef3854` | Lush green agricultural fields and morning mist | Indo-Gangetic Plains (Wheat/Rice) | Unsplash Open License |
| `photo-1595974482597-4b8da8879bc5` | Golden wheat crop moving in wind | Rabi Harvest Season | Unsplash Open License |
| `photo-1523348837708-15d4a09cfac2` | Indian farmer hands inspecting organic soil health | Soil & Nutrient Management | Unsplash Open License |
| `photo-1589923188900-85dae523342b` | Farmer walking through expansive green paddy | Kharif Season Extension | Unsplash Open License |
| `photo-1560493676-04071c5f467b` | Precision drip irrigation in orchard | Water & Fertigation | Unsplash Open License |
| `photo-1530507629858-e4977d30e9e0` | Rice paddy tillers and panicle emergence | Southern Delta Zone | Unsplash Open License |
| `photo-1542838132-92c53300491e` | Fresh agricultural produce and market trading | APMC Mandi Discovery | Unsplash Open License |

---

## 3. Visual Performance & Accessibility
- **Responsive Sizing:** Dynamic aspect ratio containers with object-fit.
- **Color Contrast:** Every photographic scene is overlaid with semi-opaque natural ivory gradients (`bg-ivory/85`) in Light mode and deep forest gradients (`bg-agri-950/90`) in Dark mode to guarantee WCAG AA text contrast.
- **Fallbacks:** In the event of network disruption, solid theme backgrounds (`bg-soil-50` / `bg-agri-950`) provide resilient fallbacks.
- **Reduced Motion:** Interactive CSS transitions and Framer Motion effects respect `prefers-reduced-motion: reduce`.

