import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_FAIL,
} from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'
import api from '../utils/api'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    // Get user info from state
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await api.post('/api/orders', order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    })
    localStorage.removeItem('cartItems')
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const { data } = await api.get(`/api/orders/${id}`)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    const { data } = await api.put(`/api/orders/${orderId}/pay`, paymentResult)

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    })
  }
}

export const deliverOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const { data } = await api.put(`/api/orders/${order._id}/deliver`, {})

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message,
    })
  }
}

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const { data } = await api.get('/api/orders/myorders')

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const { data } = await api.get('/api/orders')

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    })
  }
}

export const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CANCEL_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await api.put(`/api/orders/${orderId}/cancel`, {}, config)

    dispatch({
      type: ORDER_CANCEL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CANCEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
