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
  router.get('/', [IncidentsController, 'index'])
  router.post('/', [IncidentsController, 'create'])
  router.patch('/:id', [IncidentsController, 'updateIncident'])
})
  .prefix('/incidents')
  .use(middleware.auth())
