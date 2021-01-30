let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:8080';
        break;
    case 'hw-ecommerce-store.herokuapp.com':
        APIURL = 'https://hw-ecommerce-server.herokuapp.com'
}

export default APIURL;