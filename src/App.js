import React, { Component, PropTypes } from 'react';
import { Well } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { inspect } from 'util';

import store from "./rdx/index";
import { modifyStage } from "./rdx/actions/index";

import { CartItem } from "./components/CartItem";
import { Product } from "./components/Product";

import styles from "./assets/css/style.css";
let { submitBtnStyle } = require("./styles/styles");

import NumberFormat from 'react-number-format';

var PRODUCTS = require('./data/products.json');
const CircularJSON = require('circular-json');


class App extends Component {
  	
	onSubmit() {

		// If we are on last page, exit.
		if (this.props.nStage == 2) {
			return;
		}

		if (this.props.fTotalPrice < 1) {
			return;
		}

		store.dispatch(
			modifyStage({
				value: '1'
			})
		);
		this.forceUpdate();
	}	

	validateFields() {
		//TODO: Validate fields per the design document
		return true;
	}

	onSubmitCheckout() {

		let fields = {
			firstname: this.refs.firstname,
			lastname: this.refs.lastname,
			address: this.refs.address,
			email: this.refs.email,
			password: this.refs.password,
			password2: this.refs.password2
		};
		
		if (this.validateFields()) {
			// Fields are properly filled in

			// Uncomment to go to Stage 3; right now Stage 3 hasn't been coded.
			/*
			store.dispatch(
				modifyStage({
					value: '1'
				})
			);
			this.forceUpdate();
			*/
			axios
			.post("https://postman-echo.com/post", { fields })
			.then((response) => {
				console.log("Response: " + inspect(response));
			})
			.catch((error) => {
				let jsonError = CircularJSON.stringify(error);
				console.log("Error: " + jsonError);
			});			
		}
	}	

	onBack() {

		// If we are on first page, exit.
		if (this.props.nStage == 1) {
			return;
		}

		store.dispatch(
			modifyStage({
				value: '-1'
			})
		);
		this.forceUpdate();
	}	
	
  render() {
	  console.log("In Render: " + JSON.stringify(this.props));

	let cartItems = "";
	  
	cartItems = this.props.cartContents.map(
      (product) =>
      <CartItem key={product.id} product={product}></CartItem>
    );
	  
	  if (cartItems.length < 1) {
		  cartItems = "(empty)";
	  }
	  
	  let availableProducts = "";

	  if (PRODUCTS != null) {
		  availableProducts = PRODUCTS.map(
			  (product) =>
				  <Product key={product.id} product={product}></Product>
		  );
	  }

	  if (this.props.nStage == 1) {
		  return (
			  <div className={styles.bpApp}>
				  <br />
				  <div className="appTitle">
					  <h1>Email Products</h1>
				  </div>
				  <hr></hr>
				  <div>
					  {availableProducts}
				  </div>
				  <div className="appTitle">
					  <h1>Shopping Cart</h1>
				  </div>
				  <Well>
					  <div className={styles.bpDiv}>
						  {cartItems}
						  <hr></hr>
 					  	<div className={styles.bpItems}>
  						</div>
						<div className={styles.totalPrice}>
							$<NumberFormat value={this.props.fTotalPrice} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={''} />
						</div>
					  </div>
				  </Well>
				  <div style={submitBtnStyle}>
					  <button className="btn btn-error-custom whiteText" type="button" onClick={this.onBack.bind(this)}> Go Back </button>
					  <button className="btn btn-info-custom whiteText" type="button" onClick={this.onSubmit.bind(this)}> Submit </button>
				  </div>
			  </div>
		  );
	  }
	  else if (this.props.nStage == 2) {
		return (
			<div className={styles.bpApp}>
				<br />
				<div className="appTitle">
					<h1>Checkout</h1>
				</div>
				<hr></hr>
				<Well>
					<div className={styles.bpDiv}>
						{cartItems}
						<hr></hr>
						<div className={styles.bpItems}>
						</div>
						<div className={styles.totalPrice}>
							$<NumberFormat value={this.props.fTotalPrice} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={''} />
						</div>
					</div>
				</Well>
				<br />
				<div className={styles.containerForm}>
					<div className={styles.innerContainer}>
						<div className={styles.formStyle}>
							<div className={styles.inputStyle}><input ref="firstname" type="text" class="form-control" placeholder="First Name"></input></div>
							<div className={styles.inputStyle}><input ref="lastname" type="email" class="form-control" placeholder="Last Name"></input></div>
							<div className={styles.inputStyle}><input ref="address" type="email" class="form-control" placeholder="Address"></input></div>
						</div>
						<div className={styles.formStyle}>
							<div className={styles.inputStyle}><input className={styles.inputStyle} ref="email" type="text" class="form-control" placeholder="Email Address"></input></div>
							<div className={styles.inputStyle}><input className={styles.inputStyle} ref="password" type="email" class="form-control" placeholder="Password"></input></div>
							<div className={styles.inputStyle}><input className={styles.inputStyle} ref="password2" type="email" class="form-control" placeholder="Confirm Password"></input></div>
						</div>
					</div>
				</div>

				<div style={submitBtnStyle}>
				<button className="btn btn-error-custom whiteText" type="button" onClick={this.onBack.bind(this)}> Go Back </button>
					<button className="btn btn-info-custom whiteText" type="button" onClick={this.onSubmitCheckout.bind(this)}> Submit </button>
				</div>
			</div>
		);
	  }
  }
}

const mapStateToProps = state => {
  return {
	cartContents: state.cartContents,
	nStage: state.nStage,
	fTotalPrice: state.fTotalPrice
  };
};
export default App = connect(mapStateToProps)(App);
