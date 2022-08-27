import { DataSource } from 'typeorm'

export const postgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'for-donation',
  username: 'postgres',
  password: 'secret',
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
