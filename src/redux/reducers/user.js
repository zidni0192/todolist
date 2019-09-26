let initialState = {
    isLoading: false,
    isFullfilled: false,
    isRejected: false,
    userList: []
}
const user = (state = initialState, action) => {
    switch (action.type) {
        case "USER_FETCH_REQUESTED":
            return {
                ...state,
                isLoading: true,
                isFullfilled: false,
                isRejected: false
            }
        case "USER_FETCH_FAILED":
            console.log(action.message);
            
            return {
                ...state,
                isLoading: false,
                isRejected: true,
                isFullfilled: false
            }
        case "USER_FETCH_SUCCEEDED":
            return {
                ...state,
                isLoading: false,
                isRejected: false,
                isFullfilled: true,
                userList: action.user
            }
        default:
            return state
    }
}

export default user