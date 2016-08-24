const source = (state, action) => {
  switch (action.type) {
    case 'SOURCE_ADD':
      return {
        index: action.source[0],
        label: action.source[0],
        info: action.source[1],
        tables: []
      }

    default:
      return state
  }
}


export const sources = (state = [], action) => {
  switch (action.type) {
    case 'SOURCE_ADD':
      return [...state, source(undefined, action)]

    case 'SOURCE_ADD_MULTI':
      return [].concat(state, action.sources.map(x => source(undefined, {type: 'SOURCE_ADD', source: x})))

    case 'SOURCE_ADD_TABLES':
      return state.map(x => {
        return (x.index != action.source) ? x : Object.assign({}, x, {
          tables: action.tables.map(x => "data/" + action.source + "/" + x[0])
        })
      })

    default:
      return state
  }
}


const table = (state, action) => {
  if (action.type == 'TABLE_ADD') {
    return {
      index: "data/" + action.source + "/" + action.table[0],
      label: action.table[0],
      struct: action.table[1]
    }
  }
}

export const tables = (state = [], action) => {
  switch (action.type) {
    case 'TABLE_ADD':
      return [...state, table(undefined, action)]

    case 'TABLE_ADD_MULTI':
      return [].concat(state, action.tables.map(x => table(undefined, {type: 'TABLE_ADD', table: x, source: action.source})))

    default:
      return state
  }
}
