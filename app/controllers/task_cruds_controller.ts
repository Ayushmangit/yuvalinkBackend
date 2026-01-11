import Task from '#models/task'
import TaskAssignment from '#models/task_assignment'
import type { HttpContext } from '@adonisjs/core/http'

export default class TaskCrudController {
  /**
   * GET /admin/tasks
   */
  async index() {
    return Task
      .query()
      .preload('incident')
      .preload('assignments', (q) => {
        q.preload('user')
      })
  }

  async store({ request, response }: HttpContext) {
    const payload = request.only([
      'title',
      'supervisor',
      'incidentId',
      'startTime',
      'userIds', // array of user IDs
    ])

    const task = await Task.create({
      title: payload.title,
      supervisor: payload.supervisor,
      incidentId: payload.incidentId,
      startTime: payload.startTime,
    })

    if (Array.isArray(payload.userIds)) {
      await TaskAssignment.createMany(
        payload.userIds.map((userId) => ({
          taskId: task.id,
          userId,
        }))
      )
    }

    return response.created({
      message: 'Task created successfully',
      task,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }

    task.merge(
      request.only(['title', 'supervisor', 'incidentId', 'startTime'])
    )

    await task.save()

    return { message: 'Task updated', task }
  }

  async destroy({ params, response }: HttpContext) {
    const task = await Task.find(params.id)

    if (!task) {
      return response.notFound({ message: 'Task not found' })
    }

    await task.delete()

    return { message: 'Task deleted' }
  }
}
