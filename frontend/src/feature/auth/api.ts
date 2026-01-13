import { api } from "../../lib/api";

export type LoginPayload = { 
  email:string,
  passowrd:string
};

export const login = (data:LoginPayload) => 
      api.post("user/login", data)

