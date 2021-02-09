import React from 'react';
import Container from '@material-ui/core/Container'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

type FilterProps = {
  sort: string;
  handleChangeSort: any;
}

class FilterItems extends React.Component<FilterProps> {
  render() {
    return (
      <Container maxWidth="lg" >
          <InputLabel id="demo-simple-select-outlined-label" style={{float:'right', margin:'0em 1em 0.5em 0em', fontFamily:'Open Sans'}}>Sort By
            <Select label="Sort" className="form-control" value={this.props.sort} onChange={this.props.handleChangeSort} style={{marginLeft:'0.6em', minWidth:'4em'}}>
              <MenuItem value="" style={{ fontFamily:'Open Sans' }}>Most Relevant</MenuItem>
              <MenuItem value="lowest" style={{ fontFamily:'Open Sans' }}>Price, low to high</MenuItem>
              <MenuItem value="highest" style={{ fontFamily:'Open Sans' }}>Price, high to low</MenuItem>
            </Select>
          </InputLabel>
      </Container>
    );
  }
}

export default FilterItems;