const JPGE = 'application/jpg';
const MP4 = 'application/mp4';

function getType(type) {
    switch (type) {
        case 'jpg':
            return JPGE;
        case 'mp4':
            return MP4;
        default:
            break;
    }
}


function base64ToArrayBuffer(base64) {
    let binary_string = window.atob(base64);
    let len = binary_string.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export function getUrl(data, type) {
    let formatType = getType(type);
    let buffer = base64ToArrayBuffer(data);
    const blob = new Blob([buffer], {
        type: formatType,
    });
    const url = URL.createObjectURL(blob);
    return url;
}