/**
 * 向上找到最近的指定组件
 * @param context
 * @param compName
 * @returns {Vue}
 */
function findComponentUpward (context, compName) {
  let parent = context.$parent
  let pName = parent.$options.name
  while (parent && (!pName || pName.indexOf(compName) < 0)) {
    parent = parent.$parent
    if (parent) {
      pName = parent.$options.name
    }
  }
  return parent
}

/**
 * 向上找到所有的指定组件
 * @param context
 * @param compName
 * @returns {Array}
 */
function findComponentsUpward (context, compName) {
  let parents = []
  let parent = context.$parent
  while (parent) {
    let pName = parent.$options.name
    if (pName === compName) {
      parents.push(parent)
    }
    parent = parent.$parent
  }
  return parents
}

/**
 * 向下找到最近的指定组件，深度优先遍历 dfs
 * @param context
 * @param compName
 * @returns {*}
 */
function findComponentDownward (context, compName) {
  let childrens = context.$children
  let children = null
  if (childrens.length) {
    for (const child of childrens) {
      if (child.$options.name === compName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, compName)
        if (children) break
      }
    }
  }
  return children
}
/**
 * 向下找到最近的指定组件，广度优先遍历 bfs
 * @param context
 * @param compName
 * @returns {*}
 */
function findComponentDownwardBFS (context, compName) {
  let childrens = context.$children
  let queue = []
  let children = null
  while (childrens.length > 0) {
    childrens.forEach(child => queue.push(child))
    let item = queue.shift()
    if (item.$options.name === compName) {
      children = item
      break
    }
    childrens = item.$children
  }
  return children
}

/**
 * 向下找到所有指定组件
 * reduce (total,currentValue, index,arr) => {}
 * @param context
 * @param compName
 */
function findComponentsDownward (context, compName) {
  return context.$children.reduce((component, child) => {
    if (child.$options.name === compName) component.push(child)
    component.concat(findComponentsDownward(child, compName))
    return component
  }, [])
}

/**
 * 找到所有的兄弟组件
 * @param context
 * @param compName
 */
function findBrothersComponents (context, compName, exceptMe) {
  let parent = context.$parent
  let brothers = parent.$children.filter(item => item.$options.name === compName)
  if (exceptMe) {
    let index = brothers.findIndex(item => item._uid === context._uid)
    brothers.splice(index, 1)
  }
  return brothers
}

export default {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentDownwardBFS,
  findComponentsDownward,
  findBrothersComponents
}
