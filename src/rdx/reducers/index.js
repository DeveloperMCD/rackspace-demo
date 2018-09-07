// src/js/reducers/index.js
import {
	ADD_PRODUCT,
	PREVIEW_TOTAL,
	MODIFY_STAGE
} from "../constants/action-types";

const initialState = {
	cartContents: [],
	fTotalPrice: 0.00,
	nStage: 1
};

const rootReducer = (state = initialState, action) => {

	let tempCart = [];
	let bProcessedPayload;
	let nNewQuantity;
	let nProductInvolved;
	let fPricePerUnit;
	let fNewTotal;
	let finalObject;

  switch (action.type) {

	  case MODIFY_STAGE:

		  // If the user typed in a value and then hit SUBMIT instead of local ADD button, let's assume they want it
		  // Hard Quantity is quantity they certainly want
		  // Quantity is the quantity they are thinking about, but haven't yet pulled the trigger on
		  state.cartContents.forEach((product) => {
			  if (product.quantity != product.hardQuantity) {
				  product.hardQuantity = parseInt(product.hardQuantity) + parseInt(product.quantity);
				  product.quantity = product.hardQuantity;
			  }
		  });
		  
		finalObject = {
		...state,
		};		  

		  finalObject.nStage = finalObject.nStage + parseInt(action.payload.value);
		  
		  return finalObject;
	  
    case ADD_PRODUCT:
      console.log("rootReducer: ADD_PRODUCT: " + JSON.stringify(action.payload) + " ,state: " + JSON.stringify(state));
		 
		  bProcessedPayload = false;
		  nNewQuantity = parseInt(action.payload.quantity);
		  nProductInvolved = action.payload.id;
		  fPricePerUnit = action.payload.price;
		  
		  // Total price of all items in cart
		  fNewTotal = 0.00;

		  state.cartContents.forEach((product) => {
			  if (nProductInvolved === product.id) {
				  product.quantity = parseInt(product.hardQuantity) + nNewQuantity;

				  if (product.quantity > 50) {
					  product.quantity = 50;
				  }

				  fNewTotal += parseFloat(product.price) * product.quantity;

				  product.hardQuantity = product.quantity;

				  bProcessedPayload = true;
			  }
			  else {
				product.quantity = parseInt(product.hardQuantity);

				if (product.quantity > 50) {
					product.quantity = 50;
				}

				product.hardQuantity = product.quantity;
				  
				fNewTotal += parseFloat(product.price) * product.quantity;
			  }

			  if (product.quantity > 0) {
				  tempCart.push(product);
			  }
		  });

		  finalObject = {};


		  if (!bProcessedPayload) {
			  tempCart.push(action.payload);			
			  fNewTotal += parseInt(action.payload.quantity) * parseFloat(action.payload.price);
		  }

			finalObject = {
				...state,
				cartContents: tempCart,
				fTotalPrice: fNewTotal
			};

      return finalObject;

	  case PREVIEW_TOTAL:
      console.log("rootReducer: PREVIEW_TOTAL: " + JSON.stringify(action.payload) + " ,state: " + JSON.stringify(state));
		 
		  bProcessedPayload = false;
		  nNewQuantity = parseInt(action.payload.quantity);
		  nProductInvolved = action.payload.id;
		  fPricePerUnit = action.payload.price;
		  
		  // Total price of all items in cart
		  fNewTotal = 0.00;

		  state.cartContents.forEach((product) => {
			  if (nProductInvolved === product.id) {
				  product.quantity = parseInt(product.hardQuantity) + nNewQuantity;

				  if (product.quantity > 50) {
					  product.quantity = 50;
				  }

				  fNewTotal += parseFloat(product.price) * (product.quantity);

				  bProcessedPayload = true;
			  }
			  else {
				product.quantity = parseInt(product.hardQuantity);

				if (product.quantity > 50) {
					product.quantity = 50;
				}

				fNewTotal += parseFloat(product.price) * product.quantity;
			  }

			  if (product.quantity > 0) {
				  tempCart.push(product);
			  }
		  });

		  finalObject = {};


		  if (!bProcessedPayload) {
			  tempCart.push(action.payload);
			  fNewTotal += parseInt(action.payload.quantity) * parseFloat(action.payload.price);
		  }

			finalObject = {
				...state,
				cartContents: tempCart,
				fTotalPrice: fNewTotal
			};

      return finalObject;

    default:
      return state;
  }

};

export default rootReducer;
