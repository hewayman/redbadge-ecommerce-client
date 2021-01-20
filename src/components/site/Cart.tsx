import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

type CartProps = {
  cartItems: any;
}

class Cart extends React.Component<CartProps> {
  // constructor (props: {}) {
  //   super(props);
  //   this.state = {
  //     cartItems: []
  //   } 
  // }

  render() {
    return (
      <Container component="main" maxWidth="lg">
          <Link to="/" style={{textDecoration:'none', color:'black'}}>
            <ArrowBackIosIcon style={{marginTop:'130px', marginRight:'-7px' }}/> 
            <Typography style={{ display:'inline', fontFamily:'Open Sans', fontSize:16, verticalAlign:'7px' }}>Back</Typography>
          </Link>
           {this.props.cartItems.length === 0 ? <div>Cart is Empty{console.log('empty cart')}</div> : <div>You have {this.props.cartItems.length} items in your cart.</div>}
           
            {this.props.cartItems.map((item: any) => (
              <Card style={{ marginTop:'2em', borderRadius:'0px', border:'none'}} variant="outlined">
                {item.imgURL ? 
                  <CardMedia
                    // className={classes.cover}
                    image={require(`../../assets/${item.imgURL}.jpg`).default}
                    title="Listing img"
                    style={{height: 5, width: '60%', paddingTop: '35%'}}
                  />
                : null}
                <Typography variant="body2" component="h2" style={{padding:'0.4em 0 0 0', fontFamily:'Montserrat', fontWeight:900, fontSize:'1em', textTransform:"capitalize", color:'black'}}>
                  {item.itemName}
                  <br/>
                  ${item.price.toLocaleString()}
                </Typography> 
              </Card>
            ))}
      </Container>
    );
  }
}

export default Cart;