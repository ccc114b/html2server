import { posDb } from './posDb.js'
import { getPost } from './util.js'

export const user = {}

user.login = async function (ctx) {
    let r = await getPost(ctx)
    if (posDb.login(r)) {
        await ctx.state.session.set('user', r.user)
        ctx.response.body = "OK"
    }
}

user.logout = async function (ctx) {
    let r = ctx.state.session.get('user')
    if (r==null) {
        ctx.response.status = 401
    } else {
        await ctx.state.session.deleteSession()
        ctx.response.status = 200
    }
}

user.signup = async function (ctx) {
    let r = await getPost(ctx)
    if (posDb.signup(r))
        ctx.response.body = "OK"
}

user.list = async function (ctx) {
    ctx.response.body = await posDb.userList()
}
