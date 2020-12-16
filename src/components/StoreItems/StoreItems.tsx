import React from 'react';
import StoreItemsList from './StoreItemsList';

type ItemsProps = {
  sessionToken: any;
}

type ItemState = {
  setStoreItems: any
}

export default class StoreItems extends React.Component<ItemsProps, ItemState> {
  // setStoreItems: any;
  // fetchItems: any;

  constructor (props: ItemsProps) {
    super(props);
    this.state = {
      
      setStoreItems: ''
    }
  }

  fetchStoreItems = () => {
    fetch('http://localhost:8080/listing/', {
      method: 'GET'
    })
      .then(r => r.json())
      .then(rArr => this.state.setStoreItems(rArr))
  }

  render() {
    return (
      <div>
        {/* <StoreItemsList sessionToken={this.setState} fetchStoreItems={this.fetchStoreItems} storeItems={this.state.setStoreItems} /> // this.state.setStoreItems */}
        {/* // fetchItems={this.fetchItems} */}
        
      </div>
    )
  }
}