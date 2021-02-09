import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CartItem from './CartItem'
import { Item } from '../../types'

const TAX = 0.07

type CartProps = {
  cartItems: any;
  removeFromCart: any;
}

type CartState = {
  tax: number;
  total: number;
}

class Cart extends React.Component<CartProps, CartState> {
  constructor (props: CartProps) {
    super(props);
      this.state = {
        tax: TAX,
        total: 0
    }
  }

  setTax = (preTax: number) => {
    console.log(preTax)
    // this.setState({ taxAmount: preTax * this.state.tax})
    let tax = 0.07;
    return (preTax * tax);
  }

  render() {
    // set the preTax amount
    const preTax = (this.props.cartItems.reduce((a: any, c: any) => a + (c.price * c.count), 0));

    return (
      <Container component="main" maxWidth="lg" >
        <Link to="/" style={{textDecoration:'none', color:'black'}}>
          <ArrowBackIosIcon className="backArrow"/> 
          <Typography style={{ display:'inline', fontFamily:'Open Sans', fontSize:16, verticalAlign:'7px' }}>Back</Typography>
        </Link>
        <Container component="main" maxWidth="md" style={{minHeight: '65vh'}}>
        {/* Check to see if the cart is empty or contains items */}
          {this.props.cartItems.length === 0 ? <div style={{fontFamily:'Montserrat', fontWeight:'bold'}}>Your cart is empty.</div> : <div style={{fontFamily:'Montserrat', fontWeight:'bold'}}>You have {this.props.cartItems.length} item(s) in your cart.</div>}

          <Paper style={{ borderRadius:'0px', border:'none', borderTop:'1px solid #cccccc', marginTop:'20px'}} variant="outlined">
            {this.props.cartItems.map((item: Item, i: number) => (
              <CartItem {...item} key={i} />
            ))}
              {/* if the cart is empty, do not show the total and checkout button */}
              { this.props.cartItems.length !== 0 ?
                <Grid container direction="column" alignItems="flex-end" style={{marginTop:'50px', marginBottom:'100px', borderTop:'1px solid #cccccc'}}>
                  {/* Display the subtotal, tax amount, and total of the order */}
                  <Grid item>
                    <Typography variant="body2" component="h2" style={{padding:'0.4em 0 0 0', fontFamily:'Montserrat', fontWeight:500, fontSize:'1em', color:'black'}}>
                    Subtotal: ${preTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    <br />
                    Tax: ${this.setTax(preTax).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </Typography>
                    <Typography variant="body2" component="h2" style={{padding:'0 0 0 0', fontFamily:'Montserrat', fontWeight:'bold', fontSize:'1em', color:'black'}}>
                      Total: ${(preTax + this.setTax(preTax)).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </Typography>
                  </Grid>
                  <Grid item style={{marginTop:'10px'}}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="small"
                      style={{ fontFamily:'Open Sans' }}
                      className="submitCreate" >
                        Proceed to Checkout
                    </Button>
                  </Grid>
                </Grid>
                : null 
              }
          </Paper>
        </Container>
      </Container>
    );
  }
}

export default Cart;