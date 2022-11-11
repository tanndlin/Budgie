export function sendRequest(path, payload, callback, errorCallback) {
    const url = `https://us-central1-cop4331-large-project-27.cloudfunctions.net/webApi/${path}`;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const { Error: err } = JSON.parse(xhr.responseText);
            if (err) {
                if (!errorCallback) {
                    console.log(`${url} threw unhandled error: ${err}`);
                } else {
                    errorCallback(err);
                }
                return;
            }

            callback(xhr);
        } else {
            errorCallback(xhr.responseText);
        }
    };

    xhr.send(JSON.stringify(payload));
}

export function sendOutsideRequest(url, payload, callback, errorCallback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

    xhr.onreadystatechange = function () {
        if (!xhr.responseText) {
            return;
        }

        if (this.readyState === 4 && this.status === 200) {
            callback(xhr);
            return;
        }

        const { error } = JSON.parse(xhr.responseText);
        if (error) {
            errorCallback(error);
        }
    };

    xhr.send(JSON.stringify(payload));
}

export function pretty(s) {
    if (!s) {
        return s;
    }

    const ret = s.replace(/_/g, ' ').toLowerCase();

    // Capitalize first letter
    return ret.charAt(0).toUpperCase() + ret.slice(1);
}
