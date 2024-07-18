import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const showNotification = (title, message, type) => {
  if (Store && typeof Store.addNotification === "function") {
    Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  } else {
    console.error(
      "Error: Unable to access store or store.addNotification is not a function."
    );
  }
};

export default showNotification;
