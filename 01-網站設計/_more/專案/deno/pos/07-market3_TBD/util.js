export async function getPost(ctx) {
    const body = ctx.request.body()
    if (body.type === "json") {
      let obj = await body.value
      console.log('getPost:', obj)
      return obj
    }
    return null
}
