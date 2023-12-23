import { defineConfig, loadEnv } from 'vite';
import { cwd } from 'process'
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env: Partial<ImportMetaEnv> = loadEnv(mode, cwd())

  const rootDirectory = cwd()

  // ensure both properties and nested properties are in ascending order
  return {
    build: {
      outDir: 'build',
      sourcemap: env.VITE_GENERATE_SOURCEMAP
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@assets': `${rootDirectory}/src/assets`,
        '@components': `${rootDirectory}/src/components`,
        '@hooks': `${rootDirectory}/src/hooks`,
        '@providers': `${rootDirectory}/src/providers`,
        '@services': `${rootDirectory}/src/services`,
        '@utils': `${rootDirectory}/src/utils`
      }
    },
    server: {
	    hmr: {
        overlay: true
      }
    },
  }
});
