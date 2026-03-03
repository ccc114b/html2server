const M = module.exports = {}
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const url = 'mongodb://localhost:27017'
const dbName = 'blog'
var client, db, posts, users

M.open = async function () {
  client = await MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
  db = await client.db(dbName)
  posts = await db.collection('posts')
  users = await db.collection('users')
}

M.clear = async function () {
  await posts.drop()
}

M.close = async function () {
  await client.close()
}

M.add = async function (post) {
  post.created_at = new Date()
  const r = await posts.insertOne(post)
  post._id = r.insertedId
  return post
}

M.get = async function (id) {
  const post = await posts.findOne({_id: new ObjectID(id) })
  // console.log('get: post=', post)
  return post
}

M.list = async function (query) {
  const postList = await posts.find(query).sort({ created_at: -1 }).toArray()
  // console.log('postList = ', postList)
  return postList
}

M.signup = async function (user) {
  const dbUser = await users.findOne({ name: user.name })
  console.log('dbUser=', dbUser)
  if (dbUser == null) {
    await users.insertOne(user)
    return true
  }
  return false
}

M.login = async function (user) {
  const dbUser = await users.findOne({name: user.name})
  if (dbUser == null || dbUser.password != user.password) return false
  await users.insertOne(user)
  return true
}
