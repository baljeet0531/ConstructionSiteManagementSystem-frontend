import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

export const useLogOut = (destination: string) => {
    const navigate = useNavigate();
    const [, , removeCookie] = useCookies(['jwt', 'username']);

    return () => {
        removeCookie('jwt', {
            path: '/',
            secure: false,
        });
        removeCookie('username', {
            path: '/',
            secure: false,
        });
        navigate(destination);
    };
};
