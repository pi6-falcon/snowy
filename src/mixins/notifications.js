import iziToast from 'izitoast';

export default (message, type, timeout = 5000) => {
    const show = iziToast;
    const options = {
        message,
        position: 'topRight',
        timeout,
        //maxWidth: 450,
        drag: false,
    };
    function notify(toast) {
        const types = {
            success: () => show.success({ title: 'Success!', ...options }),
            warning: () => show.warning({ title: 'Warning!', ...options }),
            error: () => show.error({ title: 'Error!', ...options }),
            info: () => show.info({ title: 'Information!', ...options })
        };
        return (types[toast])();
    }
    notify(type);
};
