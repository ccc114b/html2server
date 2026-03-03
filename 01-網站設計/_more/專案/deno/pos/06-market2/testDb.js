import { Db } from './Db.js'

await Db.open()
await Db.userSignup({user:"ccc", password:'123', email:"ccc@gmail.com"})
await Db.userSignup({user:"snoopy", password:'321', email:"snoopy@gmail.com"})
await Db.shopSave({user:"ccc", shop:"茶舖子", address:"", tel:"", items:{'紅茶': 20, '綠茶': 20, '珍珠奶茶': 35 }, addons:{'去冰': 0, '半糖': 0, '熱': 0, '加鮮奶': 10 }})
await Db.shopSave({user:"snoopy", shop:"貓狗之家", address:"", tel:"", items:{'寄養全天': 300, '寄養半天': 200}, addons:{'含洗澡': 100}})
console.log('userList()=', await Db.userList())
console.log('shopList()=', await Db.shopList())
console.log('userGet()=', await Db.userGet('ccc'))
console.log('shopGet()=', await Db.shopGet('貓狗之家'))
console.log('userLogin(ccc, 123)=', await Db.userLogin({user:"ccc", password:'123'}))
console.log('userLogin(ccc, 333)=', await Db.userLogin({user:"ccc", password:'333'}))
await Db.close()
