import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_assignments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('task_id').unsigned()
        .references('id').inTable('tasks')
        .onDelete('CASCADE')

      table.integer('user_id').unsigned()
        .references('id').inTable('users')
        .onDelete('CASCADE')

      table
        .enum('status', ['Pending', 'Accepted', 'Declined'])
        .defaultTo('Pending')

      table.timestamp('responded_at')
      table.timestamps(true)

      table.unique(['task_id', 'user_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
