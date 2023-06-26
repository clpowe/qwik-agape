import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import presetWind from '@unocss/preset-wind'

import UnoCSS from 'unocss/vite'
import { presetIcons } from 'unocss'


export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(),UnoCSS({presets: [
        presetWind(),
        presetIcons()
      ],})],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
