# Proyecto: Estrella Tropical

Landing simple con frutas exóticas.

## Qué contiene
- `index.html` - página principal
- `css/style.css` - estilos personalizados
- `js/main.js` - scripts para scroll, ajuste de padding y smooth scroll
- `assets/` - imágenes y iconos

## Probar localmente
1. Abrir el proyecto en un navegador: arrastra `index.html` al navegador.
2. (Recomendado) Servir localmente con Python desde la carpeta del proyecto:

```powershell
cd 'c:\Users\CANEL\Documents\GitHub\proyecto-landing-frutas'
python -m http.server 8000
# Abrir http://localhost:8000
```

También puedes usar npm (requiere Node.js):

```powershell
npm install
npm start
# Abrir http://localhost:8000
```

## Desplegar
- GitHub Pages:
  - En repositorio público, en Settings -> Pages seleccionar la rama `main` y carpeta `/ (root)`.
- Netlify:
  - Arrastra la carpeta al panel "Sites" o conecta el repo para deploy automático.

## Mejoras sugeridas (prioritarias)
- Optimizar imágenes (crear versiones webp/avif y usar `srcset`/`picture`).
- Agregar CI (linting, build) si el proyecto crece.
- Minificar CSS/JS para producción.
- Revisar contrastes y accesibilidad (WCAG) con herramientas automáticas.

## Integración continua

Se añadió un workflow simple en `.github/workflows/html-lint.yml` que ejecuta `html-validate` en cada push/pull request a `main`.
Puedes extenderlo para ejecutar pruebas o builds.

## Optimizar imágenes (generar WebP/AVIF)

He incluido un script Node para generar versiones WebP y AVIF de las imágenes en `assets/image/frutas`.

Pasos:

```powershell
cd 'c:\Users\CANEL\Documents\GitHub\proyecto-landing-frutas'
npm install --save-dev sharp
npm run images:optimize
```

El script crea archivos `.webp` y `.avif` junto a las imágenes originales. Después puedes actualizar más `img` a `picture` si quieres.

## Notas
- Se añadió un enlace "Saltar al contenido" y meta tags para SEO/telefono.
- Se añadió lógica JS para ajustar `padding-top` según la altura del `navbar`.

---
Desarrollado por Melvin B.
