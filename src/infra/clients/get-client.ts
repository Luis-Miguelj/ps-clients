import { server } from '@/utils/server'
import { Client } from '@/app/entities/client'

const client = new Client()

export const getClient = server.get('/client', async () => {
  const clients = await client.getClients()

  if (clients.error) {
    return {
      error: clients.error,
    }
  }

  if (clients.clients) {
    return {
      clients: clients.clients,
    }
  }
})
