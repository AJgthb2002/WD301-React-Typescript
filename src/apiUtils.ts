import { ApiForm, formfield, PaginationParams } from "./formTypes";

const API_BASE_URL="https://tsapi.coronasafe.live/api/"

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export const request= async (endpoint:string, method : RequestMethod = "GET", data:any ={})=>{
  let url;
  let payload: any;
    if(method==="GET"){
        const requestParams = data
      ? `?${Object.keys(data)
        .map((key) => `${key}=${data[key]}`)
        .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = null;
    }
    else {
        url = `${API_BASE_URL}${endpoint}`;
        payload = data ? JSON.stringify(data) : "";
      }

    // const auth = "Basic" + window.btoa("AnanyaJ:gruffycat");

    //token auth
  const token = localStorage.getItem("token");

  const auth = token ? `Token ${token}` : "";

    try{
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json;",
          Authorization: auth,
        },
        body: method !== "GET" ? payload : null
      });

    if (response.ok) {
    const jsondata = await response.json();
    return jsondata
    }  
    else{
    const jsonerror = await response.json();
    throw Error(jsonerror) 

    }
}catch(error){
    return error
}
}

export const createForm = (form: ApiForm) => {
    return request("forms/", "POST", form);
  };

export const login = (username: string, password: string) => {
return request("auth-token/", "POST", {
    username: username,
    password: password,
});
};

export const me = () => {
    return request("users/me/", "GET");
  };
  
export const list_forms = () => {
return request("forms/", "GET");
};  

export const getForm = (id: number) => {
  return request(`forms/${id}`, "GET");
};

export const putForm = (id: number, payload: {
  title: string,
  description?: string,
  is_public?: boolean,
}) => {
  return request(`forms/${id}/`, "PUT", payload);
}

export const deleteForm = (id: number) => {
  return request(`forms/${id}/`, "DELETE");
}

//formFields
export const getFormFields = (form_pk: number) => {
  return request(`forms/${form_pk}/fields/`, "GET")
}

export const postFormField = (form_pk: number, payload: formfield) => {
  return request(`forms/${form_pk}/fields/`, "POST", payload)
}

export const putFormField = (form_pk: number, id: number, payload: formfield) => {
  return request(`forms/${form_pk}/fields/${id}/`, "PUT", payload)
}

export const patchFormField = (form_pk: number, id: number, payload: Partial<formfield>) => {
  return request(`forms/${form_pk}/fields/${id}/`, "PATCH", payload)
}

export const deleteFormField = (form_pk: number, id: number) => {
  return request(`forms/${form_pk}/fields/${id}/`, "DELETE")
}