import { LOGIN_USER } from '../actions/type'

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { loginInfo: action.payload }
        default:
            return state;
    }
}