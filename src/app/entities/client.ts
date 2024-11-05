import {
  type client,
  clientSchema,
  type updateClient,
  updateClientSchema,
} from '@/types/type-client'
import { prisma } from '@/utils/prisma'

export class Client {
  async createClient(data: client) {
    const { name, city, completed, status } = clientSchema.parse(data)

    const newClient = await prisma.clients.create({
      data: {
        name,
        city,
        completed,
        status,
      },
    })

    if (!newClient) {
      return {
        error: 'Erro ao criar cliente',
      }
    }

    return {
      client: newClient,
    }
  }

  async getClients() {
    const clients = await prisma.clients.findMany()

    if (!clients) {
      return {
        error: 'Erro ao buscar clientes',
      }
    }

    return {
      clients,
    }
  }

  async updateClient(data: updateClient) {
    const { id, status, completed, updatedAt, city, name } =
      updateClientSchema.parse(data)

    const verifyClient = await prisma.clients.findUnique({
      where: {
        id,
      },
    })

    if (!verifyClient) {
      return {
        error: 'Cliente não encontrado',
      }
    }

    const update = await prisma.clients.update({
      where: {
        id,
      },
      data: {
        status,
        completed,
        updatedAt,
        city,
        name,
      },
    })

    if (!update) {
      return {
        error: 'Erro ao atualizar cliente',
      }
    }

    return {
      update_client: update,
    }
  }
}
