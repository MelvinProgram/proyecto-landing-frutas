/*
Simple script para generar versiones WebP y AVIF de las imágenes
ubicadas en assets/image/frutas.

Uso: node scripts/optimize-images.js

Requiere la dependencia 'sharp'. Para instalarla:
  npm install --save-dev sharp

El script crea los archivos con extensión .webp y .avif en la misma carpeta.
*/

const fs = require('fs');
const path = require('path');
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('La dependencia "sharp" no está instalada. Ejecuta: npm install --save-dev sharp');
  process.exit(1);
}

const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'image', 'frutas');

if (!fs.existsSync(IMAGES_DIR)) {
  console.error('No existe la carpeta de imágenes:', IMAGES_DIR);
  process.exit(1);
}

const files = fs.readdirSync(IMAGES_DIR).filter(f => /\.(jpe?g|png)$/i.test(f));

(async () => {
  for (const file of files) {
    const inputPath = path.join(IMAGES_DIR, file);
    const name = path.parse(file).name;
    const webpPath = path.join(IMAGES_DIR, `${name}.webp`);
    const avifPath = path.join(IMAGES_DIR, `${name}.avif`);

    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      console.log('Generado', webpPath);

      await sharp(inputPath)
        .avif({ quality: 50 })
        .toFile(avifPath);
      console.log('Generado', avifPath);
    } catch (err) {
      console.error('Error optimizando', inputPath, err.message);
    }
  }
})();
