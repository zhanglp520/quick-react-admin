import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 3100,
    open: false,
    proxy: {
      "/dev-api/developer-tools": {
        target: "http://192.168.2.5:3000/", // 代理的目标地址-本地
        // target: "https://api.quick.ainiteam.com/", // 代理的目标地址-线上
        changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3102 代理服务会把origin修改为目标地址
        secure: true, // 是否https接
        ws: false, // 是否代理websockets
        rewrite: (path) => path.replace(/^\/dev-api\/developer-tools/, ""), // 路径重写
      },
      "/dev-api": {
        // target: "http://localhost:3101/", // 代理的目标地址-本地
        // target: "https://api.quick.ainiteam.com/", // 代理的目标地址-线上域名
        target: "http://82.156.137.92:3101/", // 代理的目标地址-线上
        changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3102 代理服务会把origin修改为目标地址
        secure: true, // 是否https接
        ws: false, // 是否代理websockets
        rewrite: (path) => path.replace(/^\/dev-api/, ""), // 路径重写
      },
    },
  },
  preview: {
    host: true,
    port: 3100,
    open: false,
    proxy: {
      "/prod-api": {
        target: "http://localhost:3101/", // 代理的目标地址-本地
        // target: 'https://api.quick.ainiteam.com/', // 代理的目标地址-线上
        changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
        secure: false, // 是否https接口
        ws: false, // 是否代理websockets
        rewrite: (path) => path.replace(/^\/prod-api/, ""), // 路径重写
      },
    },
  },
});
