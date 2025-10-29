import React from 'react';
import { createProduct, filterProduct } from './productSlice.js';
import { axiosData } from '../../utils/dataFetch.js';

export const getProduct = (pid) => async(dispatch) => {
    // dispatch(filterProduct(pid));
    dispatch(filterProduct({"pid": pid}));
}

export const getProductList = () => async(dispatch) => {
    const jsonData = await axiosData("/data/mountainData.json");
    return dispatch(createProduct({"products":jsonData}));
}
