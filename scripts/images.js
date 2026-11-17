import { mkdirSync, readdirSync } from 'node:fs';
import { basename, extname } from 'node:path';
import sharp from 'sharp';

const SRC = 'src/assets/images-src';
const OUT = 'public/assets';
const WIDTHS = [400, 800];
mkdirSync(SRC, { recursive: true });
mkdirSync(OUT, { recursive: true });

let files = readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f));
if (files.length === 0) {
  const names = [
    ...Array.from({ length: 9 }, (_, i) => `work-0${i + 1}`),
    ...Array.from({ length: 4 }, (_, i) => `journal-0${i + 1}`),
    'avatar-01',
  ];
  await Promise.all(
    names.map((n, i) =>
      sharp({
        create: {
          width: 800,
          height: 632,
          channels: 3,
          background: { h: (i * 37) % 360, s: 55, l: 60 },
        },
      })
        .jpeg()
        .toFile(`${SRC}/${n}.jpg`),
    ),
  );
  files = readdirSync(SRC);
}

for (const file of files) {
  const name = basename(file, extname(file));
  for (const w of WIDTHS) {
    const img = () => sharp(`${SRC}/${file}`).resize({ width: w });
    await Promise.all([
      img().avif({ quality: 50 }).toFile(`${OUT}/${name}-${w}.avif`),
      img().webp({ quality: 75 }).toFile(`${OUT}/${name}-${w}.webp`),
      img()
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(`${OUT}/${name}-${w}.jpg`),
    ]);
  }
  console.log('✔', name);
}
