import TaskAssignment from '#models/task_assignment'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  async index({ auth }: HttpContext) {
    return TaskAssignment
      .query()
      .where('user_id', auth.user!.id)
      .where('status', 'Pending')
      .preload('task', (q) => {
        q.preload('incident')
      })
  }

  async accept({ params, auth }: HttpContext) {
    const assignment = await TaskAssignment
      .query()
      .where('task_id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    assignment.status = 'Accepted'
    assignment.respondedAt = new Date()
    await assignment.save()

    return { message: 'Task accepted' }
  }

  async decline({ params, auth }: HttpContext) {
    const assignment = await TaskAssignment
      .query()
      .where('task_id', params.id)
      .where('user_id', auth.user!.id)
      .firstOrFail()

    assignment.status = 'Declined'
    assignment.respondedAt = new Date()
    await assignment.save()

    return { message: 'Task declined' }
  }
}
