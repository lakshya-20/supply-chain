import { toast } from "react-toastify";
const Toast = (type, message) => {
  if (type === 'success'){
    return toast.success(message);
  }
  else if (type === 'error'){
    return toast.error(message);
  }
  else if(type === 'warning'){
    return toast.warning(message);
  }
}
export default Toast;