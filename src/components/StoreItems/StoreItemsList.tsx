import React from 'react';
import Item from './Item';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import FilterItems from './FilterItems';
import { StoreItem } from '../../types';

interface ListProps {
  sessionToken: string;
  fetchStoreItems: () => void;
  storeItems: StoreItem[];
  adminStatus: boolean;
  updateItemId: (itemId: number) => void;
  sort: string;
  handleChangeSort: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateItem: (item: StoreItem) => void;
  addToCart: (storeItem: StoreItem) => void;
  // storeItemObj: any;
}

export default class StoreItemsList extends React.Component<ListProps> {

  render() {
    return (
      <div>
        <Container className="homeContainer" maxWidth="lg">
          <FilterItems sort={this.props.sort} handleChangeSort={this.props.handleChangeSort}/>
          <Grid container spacing={2} alignItems="center" justify='center'>
              {this.props.storeItems.map((itemObj: any, i: any) => <Grid key={i} container item xs={12} sm={6} md={4} alignItems="center" justify='center'>
                <Item 
                  item={itemObj} 
                  adminStatus={this.props.adminStatus} 
                  sessionToken={this.props.sessionToken} 
                  fetchStoreItems={this.props.fetchStoreItems} 
                  updateItemId={this.props.updateItemId} 
                  updateItem={this.props.updateItem} 
                  addToCart={this.props.addToCart} 
                // storeItemObj={this.props.storeItemObj}
              /></Grid> 
              )}
          </Grid>      
        </Container>
      </div>
    )
  }
}