import React from 'react';
import Item from './Item';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import FilterItems from './FilterItems';

type ListProps = {
  sessionToken: any;
  fetchStoreItems: any;
  storeItems: any;
  adminStatus: boolean;
  updateItemId: any;
  sort: any;
  handleChangeSort: any;
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
        <Container maxWidth="lg" style={{ marginTop:"8em", marginBottom:'4em' }}>
          <FilterItems sort={this.props.sort} handleChangeSort={this.props.handleChangeSort}/>
          <Grid container spacing={2} alignItems="center">
              {this.props.storeItems.map((itemObj: any, i: any) => <Grid item xs={12} sm={6} md={4}><Item item={itemObj} key={i}adminStatus={this.props.adminStatus} sessionToken={this.props.sessionToken} fetchStoreItems={this.props.fetchStoreItems} updateItemId={this.props.updateItemId} /></Grid> )}
          </Grid>      
        </Container>
      </div>
    )
  }
}