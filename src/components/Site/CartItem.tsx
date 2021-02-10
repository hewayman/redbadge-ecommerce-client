import { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { StoreItem } from '../../types'

type CartItemProps = StoreItem & {removeFromCart: (num1: number) => void}

export default class CartItem extends Component<CartItemProps> {

  render () {
    return (
      <Grid container direction="row" spacing={3} alignItems="center">
        <Grid item xs={12} md={3} style={{ marginTop:'40px', paddingBottom:'0' }}>
          {this.props.imgURL ? 
            <CardMedia
              image={`/assets/${this.props.imgURL}.jpg`}
              title="Listing img"
              style={{height: 5, width: '60%', paddingTop: '35%'}}
            />
          : null}
        </Grid>
        <Grid item xs={12} sm={3} style={{ paddingTop:'0', paddingBottom:'0' }}>
          <Typography variant="body2" component="h2" style={{padding:'0.4em 0 0 0', fontFamily:'Montserrat', fontWeight:900, fontSize:'1em', textTransform:"capitalize", color:'black'}}>
            {this.props.itemName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} style={{ paddingTop:'0', paddingBottom:'0' }}>
          <Typography variant="body2" component="h2" style={{padding:'0.4em 0 0 0', fontFamily:'Montserrat', fontWeight:900, fontSize:'1em', color:'black'}}>
            ${this.props.price.toLocaleString()} x {this.props.count}
          </Typography> 
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            style={{ fontFamily:'Open Sans' }}
            className="submitRemoveFromCart" 
            onClick={() => this.props.removeFromCart(this.props.id)}>
            Remove
          </Button>
        </Grid>
      </Grid>
    )
  }
}