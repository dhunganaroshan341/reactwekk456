import api from "./api";


export const register = (data: any) => {

    return api.post("/register", data);

}



export const login = (data: any) => {

    return api.post("/login", data);

}