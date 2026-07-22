import { createServer } from 'node:http'
import { env } from './config/env.js'
import { handleRoutes } from './routes/index.js'

const app = createServer((request, response) => {
  handleRoutes(request, response, env)
})

export default app
