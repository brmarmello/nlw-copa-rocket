import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrap() {
  const fastify = Fastify({
   logger: true
  })

  await fastify.register(cors, {
    origin: true, // Permite que qualquer app acesse nosso backend. Posteriormente mudar o true para o domínio do Front. Ex. 'www.bm.com'
  })
  
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

    return { count }
  })

  await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ }) // host passado para que a aplicação funcione bem dentro do Android.
}

bootstrap()
