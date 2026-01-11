import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Incident from './incident.js'
import User from './user.js'

export default class PendingRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare incidentId: number

  @column()
  declare volunteerId: number

  @column.dateTime({ autoCreate: true })
  declare requestedAt: DateTime

  @belongsTo(() => Incident)
  declare incident: relations.BelongsTo<typeof Incident>

  @belongsTo(() => User)
  declare volunteer: relations.BelongsTo<typeof User>
}
