import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* productSaga () {
  yield takeEvery('GET_PRODUCT', getProduct)
}; // end productSaga

const getProduct = function* () {
  try {
    const response = yield axios.get('/api/products');

    yield put({
      type: 'SET_PRODUCT_LIST',
      payload: response.data
    });
  }
  catch (err) {
    console.log(err);
  };
}; // end getProduct

export default productSaga;