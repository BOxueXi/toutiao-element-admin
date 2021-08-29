export const dataType = (data) => {
  const toString = Object.prototype.toString
  const typeMap = {
    '[object Object]': 'Object',
    '[object Array]': 'Array',
    '[object Function]': 'Function',
    '[object Number]': 'Number',
    '[object String]': 'String',
    '[object Null]': 'Null',
    '[object Undefined]': 'Undefined',
    '[object Boolean]': 'Boolean'
  }
  return typeMap[toString.call(data)]
}

export const getBooleanValue = (value, defaultValue) => {
  if (Object.is(value, null)) {
    return defaultValue
  }
  if (JSON.stringify(value) !== '{}') {
    return value
  } else {
    return false
  }
}
export const transferData = (data) => {
  for (const i in data) {
    if (data[i] === '') {
      delete data[i]
    } else if (typeof (data[i]) === 'object' && data[i] !== null && data[i] !== undefined) {
      data[i] = transferData(data[i])
    } else {
      if (typeof (data[i]) === 'string') {
        data[i] = data[i].trim()
      }
      continue
    }
  }
  return data
}
