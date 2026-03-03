import { posDb } from './posDb.js'
import { getPost } from './util.js'

export const pos = {}

pos.orderUpload = async function (ctx) {
    let user = await ctx.state.session.get('user')
    if (user == null) {
        ctx.response.status = 401 // Unauthorized (RFC 7235)
        return
    }
    let r = await getPost(ctx)
    if (r != null) {
        for (let order of r.orders) {
            console.log('order=', order)
            order.shop = r.shop
            posDb.saveOrder(order)
        }
        ctx.response.body = "OK"
    }
}

pos.orderList = async function (ctx) {
    ctx.response.body = posDb.listOrder("")
}
