import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

import NumberFormat from 'react-number-format';

import styles from "../assets/css/style.css";
import store from "../rdx/index";

import { addCartItem, previewTotal } from "../rdx/actions/index";

let { quantityStyle } = require("../styles/styles");

export class Product extends Component {
	
	onAdd() {
		let product = this.props.product;

		if ((this.refs.quantity.value === null) ||
			(this.refs.quantity.value === 'undefined') ||
			(this.refs.quantity.value.length < 1)) {
			return;
		}

		let nQuantity = parseInt(this.refs.quantity.value);

		if (nQuantity < 1) {
			return;
		}

		console.log("Adding product " + product.name + "...");
		var addToCartPackage = {};
		addToCartPackage.id = product.id;
		addToCartPackage.name = product.name;
		addToCartPackage.price = parseFloat(product.price);
		addToCartPackage.quantity = nQuantity;
		addToCartPackage.hardQuantity = nQuantity;

		store.dispatch(
		addCartItem({
			id: addToCartPackage.id,
			name: addToCartPackage.name,
			price: addToCartPackage.price,
			quantity: addToCartPackage.quantity,
			hardQuantity: addToCartPackage.hardQuantity
		})
		);
		this.forceUpdate();
	}	

	onPreviewTotal() {
		let product = this.props.product;

		if ((this.refs.quantity.value === null) ||
			(this.refs.quantity.value === 'undefined') ||
			(this.refs.quantity.value.length < 1)) {
			return;
		}

		let nQuantity = parseInt(this.refs.quantity.value);

		if (nQuantity < 1) {
			return;
		}

		console.log("Previewing total for product " + product.name + "...");
		var addToCartPackage = {};
		addToCartPackage.id = product.id;
		addToCartPackage.name = product.name;
		addToCartPackage.price = parseFloat(product.price);
		addToCartPackage.quantity = nQuantity;
		addToCartPackage.hardQuantity = parseInt(product.quantity) || 0;

		store.dispatch(
		previewTotal({
			id: addToCartPackage.id,
			name: addToCartPackage.name,
			price: addToCartPackage.price,
			quantity: addToCartPackage.quantity,
			hardQuantity: addToCartPackage.hardQuantity
		})
		);
		this.forceUpdate();
	}	

  render() {
	  let product = this.props.product;
	  
	  return <div className={styles.panelStyle}>
	  	<Panel>
        <span>
          <span className={styles.bpItems}>
				{product.name}{" - "}
					  $<NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={''} />
					  {" "}ea.
          </span>
			  </span>
			  <br />
			  <br />
			  <div style={quantityStyle} className="input-group md-col-4">
            <input ref="quantity" type="number" onChange={this.onPreviewTotal.bind(this)} class="form-control" placeholder="Enter Quantity"></input>
            <span className="input-group-btn">
              <button className="btn btn-success-custom whiteText" type="button" onClick={this.onAdd.bind(this)}> Add </button>
            </span>
        </div>
		  </Panel>
	  </div>;
	}
}