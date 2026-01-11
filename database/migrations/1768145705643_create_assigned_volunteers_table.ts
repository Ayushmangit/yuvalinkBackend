
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AssignedVolunteers extends BaseSchema {
  protected tableName = 'assigned_volunteers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('incident_id').unsigned().notNullable().references('id').inTable('incidents').onDelete('CASCADE')
      table.integer('volunteer_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('assigned_at').defaultTo(this.now())

      table.unique(['incident_id', 'volunteer_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

