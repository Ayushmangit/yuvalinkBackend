import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Incident from './incident.js'
import User from './user.js'
import * as relations from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class AssignedVolunteer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare incidentId: number

  @column()
  declare volunteerId: number

  @column.dateTime({ autoCreate: true })
  declare assignedAt: DateTime

  @belongsTo(() => Incident)
  declare incident: relations.BelongsTo<typeof Incident>

  @belongsTo(() => User)
  declare volunteer: relations.BelongsTo<typeof User>
}
