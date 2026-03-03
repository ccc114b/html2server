import { Db } from './db.js'
import { getPost } from './util.js'

export const User = {}

User.login = async function (ctx) {
    let r = await getPost(ctx)
    if (await Db.userLogin(r)) {
        await ctx.state.session.set('user', r.user)
        await Db.
        ctx.response.body = "OK"
    }
}

User.logout = async function (ctx) {
    let r = ctx.state.session.get('user')
    if (r==null) {
        ctx.response.status = 401
    } else {
        await ctx.state.session.deleteSession()
        ctx.response.status = 200
    }
}

User.signup = async function (ctx) {
    let r = await getPost(ctx)
    if (await Db.userSignup(r))
        ctx.response.body = "OK"
}

User.list = async function (ctx) {
    ctx.response.body = await Db.userList()
}

User.get = async function (ctx) {
    ctx.response.body = await Db.userGet(ctx.params?.user)
}

User.orderList = async function (ctx) {
    let user = await ctx.state.session.get('user')
    console.log('user=', user)
    ctx.response.body = await Db.orderQuery('WHERE user=?', [user])
}
