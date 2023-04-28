import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    id: '',
    fullName: '',
    firstName: '',
    lastName: '',
    token: '',
    avatar: '',
    address: '',
    phone: '',
    email: '',
    role: '',
    refId: '',

    numberOfCart: 0,
    totalPriceOfCart: 0
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state = { ...action.payload };
        },
        setUserUpdate: (state, action) => {
            const user = action.payload;
            state.id = user._id;
            state.fullName = user.firstName + ' ' + user.lastName;
            state.firstName = user.firstName;
            state.lastName = user.lastName;
            state.avatar = user.avatar;
            state.address = user.address;
            state.phone = user.phone;
            state.email = user.email;
            state.role = user.role;
        },

        setUserLogin: (state, action) => {
            if (action.payload.result && action.payload.result.user) {
                const { user, accessToken, refId } = action.payload.result;
                state.id = user._id;
                state.fullName = user.firstName + ' ' + user.lastName;
                state.firstName = user.firstName;
                state.lastName = user.lastName;
                state.avatar = user.avatar;
                state.address = user.address;
                state.phone = user.phone;
                state.email = user.email;
                state.role = user.role;
                if (accessToken && refId){
                    state.token = accessToken;
                    state.refId = refId;
                }

            }
        },

        setToken: (state, action) => {
            state.token = action.payload.newAccessToken;
        },
        setNumberOfCart: (state, action) => {
            state.numberOfCart = action.payload;
        },
        setTotalPriceOfCart: (state, action) => {
            state.totalPriceOfCart = action.payload;
        },
        resetCart: (state) => {
            state.numberOfCart = 0;
            state.totalPriceOfCart = 0;
        },

        resetUserState: (state) => initialState,

    },
});

// Action creators are generated for each case reducer function
export const { setUserUpdate, setUserLogin, setToken, resetUserState, setNumberOfCart, setTotalPriceOfCart, resetCart } = UserSlice.actions;

export default UserSlice.reducer;
