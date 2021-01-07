import React, { Component } from 'react';

type FilterProps = {
  sort: any;
  handleChangeSort: any;
  // count: number;
}

class FilterItems extends React.Component<FilterProps> {
  render() {
    return (
      <div className="row">
        <label>
          Order by
          <select className="form-control" value={this.props.sort} onChange={this.props.handleChangeSort}>
            <option value="">Select</option>
            <option value="lowest">lowest to highest</option>
            <option value="highest">highest to lowest</option>
          </select>
        </label>
      </div>
    );
  }
}

export default FilterItems;