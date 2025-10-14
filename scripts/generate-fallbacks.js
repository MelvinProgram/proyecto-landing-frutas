#!/usr/bin/env node
/*
 Script: generate-fallbacks.js
 - Busca recursivamente archivos .webp en assets/ y genera versiones JPEG de baja compresion
 - No sobreescribe archivos existentes con la misma ruta y extensión
 - Uso: node scripts/generate-fallbacks.js [--src assets/image/frutas] [--quality 80]

 Nota: Este script requiere la librería 'sharp'. Instálala con:
   npm install --save-dev sharp

 El script está diseñado para correr localmente. No se ejecuta como parte del CI por defecto.
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const argv = require('minimist')(process.argv.slice(2));
const SRC = argv.src || 'assets/image/frutas';
const OUT_FORMAT = argv.format || 'jpg';
const QUALITY = parseInt(argv.quality || '82', 10);

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext !== '.webp') return;

  const outPath = filePath.replace(/\.webp$/i, `.${OUT_FORMAT}`);
  if (fs.existsSync(outPath)) {
    console.log('[skip] exists:', outPath);
    return;
  }

  try {
    await sharp(filePath)
      .toFormat(OUT_FORMAT, { quality: QUALITY })
      .toFile(outPath);
    console.log('[created]', outPath);
  } catch (err) {
    console.error('[error]', filePath, err.message);
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (const name of list) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else processFile(full).catch(err => console.error(err));
  }
}

// simple guard
if (!fs.existsSync(SRC)) {
  console.error('Source directory not found:', SRC);
  process.exit(2);
}

console.log('Generating fallbacks from', SRC, '-> format:', OUT_FORMAT, 'quality:', QUALITY);
walk(SRC);
