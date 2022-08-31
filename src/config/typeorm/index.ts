import 'dotenv/config'
import { DataSource } from 'typeorm'

const postgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: process.env.POSTGRES_PORT as number | undefined,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/shared/typeorm/migrations/*.ts']
})

postgresDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

export { postgresDataSource }
