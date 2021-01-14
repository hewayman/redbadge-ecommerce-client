import React, { Component } from 'react';

type ItemProps = {
  storeItem: any;
}

type ItemState = {
  itemName: string;
}

class ItemDetailView extends Component<ItemProps, ItemState> {
  constructor (props: ItemProps) {
    super(props);
    this.state = {
      itemName: ''
    } 
  }

  getItemDetails = () => {
    this.setState({ itemName: this.props.storeItem.id })
        console.log(this.props.storeItem.id, 'testingdetails')
  }

  componentDidMount = () => {
    this.getItemDetails();
  }
  
  render() {
    return (
      
      <div style={{ marginTop:"6em", marginBottom:'4em' }}>
        {console.log(this.state.itemName)}
        {/* <p>{this.props.storeItem.id}</p> */}
        <p>Test</p>
      </div>
    );
  }
}

export default ItemDetailView;