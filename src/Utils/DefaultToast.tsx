export function defaultErrorToast(toast: Function, description?: string) {
    toast({
        title: '錯誤',
        description: description || '伺服器錯誤，請稍後重試。',
        status: 'error',
        duration: 3000,
        isClosable: true,
    });
}

export function defaultSuccessToast(toast: Function, title: string) {
    toast({
        title: title,
        status: 'success',
        duration: 3000,
        isClosable: true,
    });
}

export function defaultWarningToast(
    toast: Function,
    title: string,
    description: string
) {
    toast({
        title: title,
        description: description,
        status: 'warning',
        duration: 3000,
        isClosable: true,
    });
}
