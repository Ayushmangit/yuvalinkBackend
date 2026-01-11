
import Incident from '#models/incident'
import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class IncidentsController {
  async index() {
    const data = await Incident.query().where('status', true)
    return data
  }

  async store({ request, response }: HttpContext) {
    const payload = request.only([
      'name',
      'city',
      'description'
    ])

    const incident = await Incident.create({
      name: payload.name,
      city: payload.city,
      description: payload.description,
      status: true,
    })
    console.log(incident.id)

    await Task.create({
      incidentId: incident.id,
      title: incident.name,
      supervisor: "NDRF",
      startTime: new Date(),
    })

    return response.created({
      message: 'Incident and task created successfully',
      incident,
    })
  }
}


