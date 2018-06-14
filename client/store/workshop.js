import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PAIRS = 'GET_PAIRS';

/**
 * INITIAL STATE
 */
const defaultPairs = {};

/**
 * ACTION CREATORS
 */
const getWorkshopPairs = pairs => ({type: GET_PAIRS, pairs});


/**
 * THUNK CREATORS
 */
export const getPairs = () => dispatch =>
  axios
    .get('https://learn.fullstackacademy.com')
    .then(res => {
      console.log('res ', res);
      /*axios
      .get('https://learn.fullstackacademy.com/api/pairs/cohortWorkshops/5ad0ebcd5ef2840004dc2a4e', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(res => dispatch(getWorkshopPairs(res.data || defaultPairs)))
      .catch(err => console.error(err))*/
    })
    .catch(err => console.error(err));


/**
 * REDUCER
 */
export default function(state = defaultPairs, action) {
  switch (action.type) {
    case GET_PAIRS:
      return action.pairs
    default:
      return state
  }
}

