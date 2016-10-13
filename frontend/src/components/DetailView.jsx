import React, { PropTypes } from 'react'


const DetailView = ({ row, heads, schema }) => (heads.length ? <div className="detail-view">
  <div className="col">
    { heads.map((h, i) => (<div className="field">
      <label htmlFor={ "lb-" + h }>{ h }</label>
      <input type="text" defaultValue={ row[i] } />
    </div>)) }
  </div>
</div> : null)

export default DetailView
