// chunk(['a', 'b', 'c', 'd'], 2) => [['a', 'b'], ['c', 'd']]
// chunk(['a', 'b', 'c', 'd'], 3) => [['a', 'b', 'c'], ['d']]
export function chunk(list:any[], n:number) {
  const clist:any[] = []
  for (let i=0; i<list.length; i+=n) {
    const subList:any[] = list.slice(i, i+n)
    clist.push(subList)
  }
  return clist
}

