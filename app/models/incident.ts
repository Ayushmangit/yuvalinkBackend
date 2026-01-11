import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'

export default class Incident extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare city: string

  @column()
  declare status: boolean

  @hasMany(() => AssignedVolunteer)
  public assignedVolunteers: relations.HasMany<typeof AssignedVolunteer>

  @hasMany(() => PendingRequest)
  public pendingRequests: relations.HasMany<typeof PendingRequest> | undefined
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
