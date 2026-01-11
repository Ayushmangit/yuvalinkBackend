import AssignedVolunteer from "#models/assign_volunteer"
import { HttpContext } from "@adonisjs/core/http"

export default class AssignedVolunteersController {
  public async store({ request }: HttpContext) {
    const data = request.only(['incidentId', 'volunteerId'])
    const assigned = await AssignedVolunteer.create(data)
    return assigned
  }

  public async destroy({ params }: HttpContext) {
    const assigned = await AssignedVolunteer.findOrFail(params.id)
    await assigned.delete()
    return { message: 'Volunteer unassigned successfully' }
  }
}
