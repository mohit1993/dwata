import React from 'react';
import { Link } from 'react-router-dom';


const TableItem = ({ t, db }) => <div className="card sc-tbl-item">
  <div className="card-header"><Link to={ `/records/${db}/${t[0]}` }>{ t[0] }</Link></div>

  <ul className="list-group list-group-flush">
    { t[1].map((col, i) => <li className="list-group-item" key={ `col-${i}` }>
      <span className="cl-name">{ col.name }</span>
      <span className="cl-type">{ col.type }</span>
    </li>) }
  </ul>
</div>;


export class TablesView extends React.PureComponent {
  componentWillMount() {
    this.props.onMount();
  }

  render() {
    let { dataList, db, onSelect } = this.props;
    dataList = dataList.get('data').toJS();

    return <div>
      <h5>Tables ({ dataList.length })</h5>
      <div className="card-columns">
        { dataList.map((table, i) => <TableItem t={ table } key={ `tbl-${i}` } db={ db } />) }
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
    dataList = dataList.get('data').toJS();

    return <div>
      <h5>Data sources ({ dataList.length })</h5>
      <div className="list-group">
        { dataList.map((nav, i) => <Link to={ `/source/${nav[0]}/` } key={ `dt-src-${i}` }
          className="list-group-item list-group-item-action">{ nav[1].database }</Link>) }
      </div>
    </div>;
  }
}