import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import Task from './task.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class TaskAssignment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare taskId: number

  @column()
  declare userId: number

  @column()
  declare status: string

  @column()
  declare respondedAt: Date

  @belongsTo(() => User)
  declare user: relations.BelongsTo<typeof User>

  @belongsTo(() => Task)
  declare task: relations.BelongsTo<typeof Task>
}

