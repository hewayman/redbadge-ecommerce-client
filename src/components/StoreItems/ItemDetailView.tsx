import React, { Component } from 'react';

type ItemProps = {
  itemName: any;
}

class ItemDetailView extends Component<ItemProps> {
  constructor (props: ItemProps) {
    super(props);
    this.state = {
    } 
  }
  
  render() {
    return (
      
      <div>
        {console.log(this.props.itemName)}
        <p>Test</p>
      </div>
    );
  }
}

export default ItemDetailView;