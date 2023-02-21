import { toast, ToastOptions } from 'react-toastify';

interface ToastType extends ToastOptions {
  id?: React.ReactText;
  message?: string;
}

export const toastCustomStyle = {
  fontSize: 13,
};

export const createLoadingToast = (message?: string) => {
  return toast.loading(message || 'Loading...');
};

export const dismissToast = (id: React.ReactText) => {
  toast.dismiss(id);
};

export const updateToast = (props: ToastType) => {
  if (props.id) {
    toast.update(props.id, {
      render: props.message || 'Oh! something went wrong...',
      type: props.type || 'error',
      isLoading: false,
      closeOnClick: true,
      hideProgressBar: false,
      autoClose: 5000,
      closeButton: true,
    });
  }
};

export const showToast = (props: ToastType) => {
  toast(props.message || 'Oh! something went wrong...', {
    type: props.type,
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    closeButton: true,
    onClick: props.onClick,
  });
};
