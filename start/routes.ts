import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'
import { middleware } from './kernel.js'
import IncidentsController from '#controllers/incidents_controller'

router.group(() => {
  router.get('/', [AuthController, 'index'])
  router.post('/register', [AuthController, 'register'])
  router.post('/login', [AuthController, 'login'])
  router.get('/me', [AuthController, 'me']).use(middleware.auth())
  router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
  router.get('/test-hash', async () => {
    return 'OK'
  })
}).prefix('/auth')


router.group(() => {
  router.post('/incidents', 'IncidentsController.store')
  router.patch('/incidents/:id/activate', 'IncidentsController.activate')
}).use(middleware.auth())

router.group(() => {
  router.get('/tasks', 'TasksController.index')
  router.patch('/tasks/:id/accept', 'TasksController.accept')
  router.patch('/tasks/:id/decline', 'TasksController.decline')
}).use(middleware.auth())

router.group(() => {
  router.get('/tasks', 'TaskCrudController.index')
  router.post('/tasks', 'TaskCrudController.store')
  router.patch('/tasks/:id', 'TaskCrudController.update')
  router.delete('/tasks/:id', 'TaskCrudController.destroy')
})
  .prefix('/admin')
  .use(middleware.auth())

