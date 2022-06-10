import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [ vue(), vueJsx() ],
    resolve: {
        alias: {
            '@': resolve('src')
        }
    },
    server: {
        port: 11111
    },
    build: {}
})
