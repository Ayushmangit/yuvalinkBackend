import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('supervisor').notNullable()
      table
        .integer('incident_id')
        .unsigned()
        .references('id')
        .inTable('incidents')
        .onDelete('CASCADE')
      table.enum('status', ['active', 'inactive'])
      table.timestamp('start_time').notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

