import React from 'react';
import Item from './Item';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import FilterItems from './FilterItems';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

type ListProps = {
  sessionToken: string;
  fetchStoreItems: any;
  storeItems: any;
  adminStatus: boolean;
  updateItemId: any;
  sort: any;
  handleChangeSort: any;
  updateItem: any;
  addToCart: any;
  storeItemObj: any;
}

export default class StoreItemsList extends React.Component<ListProps> {

  render() {
    return (
      <div>
        <Container className="homeContainer" maxWidth="lg">
          <FilterItems sort={this.props.sort} handleChangeSort={this.props.handleChangeSort}/>
          <Grid container spacing={2} alignItems="center" justify='center'>
              {this.props.storeItems.map((itemObj: any, i: any) => <Grid container item xs={12} sm={6} md={4} alignItems="center" justify='center'><Item item={itemObj} key={i} adminStatus={this.props.adminStatus} sessionToken={this.props.sessionToken} fetchStoreItems={this.props.fetchStoreItems} updateItemId={this.props.updateItemId} updateItem={this.props.updateItem} addToCart={this.props.addToCart} storeItemObj={this.props.storeItemObj}/></Grid> )}
          </Grid>      
        </Container>
      </div>
    )
  }
}