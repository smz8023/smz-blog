export const setUserInfo =(data)=> (dispatch)=>{
    dispatch({
      type: "setUserInfo",
      payload: data
    })
}
