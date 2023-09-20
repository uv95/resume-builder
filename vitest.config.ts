/// <reference types="vitest" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'happy-dom',
    },
    resolve: {
        alias: [{ find: "@", replacement: resolve (__dirname, "./src") }]
    }})

