// import { createSlice } from '@reduxjs/toolkit';
// const loginSlice = createSlice({
//     name:'login',
//     initialState:{
//         username:null,
//         password:null,
//         isLogin:false
//     },
//     reducers:{
//         loginUser: (state, action) => {
//             state.username = action.payload;
//             state.isLogin = true;
//           },
//           logoutUser: (state) => {
//             state.username = null;
//             state.isLogin = false;
//           },
      
//     }
// }) ;

// export const { loginUser, logoutUser } = loginSlice.actions;
// export const selectUsername = (state) => state.login.username;
// export const selectIslogin = (state) => state.login.isLogin;
// export default loginSlice.reducer;