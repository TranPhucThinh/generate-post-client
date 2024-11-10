// vite.config.ts
import { defineConfig } from "file:///F:/Work/auto-generate-content/node_modules/vite/dist/node/index.js";
import react from "file:///F:/Work/auto-generate-content/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "F:\\Work\\auto-generate-content";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 3e3
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/styles/variables.scss" as *;'
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src/"),
      components: `${path.resolve(__vite_injected_original_dirname, "./src/components/")}`,
      public: `${path.resolve(__vite_injected_original_dirname, "./public/")}`,
      pages: path.resolve(__vite_injected_original_dirname, "./src/pages"),
      types: `${path.resolve(__vite_injected_original_dirname, "./src/@types")}`
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxXb3JrXFxcXGF1dG8tZ2VuZXJhdGUtY29udGVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcV29ya1xcXFxhdXRvLWdlbmVyYXRlLWNvbnRlbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L1dvcmsvYXV0by1nZW5lcmF0ZS1jb250ZW50L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwXG4gIH0sXG4gIGNzczoge1xuICAgIGRldlNvdXJjZW1hcDogdHJ1ZSxcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQHVzZSBcIi4vc3JjL3N0eWxlcy92YXJpYWJsZXMuc2Nzc1wiIGFzICo7J1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy8nKSxcbiAgICAgIGNvbXBvbmVudHM6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzLycpfWAsXG4gICAgICBwdWJsaWM6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3B1YmxpYy8nKX1gLFxuICAgICAgcGFnZXM6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9wYWdlcycpLFxuICAgICAgdHlwZXM6IGAke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9AdHlwZXMnKX1gXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUSxTQUFTLG9CQUFvQjtBQUM1UyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsY0FBYztBQUFBLElBQ2QscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsUUFBUTtBQUFBLE1BQ3JDLFlBQVksR0FBRyxLQUFLLFFBQVEsa0NBQVcsbUJBQW1CLENBQUM7QUFBQSxNQUMzRCxRQUFRLEdBQUcsS0FBSyxRQUFRLGtDQUFXLFdBQVcsQ0FBQztBQUFBLE1BQy9DLE9BQU8sS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUM1QyxPQUFPLEdBQUcsS0FBSyxRQUFRLGtDQUFXLGNBQWMsQ0FBQztBQUFBLElBQ25EO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
