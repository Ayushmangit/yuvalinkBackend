import AssignedVolunteer from "#models/assign_volunteer"
import PendingRequest from "#models/pending_request"
import { HttpContext } from "@adonisjs/core/http"

export default class PendingRequestsController {

  public async index({ auth }: HttpContext) {
    const volunteer = auth.user!
    const city = volunteer.city

    const requests = await PendingRequest.query()
      .preload('incident', (incidentQuery) => incidentQuery.where('city', city))
      .preload('volunteer')
      .where('volunteerId', volunteer.id)

    const filtered = requests.filter(req => req.incident)

    return filtered.map(req => ({
      pendingRequestId: req.id,
      incidentId: req.incident.id,
      incident: req.incident.name,
      city: req.incident.city,
      description: req.incident.description,
    }))
  }

  public async accept({ request, auth }: HttpContext) {
    const { pendingRequestId } = request.only(['pendingRequestId'])
    const volunteer = auth.user!

    const pending = await PendingRequest.findOrFail(pendingRequestId)

    const assigned = await AssignedVolunteer.create({
      incidentId: pending.incidentId,
      volunteerId: volunteer.id,
    })

    await pending.delete()

    return { message: 'Task accepted and assigned', assigned }
  }

  public async decline({ request }: HttpContext) {
    const { pendingRequestId } = request.only(['pendingRequestId'])

    const pending = await PendingRequest.findOrFail(pendingRequestId)

    await pending.delete()

    return { message: 'Task declined' }
  }
}
