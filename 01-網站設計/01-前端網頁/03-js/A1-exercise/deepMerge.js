function deepMerge(obj1, obj2) {
    if (!obj1 || typeof obj1 !== 'object') return obj2;
    if (!obj2 || typeof obj2 !== 'object') return obj1;
    
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            if (typeof obj2[key] === 'object' && obj2[key] !== null && !Array.isArray(obj2[key])) {
                obj1[key] = deepMerge(obj1[key] || {}, obj2[key]);
            } else {
                obj1[key] = obj2[key];
            }
        }
    }
    
    return obj1;
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
