import { healthController } from '../controllers/healthController.js'

export function handleRoutes(request, response) {
  if (request.url === '/api/health') {
    healthController(response)
    return
  }

  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(
    JSON.stringify({
      message: 'Route not found',
    }),
  )
}
