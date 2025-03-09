import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotifyProps {
  status?: {
    message?: string;
    success?: boolean | 'load';
    // Add any other properties you expect in status
  };
  className?: string;
}

const Notify: React.FC<NotifyProps> = ({ status = {}, className = '' }) => {
  const notify = React.useCallback(() => {
    if (status.message) {
      if (status.success === 'load') {
        const toastId = toast.loading(status.message);
        setTimeout(() => {
          toast.dismiss(toastId);
        }, 3000);
      } else if (status.success === true) {
        toast.success(status.message);
      } else if (status.success === false) {
        toast.error(status.message);
      } else {
        toast(status.message);
      }
    }
  }, [status]);

  useEffect(() => {
    if (status && status.message) {
      notify();
    }
  }, [status, notify]);

  return (
    <>
      <ToastContainer className={className} />
    </>
  );
};

export default Notify;
