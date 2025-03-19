import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  globalCss: {
    "html, body": {
     backgroundColor: '#0C1A22'
   }
  },
})

export const system = createSystem(defaultConfig, customConfig)