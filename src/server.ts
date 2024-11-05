import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'

//Rotas da aplicação
import { createClient } from '@/infra/clients/create-client'
import { getClient } from '@/infra/clients/get-client'
import { updateClient } from '@/infra/clients/update-client'
import { createTask } from '@/infra/tasks/create-task'
import { getTasks } from '@/infra/tasks/get-tasks'
import { updateTask } from '@/infra/tasks/update-task'
import { deleteTask } from '@/infra/tasks/delete-task'

const server = new Elysia()
  .use(
    cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      origin: '*',
    })
  )
  .use(createClient)
  .use(getClient)
  .use(updateClient)
  .use(createTask)
  .use(getTasks)
  .use(updateTask)
  .use(deleteTask)

server.listen(3005, () => {
  console.log('Server is running on port 3005')
})
