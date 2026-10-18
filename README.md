# BeeJir — Clean & Colorful Open-Source Admin Template

**BeeJir** adalah template administrator *open-source* modern berbasis **Vue 3 + Vite + Bun + TypeScript** yang mengusung desain **Clean, Colorful, & Adjustable Theme**.

Dirancang dengan sistem styling **Custom Semantic Tailwind CSS**, BeeJir menyediakan class komponen semantik seperti `.btn`, `.btn-primary`, `.btn-soft`, `.card`, `.badge`, `.input`, `.alert`, `.table` serta komponen Vue 3 bertipe kuat (`<UiButton>`, `<UiCard>`, `<UiBadge>`, `<UiModal>`, dsb.) yang dibangun 100% di atas CSS Variables & `@layer components` murni.

---

## Fitur Utama

- **Vue 3.5+ & Strict TypeScript**: Menggunakan `<script setup lang="ts">`, Vue Router 4, dan Pinia.
- **Super Cepat dengan Bun + Vite**: Instalasi paket dan *hot-module replacement* (HMR) instan.
- **Semantic Component Classes & CSS Tokens**:
  - Gunakan class semantik langsung (`<button class="btn btn-primary">`) **atau** komponen Vue (`<UiButton variant="primary">`).
  - Mendukung penuh *opacity modifier* Tailwind (`bg-primary/15`, `text-secondary/80`, `border-accent/30`) berkat arsitektur variabel channel RGB.
- **6 Preset Tema Clean & Colorful + Live Theme Studio**:
  - `daybreak` (Default Light — Clean Slate & Vibrant Indigo/Coral/Mint)
  - `midnight` (Default Dark — Deep Obsidian & Electric Indigo/Pink/Cyan)
  - `sunset` (Warm Cream & Tangerine/Rose/Violet)
  - `ocean` (Crisp Aqua & Sky/Lagoon/Coral)
  - `matcha` (Botanical Sage & Emerald/Teal/Amber)
  - `berry` (Soft Lavender & Royal Violet/Fuchsia/Amber)
  - Dilengkapi **Theme Studio Drawer** untuk mengubah warna Primary/Secondary/Accent via *Color Picker*, mengatur kelengkungan sudut (*Radius Scale*), dan mengekspor CSS variabel tema secara langsung.

---

## Memulai Cepat (Quick Start)

Pastikan Anda telah menginstal [Bun](https://bun.sh/).

```bash
# 1. Install dependencies
bun install

# 2. Jalankan development server
bun run dev

# 3. Jalankan pemeriksaan tipe TypeScript
bun run type-check

# 4. Build untuk produksi
bun run build
```

---

## Struktur Proyek

```text
src/
├── assets/css/
│   ├── themes.css          # Definisi variabel RGB untuk 6 preset [data-theme]
│   ├── components.css      # Class semantik (.btn, .card, .badge, .input, dll.)
│   └── main.css            # Entry stylesheet Tailwind CSS
├── components/
│   ├── layout/             # AppSidebar, AppNavbar, ThemeCustomizerDrawer
│   └── ui/                 # UiButton, UiCard, UiBadge, UiInput, UiAlert, UiModal, UiStatCard
├── layouts/
│   └── AdminLayout.vue     # Layout utama admin panel
├── router/                 # Konfigurasi Vue Router
├── stores/
│   └── theme.ts            # Pinia store untuk manajemen tema, warna custom, & radius
└── views/
    ├── DashboardView.vue   # Halaman analitik & KPI colorful
    ├── ComponentsView.vue  # Kitchen sink / dokumentasi interaktif komponen UI
    └── UsersTableView.vue  # Halaman manajemen data tabel dengan filter & modal
```

---

## Lisensi

Dirilis di bawah lisensi **MIT** — bebas digunakan untuk proyek pribadi, komersial, maupun kontribusi komunitas open-source.