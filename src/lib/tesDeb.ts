const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function main() {
  try {
    console.log('Attempting to connect to database...')
    await prisma.$connect()
    console.log('Successfully connected to database!')
    
    const result = await prisma.$queryRaw`SELECT current_timestamp;`
    console.log('Test query result:', result)
  } catch (error) {
    console.error('Connection error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()