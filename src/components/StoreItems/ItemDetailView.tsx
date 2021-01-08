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
    this.setState({ itemName: this.props.storeItem.itemName })
  }

  componentDidMount = () => {
    this.getItemDetails();
  }
  
  render() {
    return (
      
      <div>
        {console.log(this.props.storeItem.itemName)}
        <p>{this.state.itemName}</p>
      </div>
    );
  }
}

export default ItemDetailView;