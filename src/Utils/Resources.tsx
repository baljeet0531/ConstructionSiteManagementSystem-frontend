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
