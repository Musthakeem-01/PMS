async function getData(url, param) {
  try {
    // const userparam = {
    //   UserID_int: 0,
    // };
    const modifiedParam = {
      ...param,
      data: {
        ...param.data,
        // ...userparam,
      },
    };

    const response = await fetch_nst_post(url, modifiedParam);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetch_nst_post(api, body) {
  try {
    let url = "https://smartfm.in/NSEIPLSERVICE/" + api;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        UserID: localStorage.getItem("userid"),
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getData;

export { fetch_nst_post };
