import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Incident from './incident.js'
import TaskAssignment from './task_assignment.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare supervisor: string

  @column()
  declare incidentId: number

  @column()
  declare startTime: Date

  @belongsTo(() => Incident)
  declare incident: relations.BelongsTo<typeof Incident>

  @hasMany(() => TaskAssignment)
  declare assignments: relations.HasMany<typeof TaskAssignment>
}
