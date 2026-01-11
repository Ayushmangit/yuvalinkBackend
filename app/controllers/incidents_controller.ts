import Incident from '#models/incident'
import Task from '#models/task'
import type { HttpContext } from '@adonisjs/core/http'

export default class IncidentsController {
  async activate({ params, response }: HttpContext) {
    const incident = await Incident.findOrFail(params.id)

    if (incident.status) {
      return response.badRequest({
        message: 'Incident already active',
      })
    }

    incident.status = true
    await incident.save()

    await Task.create({
      incidentId: incident.id,
      startTime: new Date(),
    })

    return {
      message: 'Incident activated and task created',
    }
  }
}

