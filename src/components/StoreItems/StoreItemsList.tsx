import React from 'react';
import Item from './Item';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import FilterItems from './FilterItems';
// import ItemDetailView from './ItemDetailView';

type ListProps = {
  sessionToken: any;
  fetchStoreItems: any;
  storeItems: any;
  sort: any;
  handleChangeSort: any;
  // filteredItems: any;
  // count: number;
}

export default class StoreItemsList extends React.Component<ListProps> {

  constructor (props: ListProps) {
    super(props);
    this.state = {
    } 
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg" style={{ marginTop:"6em", marginBottom:'4em' }}>
          <FilterItems sort={this.props.sort} handleChangeSort={this.props.handleChangeSort} />
          <Grid container spacing={2} alignItems="center">
              {this.props.storeItems.map((itemObj: any, i: any) => <Grid item xs={12} sm={6} md={4}><Item item={itemObj} key={i}/></Grid> )}
          </Grid>      
        </Container>
      </div>
    )
  }
}