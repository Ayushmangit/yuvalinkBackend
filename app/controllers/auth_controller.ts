import User, { UserRole } from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  async register({ request }: HttpContext) {
    const { fullName, email, password } = request.only([
      'fullName',
      'email',
      'password',
    ])

    const user = await User.create({
      fullName,
      email,
      password,
      role: UserRole.VOLUNTEER,
    })

    const token = await User.accessTokens.create(user)

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName
      },
      token: token.value!.release(),
    }
  }

  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        status: user.status
      },
      token: token.value!.release(),
    }
  }

  async me({ auth }: HttpContext) {
    await auth.use('api').authenticate()
    return {
      user: {
        id: auth.user!.id,
        email: auth.user!.email,
        role: auth.user!.role,
        fullName: auth.user!.fullName,
        status: auth.user!.status,
        verification: auth.user!.verification,
        tier: auth.user!.tier,
      },
    }
  }

  async logout({ auth }: HttpContext) {
    await auth.use('api').authenticate()
    return { message: 'Logged out' }
  }
}
