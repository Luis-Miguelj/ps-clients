import { Elysia } from 'elysia'

//Rotas da aplicação
import { createClient } from '@/infra/create-client'
import { getClient } from '@/infra/get-client'
import { updateClient } from '@/infra/update-client'

const server = new Elysia().use(createClient).use(getClient).use(updateClient)

server.listen(3005, () => {
  console.log('Server is running on port 3005')
})
