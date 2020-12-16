import React from 'react';
import Item from './Item';

type ListProps = {
  sessionToken: any;
  // fetchStoreItems: any;
  storeItems: any;
}

export default class StoreItemsList extends React.Component<ListProps> {

  constructor (props: ListProps) {
    super(props);
    this.state = {
      // storeItem: this.props.storeItems,
      // fetchReviews: this.props.fetchReviews
    }
    
  }


  render() {
    // console.log(this.props.fetchStoreItems)
    return (
      <div>
        {this.props.storeItems.map((itemObj: any, i: any) => <Item item={itemObj} key={i} />)}
        {/* fetchItems={this.props.fetchItems}  */}
      </div>
    )
  }
}