import React from 'react';

type ItemProps = {
  // fetchStoreItems: any;
  item: any;
  key: any;
  // fetchItems: any;
}

export default class Item extends React.Component<ItemProps> {

  // constructor (props: ItemProps) {
  //   super(props);
  //   this.state = {
  //     // item: this.props.item,
  //     // key: this.props.key,
  //   }
  // }


  render() {
    return (
      <div>
        <h3>{this.props.item.itemName}</h3>
        
      </div>
    )
  }
}