export const useGetUserInfo = () =>{

    //---

    // //convert user info back to an object from a string in localStorage
    const {name, profilePhoto, userId, isAuth} = 
        JSON.parse(localStorage.getItem("auth")) || {};

    //---

    //return data separately for ease of retrival...
    return{name, profilePhoto, userId, isAuth};

};//end useGetUserInfo