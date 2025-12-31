import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  async register({ request }: HttpContext) {
    const payload = request.body()
    const user = await User.create(payload)
    const token = await User.accessTokens.create(user)
    return {
      user,
      token: token.value!.release(),
    }
  }

  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return {
      user,
      token: token.value!.release(),
    }
  }

  async me({ auth }: HttpContext) {
    await auth.use('api').authenticate()
    return {
      user: auth.user,
    }
  }

  async logout({ auth }: HttpContext) {
    await auth.use('api').authenticate()

    return { message: 'Logged out' }
  }

}
