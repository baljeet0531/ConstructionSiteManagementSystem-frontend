import { Cookies } from 'react-cookie';
import BACKEND from '../Constants/EnvConstants';

export async function getImage(imgPath: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    const cookieValue = new Cookies().get('jwt');
    const response = await fetch(BACKEND + `/${imgPath}`, {
        signal,
        cache: 'no-cache',
        headers: {
            Authorization: `Bearer ${cookieValue}`,
        },
        method: 'GET',
    });
    if (response.status >= 400) {
        return undefined;
    } else {
        return await response.blob();
    }
}

export async function exportFile(
    path: string,
    message: string,
    toast: Function
) {
    const cookieValue = new Cookies().get('jwt');
    fetch(BACKEND + `/${path}`, {
        cache: 'no-cache',
        headers: {
            Authorization: `Bearer ${cookieValue}`,
        },
        method: 'GET',
    })
        .then((data) => data.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const filename = path.slice(path.lastIndexOf('/') + 1);
            let fileLink = document.createElement('a');
            fileLink.href = url;
            fileLink.download = filename;
            document.body.appendChild(fileLink);
            fileLink.click();
            fileLink.remove();
            toast({
                title: message,
                description: '成功匯出',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        })
        .catch((err) => console.log(err));
}
