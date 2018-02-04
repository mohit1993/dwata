import React from 'react';
import Immutable from 'immutable';


export class TablesView extends React.PureComponent {
  render() {
    let { dataList, onClick } = this.props;
    dataList = dataList.get('data', Immutable.List([])).toJS();

    return <div>
      <h5>Tables ({ dataList.length })</h5>
      <div className="list-group">
        { dataList.map((nav, i) => <a href={ `/schema/${nav[0]}/` } key={ `dt-src-${i}` }
          className="list-group-item list-group-item-action" onClick={ e => this.props.onSelect(e, nav) }>{ nav[0] }</a>) }
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

    return <div className="data-sources">
      <h5>Data sources ({ dataList.length })</h5>
      <div className="list-group">
        { dataList.map((nav, i) => <a href={ `/source/${nav[0]}/` } key={ `dt-src-${i}` }
          className="list-group-item list-group-item-action" onClick={ e => this.props.onSelect(e, nav) }>{ nav[1].database }</a>) }
      </div>
    </div>;
  }
}