import React, { Component, PropTypes } from 'react';
import { Well} from 'react-bootstrap';

import styles from "../assets/css/style.css";

import NumberFormat from 'react-number-format';

export class CartItem extends Component {

  render() {
    var product = this.props.product;

	  if (product.quantity != product.hardQuantity) {
		  return <Well>
			  <span>
				  <div className={styles.bpItems}>
					  ({product.quantity}) of {product.name}
				  </div>
				  <div className={styles.lineItemPrice}>
					  $<NumberFormat value={parseFloat(product.price) * parseInt(product.hardQuantity)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={''} />
					  <div className={styles.lineItemAddlPrice}>
						  (+ $<NumberFormat value={parseFloat(product.price) * parseInt(product.quantity - parseInt(product.hardQuantity))} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={''} />)
						</div>
				  </div>
			  </span>
		  </Well>;
	  }

	  else {
		return <Well>
			<span>
				<div className={styles.bpItems}>
					({product.quantity}) of {product.name}
				</div>
				<div className={styles.lineItemPrice}>
					$<NumberFormat value={parseFloat(product.price) * parseInt(product.hardQuantity)} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={''} />
				</div>
			</span>
		</Well>;
		}
  
  }
}
