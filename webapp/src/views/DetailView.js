import React from 'react';


const DetailView = ({ row, heads, schema }) => (heads.length ? <div className="detail-view">
  <div className="col">
    { heads.map((h, i) => (<div className="field" key={ "dtr-" + i }>
      <label htmlFor={ "lb-" + h }>{ h }</label>
      <input id={ "lb-" + h } type="text" defaultValue={ row[i] } />
    </div>)) }
  </div>
</div> : null)

export default DetailView
