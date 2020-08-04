import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
	currentUser: null,
};

// state = INITIAL_STATE this is a ES6 new feature which basically
// says that state argument which we pass into the userReducer function
// already equals to INITAIL_STATE value
const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload 
            }
		default:
			return state;
	}
};

export default userReducer;
