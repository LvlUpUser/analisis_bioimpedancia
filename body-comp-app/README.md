# Composición Corporal · Centro Médico 4 Elements

App clínica de evaluación de composición corporal, migrada de HTML/CSS/JS vanilla a **React + Vite + Tailwind CSS**, e instalable como **PWA**.

## Estructura

```
src/
  components/        Componentes UI (formularios, informe, tarjetas de resultado)
  lib/calculations.js Lógica clínica pura (fórmulas, interpretación, rangos) — idéntica a la versión original
  App.jsx             Estado global del formulario e informe
  main.jsx            Punto de entrada
public/
  logos_4e.png         ⚠️ Sustituye este archivo por el logo real del centro (52x52 o superior)
  favicon.svg, pwa-*.png, apple-touch-icon.png   Iconos PWA (placeholders "4E" — sustitúyelos por el logo real)
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Build de producción

```bash
npm run build
npm run preview   # para probar el build localmente
```

El build genera automáticamente el Service Worker y el manifest gracias a `vite-plugin-pwa`, así que la app queda instalable (botón "Instalar" en Chrome/Edge, "Añadir a pantalla de inicio" en iOS/Android) y funciona offline tras la primera visita.

## Despliegue en Vercel

1. Sube este proyecto a un repositorio de Git (GitHub/GitLab).
2. En Vercel: **New Project** → importa el repo.
3. Framework detectado automáticamente: **Vite**. Si no, usa:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy. El `vercel.json` incluido ya configura el rewrite SPA (no es estrictamente necesario para esta app de una sola vista, pero evita problemas si en el futuro añades rutas).

## Pendiente antes de producción

- **Logo real**: reemplaza `public/logos_4e.png` (referenciado en el header) y los iconos `public/pwa-192x192.png`, `public/pwa-512x512.png`, `public/apple-touch-icon.png`, `public/favicon.svg` — ahora mismo son placeholders generados con las iniciales "4E" sobre fondo teal.
- Revisa el dominio final y actualiza `start_url`/`scope` en `vite.config.js` si la app no se sirve desde la raíz `/`.

## Notas de la migración

- Toda la lógica de cálculo e interpretación clínica (IMC, % grasa, grasa visceral, músculo, FFMI, edad metabólica, ICE, TMR, BMR) se trasladó tal cual a `src/lib/calculations.js` como funciones puras — sin cambios en las fórmulas ni en los rangos clínicos.
- El comportamiento de "recalcular en vivo al editar" se preserva: React vuelve a renderizar el informe automáticamente al cambiar cualquier campo, igual que `updateControls()` en el script original.
- El botón **Exportar a PDF** sigue usando `window.print()` con estilos `print:` de Tailwind (equivalentes al `@media print` original).
- Paleta de color: los teal/slate del diseño original coinciden exactamente con la paleta por defecto de Tailwind, así que se usa `teal-*` / `slate-*` sin tener que extender el theme.
