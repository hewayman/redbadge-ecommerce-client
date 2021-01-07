import React, { Component } from 'react';
import Container from '@material-ui/core/Container'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

type FilterProps = {
  sort: any;
  handleChangeSort: any;
}

class FilterItems extends React.Component<FilterProps> {
  render() {
    return (
      <Container maxWidth="lg">
          <InputLabel id="demo-simple-select-outlined-label" style={{float:'right', margin:'0em 1em 0.5em 0em'}}>Sort By
            <Select label="Sort" className="form-control" value={this.props.sort} onChange={this.props.handleChangeSort} style={{marginLeft:'0.6em'}}>
              <MenuItem value="">Most Relevant</MenuItem>
              <MenuItem value="lowest">Price, low to high</MenuItem>
              <MenuItem value="highest">Price, high to low</MenuItem>
            </Select>
          </InputLabel>
      </Container>
    );
  }
}

export default FilterItems;