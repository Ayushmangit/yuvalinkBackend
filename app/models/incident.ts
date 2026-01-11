import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'


export enum IncidentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

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
  declare status: IncidentStatus

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
