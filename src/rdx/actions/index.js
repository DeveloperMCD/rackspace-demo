// src/js/actions/index.js
import {
	ADD_PRODUCT,
	PREVIEW_TOTAL,
	MODIFY_STAGE
} from "../constants/action-types";

export const addCartItem = cartItem => ({
	type: ADD_PRODUCT,
	payload: cartItem,
});
  
export const modifyStage = (value) => ({
	type: MODIFY_STAGE,
	payload: value,
});

export const previewTotal = (cartItem) => ({
	type: PREVIEW_TOTAL,
	payload: cartItem,
});