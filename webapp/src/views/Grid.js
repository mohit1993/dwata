import React from 'react';

import * as constants from 'base/constants';


const GridDash = ({ cell, limit, onLimitChange }) => (<div id="grid-dash">
  { cell ? <div className="cell-data">{cell}</div> : null }
  { <div className="grid-limit">Limit <select onChange={e => onLimitChange(e.target.value)} value={limit}>
    <option value="100">100</option>
    <option value="300">300</option>
    <option value="600">600</option>
    <option value="1000">1000</option>
    <option value="3000">3000</option>
    <option value="6000">6000</option>
  </select></div> }
</div>)


const GridPagination = ({ count, limit, offset, onPageChange }) => {
  var pages = []
  var activePage = offset / limit + 1
  if (count/limit > 10) {
    pages.push(1)
    pages.push(2)
    pages.push('...')
    pages.push(Math.floor(count/(limit*5)))
    pages.push(Math.floor(count/(limit*5) * 2))
    pages.push(Math.floor(count/(limit*5) * 3))
    pages.push(Math.floor(count/(limit*5) * 4))
    pages.push('...')
    pages.push(Math.floor(count/limit) - 1)
    pages.push(Math.floor(count/limit))
  }
  return (<div id="grid-pagination">
    <ul>{ pages.map((x, i) => <li key={i} onClick={() => onPageChange(x)} className={offset === (x - 1) * limit ? "active" : null}>{x}</li>) }</ul>
  </div>)
}


const GridRow = ({ rowID, row, onClick, onDoubleClick }) => (<tr>
  { row.map((col, i) => <td key={i} onClick={() => onClick(rowID, i)} onDoubleClick={() => onDoubleClick(rowID)}>{col}</td>) }
</tr>)


const GridHead = ({ heads, onHeadClick }) => <thead><tr>
  { heads.map((item, i) => <th key={i} onClick={ _ => onHeadClick(i) }>{ item.label }</th>) }
</tr></thead>;


export class GridView extends React.PureComponent {
  componentWillMount() {
    // this.onScroll = this.onScroll.bind(this);
    this.props.onMount();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  onScroll() {
    // In this scroll handler, we call our `onScroll` that was passed in to our Grid component.
    // Remember the `onScroll` method of this `Grid` class is different from the method that was passed to
    // this class as prop.
    // We pass the height of the grid table
    this.props.onScroll(this._table.offsetHeight)
  }

  componentDidUpdate() {
    // When this component has mounted we set a scroll handler
    // window.addEventListener('scroll', this.onScroll)
  }

  render() {
    if (this.props) {
      let { heads, results, onHeadClick, onCellClick, count,
        offset, onPageChange, onScroll, onRowDoubleClick } = this.props;

      heads = heads.toJS();
      results = results.toJS();

      return (<div className="grid-cont">
        <table className="table table-striped table-bordered table-sm" ref={ (c) => this._table = c }>
          <GridHead heads={ heads } onHeadClick={ onHeadClick } />
          <tbody>{ results.map((row, i) => <GridRow rowID={i} row={row} key={i} onClick={onCellClick} onDoubleClick={onRowDoubleClick} />) }</tbody>
        </table>
      </div>);
    } else {
      return <div className="grid-cont"></div>;
    }
  }
}