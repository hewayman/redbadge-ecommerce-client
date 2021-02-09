import React from 'react';
import Item from './Item';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';

type StoreItemsProps = {
  searchItems: any;
  fetchStoreItems: any;
  adminStatus: boolean;
  sessionToken: string;
  updateItemId: any;
  updateItem: any;
  addToCart: any;
  storeItemObj: any;
}

class StoreItemsSearch extends React.Component<StoreItemsProps> {

  render() {
    return (
      <div>
        <Container maxWidth="lg" style={{ marginTop: "6em", marginBottom: '4em' }}>
          <Grid container spacing={2} alignItems="center">
            {this.props.searchItems.map((itemObj: any, i: number) => 
              <Item
                item={itemObj}
                key={i}
                adminStatus={this.props.adminStatus}
                sessionToken={this.props.sessionToken}
                fetchStoreItems={this.props.fetchStoreItems}
                updateItemId={this.props.updateItemId}
                updateItem={this.props.updateItem}
                addToCart={this.props.addToCart}
                storeItemObj={this.props.storeItemObj} />)}
          </Grid>
        </Container>
      </div>

    )
  }
}

export default StoreItemsSearch;