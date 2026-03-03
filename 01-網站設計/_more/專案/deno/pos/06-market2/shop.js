import { Db } from './db.js'
import { getPost } from './util.js'

export const Shop = {}

Shop.orderUpload = async function (ctx) {
    let user = await ctx.state.session.get('user')
    if (user == null) {
        ctx.response.status = 401 // Unauthorized (RFC 7235)
        return
    }
    let r = await getPost(ctx)
    if (r != null) {
        for (let order of r.orders) {
            order.shop = r.shop
            await Db.orderSave(order)
        }
        ctx.response.body = "OK"
    }
}

Shop.orderList = async function (ctx) {
    ctx.response.body = await Db.orderList("")
}

Shop.save = async function (ctx) {
    let params = await getPost(ctx)
    await Db.shopSave(params)
}

Shop.get = async function (ctx) {
    ctx.response.body = await Db.shopGet(ctx.params?.shop)
}

Shop.list = async function (ctx) {
    ctx.response.body = await Db.shopList("")
}