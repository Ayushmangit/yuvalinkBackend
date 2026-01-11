
import Incident from '#models/incident'
import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class IncidentsController {
  async store({ request, response }: HttpContext) {
    const payload = request.only([
      'name',
      'city',
      'description'
    ])

    // Create incident (active by default)
    const incident = await Incident.create({
      name: payload.name,
      city: payload.city,
      status: true, // active immediately
    })

    // Create related task
    await Task.create({
      incidentId: incident.id,
      startTime: new Date(),
    })

    return response.created({
      message: 'Incident and task created successfully',
      incident,
    })
  }
}


