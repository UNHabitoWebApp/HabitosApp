import { useAppDispatch, useAppSelector } from "./store";
import { setUser, logoutUser } from "../store/slices/userSlices";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const updateUser = (userData) => {
        dispatch(setUser(userData));
    };

    const logout = () => {
        dispatch(logoutUser());
    };

    return { 
        updateUser, 
        logout 
    };
};

export const useUserSelectors = () => {
    const { accessToken, nombre, correo, isLoggedIn } = useAppSelector(state => state.user);

    return { accessToken, nombre, correo, isLoggedIn };
};

