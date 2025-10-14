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

### Generar fallbacks JPG/PNG desde WebP (script)

He añadido un script Node para generar imágenes de fallback (JPEG) a partir de los archivos `.webp` que hay en `assets/`.

- Archivo: `scripts/generate-fallbacks.js`
- Dependencia: `sharp` (instalar en devDependencies)
- Comando npm: `npm run generate-fallbacks`

Instrucciones rápidas:

```powershell
cd 'c:\Users\CANEL\Documents\GitHub\proyecto-landing-frutas'
npm install
# instala sharp como devDependency (si no lo hiciste automáticamente):
npm install --save-dev sharp
npm run generate-fallbacks -- --src assets/image/frutas --quality 82
# Esto generará archivos .jpg junto a cada .webp si no existen.
```

Opciones:
- `--src` : ruta base a explorar (por defecto `assets/image/frutas`).
- `--quality` : calidad JPEG (por defecto `82`).

El script es intencionalmente conservador: no sobreescribe archivos existentes con el mismo nombre y extensión.

## Integración continua

Se añadió un workflow simple en `.github/workflows/html-lint.yml` que ejecuta `html-validate` en cada push/pull request a `main`.
Puedes extenderlo para ejecutar pruebas o builds.

## Notas
- Se añadió un enlace "Saltar al contenido" y meta tags para SEO/telefono.
- Se añadió lógica JS para ajustar `padding-top` según la altura del `navbar`.

---
Desarrollado por Melvin B.
