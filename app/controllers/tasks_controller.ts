import Task from '#models/task'
import TaskAssignment from '#models/task_assignment'
import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  async index({ auth }: HttpContext) {
    return Task
      .query()
      .whereHas('incident', (q) => {
        q.where('city', auth.user!.city)
          .where('is_active', true)
      })
      .preload('incident')
  }
  async accept({ params, auth, response }: HttpContext) {
    const task = await Task
      .query()
      .where('id', params.id)
      .whereHas('incident', (q) => {
        q.where('city', auth.user!.city)
      })
      .first()

    if (!task) {
      return response.unauthorized()
    }

    await TaskAssignment.firstOrCreate(
      {
        taskId: task.id,
        userId: auth.user!.id,
      },
      {
        status: 'Accepted',
        respondedAt: new Date(),
      }
    )

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
