import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
dotenv.config()

// https://vitejs.dev/config/
export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    plugins: [react()],
    server: {
      port: 3000
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          additionalData: '@use "./src/styles/variables.scss" as *;'
        }
      }
    },
    define: {
      'process.env.REACT_APP_URL': JSON.stringify(env.REACT_APP_URL)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
        components: `${path.resolve(__dirname, './src/components/')}`,
        public: `${path.resolve(__dirname, './public/')}`,
        pages: path.resolve(__dirname, './src/pages'),
        types: `${path.resolve(__dirname, './src/@types')}`
      }
    }
  })
}
