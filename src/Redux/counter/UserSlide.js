import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  name: "",
  address: "",
  avatar: "",
  phone: "",
  id: "",
  access_token: "",
  refresh_token: "",
  city: "",
  isAdmin: true,
};

export const UserSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, payload) => {
      const accessToken = JSON.parse(localStorage.getItem("access_token"));
      const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
      const { email, name, address, avatar, phone, _id, isAdmin, city } =
        payload.payload.data;

      state.email = email;
      state.name = name || email;
      state.address = address;
      state.avatar = avatar;
      state.phone = phone;
      state.id = _id;
      state.isAdmin = isAdmin;
      state.access_token = accessToken;
      state.city = city;
      state.refresh_token = refreshToken;
    },
    resetUser: (state) => {
      state.email = "";
      state.name = "";
      state.address = "";
      state.avatar = "";
      state.access_token = "";
      state.refresh_token = "";
      state.isAdmin = false;
      state.city = "";
      state.phone = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = UserSlide.actions;

export default UserSlide.reducer;
