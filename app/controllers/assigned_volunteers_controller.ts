import AssignedVolunteer from "#models/assign_volunteer"
import { HttpContext } from "@adonisjs/core/http"

export default class AssignedVolunteersController {
  public async index({ request }: HttpContext) {
    const search = request.input('search', '').toLowerCase()

    const assignedVolunteers = await AssignedVolunteer.query()
      .preload('volunteer')
      .preload('incident')

    const filtered = assignedVolunteers.filter((av) => {
      const volunteerName = av.volunteer.fullName!.toLowerCase()
      const volunteerEmail = av.volunteer.email.toLowerCase()
      const incidentName = av.incident.name.toLowerCase()
      const city = av.incident.city.toLowerCase()
      return (
        volunteerName.includes(search) ||
        volunteerEmail.includes(search) ||
        incidentName.includes(search) ||
        city.includes(search)
      )
    })

    const result = filtered.map((av) => ({
      volunteerId: av.volunteer.id,
      name: av.volunteer.fullName,
      email: av.volunteer.email,
      incident: av.incident.name,
      city: av.incident.city,
    }))

    return result
  }

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
