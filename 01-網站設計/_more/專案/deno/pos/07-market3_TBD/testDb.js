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

await Db.orderSave({user:'ccc', shop:'茶舖子', records:JSON.stringify({'紅茶':20}), totalPrice:20, time:Date.now()})
await Db.orderSave({user:'snoopy', shop:'茶舖子', records:JSON.stringify({'綠茶':20}), totalPrice:20, time:Date.now()})
await Db.orderSave({user:'ccc', shop:'茶舖子', records:JSON.stringify({'珍珠奶茶':35}), totalPrice:35, time:Date.now()})
await Db.orderSave({user:'ccc', shop:'貓狗之家', records:JSON.stringify({'寄養全天':300}), totalPrice:300, time:Date.now()})
await Db.orderSave({user:'snoopy', shop:'貓狗之家', records:JSON.stringify({'寄養半天':200}), totalPrice:200, time:Date.now()})
console.log('orderList()=', await Db.orderQuery())

await Db.close()
