import PendingRequest from "#models/pending_request"
import { HttpContext } from "@adonisjs/core/http"

export default class PendingRequestsController {
  public async store({ request }: HttpContext) {
    const data = request.only(['incidentId', 'volunteerId'])
    const requestEntry = await PendingRequest.create(data)
    return requestEntry
  }

  public async destroy({ params }: HttpContext) {
    const requestEntry = await PendingRequest.findOrFail(params.id)
    await requestEntry.delete()
    return { message: 'Pending request removed successfully' }
  }
}
