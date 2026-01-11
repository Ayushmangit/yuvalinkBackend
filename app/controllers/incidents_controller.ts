import type { HttpContext } from '@adonisjs/core/http'
import Incident from '#models/incident'

export default class IncidentsController {
  async index({ response }: HttpContext) {
    const incidents = await Incident.query()

    return response.ok(incidents)
  }

  async create({ request, response }: HttpContext) {
    const payload = request.only([
      'name',
      'city',
      'volunteers',
      'description',
    ])

    const incident = await Incident.create(payload)

    return response.created({
      message: 'Incident created successfully',
      incident,
    })
  }

  async updateIncident({ request, response, params }: HttpContext) {
    const payload = request.only([
      'name',
      'city',
      'volunteers',
      'description',
      'status'
    ])

    const incident = await Incident.find(params.id)

    if (!incident) {
      return response.notFound({
        message: 'Incident not found',
      })
    }

    incident.merge(payload)
    await incident.save()

    return response.ok({
      message: 'Incident updated successfully',
      incident,
    })
  }
}
