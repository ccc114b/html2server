function deepMerge(obj1, obj2) {
    let robj = {}
    
    for (const key in obj1) {
        robj[key] = obj1[key];
    }
    for (const key in obj2) {
        if (robj[key] == null)
            robj[key] = obj2[key]
    }
    
    return robj;
}

// 測試範例
const obj1 = {
    a: 1,
    b: { x: 10, y: 20 },
    c: 3
};

const obj2 = {
    b: { y: 50, z: 30 },
    c: 4,
    d: 5
};

console.log(deepMerge(obj1, obj2));
// 預期輸出: { a: 1, b: { x: 10, y: 50, z: 30 }, c: 4, d: 5 }
