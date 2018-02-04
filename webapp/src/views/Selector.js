import React from 'react';
import Immutable from 'immutable';


const TableItem = ({ t, onSelect }) => <div className="card">
  <div className="card-header" onClick={ e => onSelect(e, t) }>{ t[0] }</div>

  <ul className="list-group list-group-flush">
    { t[1].map((col, i) => <li className="list-group-item" key={ `col-${i}` }>{ col.name } ({ col.type })</li>) }
  </ul>
</div>;


export class TablesView extends React.PureComponent {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    let { dataList, onSelect } = this.props;
    dataList = dataList.get('data', Immutable.List([])).toJS();

    return <div>
      <h5>Tables ({ dataList.length })</h5>
      <div className="card-columns">
        { dataList.map((table, i) => <TableItem t={ table } key={ `tbl-${i}` } onSelect={ onSelect } />) }
      </div>
    </div>;
  }
}


export class SourcesView extends React.PureComponent {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    let { dataList, onSelect } = this.props;
    dataList = dataList.get('data', Immutable.List([])).toJS();

    return <div>
      <h5>Data sources ({ dataList.length })</h5>
      <div className="list-group">
        { dataList.map((nav, i) => <a href={ `/source/${nav[0]}/` } key={ `dt-src-${i}` }
          className="list-group-item list-group-item-action" onClick={ e => this.props.onSelect(e, nav) }>{ nav[1].database }</a>) }
      </div>
    </div>;
  }
}