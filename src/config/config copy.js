let service = "http://192.168.2.85:5000/";

// let service = "http://192.168.2.56:5000/"

// let service = "http://207.180.211.5:5000/"

let socketUrl = "ws://localhost:5040/";
let nodeService = "http://localhost:5040/";
async function CommonSelect_API(api, body, sp) {
  try {
    let url = service + api;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        sproc: sp ? sp : null,
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
let loadingOverlay;
function setAppLoading(e) {
  const apploadingOverlay = document.getElementById("loadingOverlay");
  if (e) {
    apploadingOverlay.classList.remove("hidden");
  } else {
    apploadingOverlay.classList.add("hidden");
  }
}

export default async function fetch_nst_post(api, body) {
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
