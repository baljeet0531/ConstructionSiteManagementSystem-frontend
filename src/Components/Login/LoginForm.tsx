import React from 'react';
import { Form, Formik, Field } from 'formik';
import BACKEND from '../../Constants/EnvConstants';
import {
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useToast,
} from '@chakra-ui/react';
import { useCookies } from 'react-cookie';
import { AccountIcon, LockIcon, ShowPasswordIcon } from '../../Icons/Icons';
import { defaultErrorToast } from '../../Utils/DefaultToast';
import { useNavigate } from 'react-router-dom';

export default function LoginForm(props: { mode: 'mobile' | 'desktop' }) {
    const { mode } = props;
    const [show, setShow] = React.useState(false);
    const [, setCookie] = useCookies(['jwt', 'username']);
    const toast = useToast();
    const navigate = useNavigate();

    const fetchLogin = async (username: string, password: string) => {
        let response = await fetch(BACKEND + '/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            method: 'POST',
        });

        if (response.status >= 400) {
            response.status == 401
                ? defaultErrorToast(toast, '帳號或密碼錯誤')
                : defaultErrorToast(toast, `${response.statusText}`);
        } else {
            let token = await response.text();
            setCookie('jwt', token, {
                path: '/',
                secure: false,
            });
            setCookie('username', username, {
                path: '/',
                secure: false,
            });
            mode === 'desktop'
                ? navigate('/', { replace: true })
                : navigate('/mobile/', { replace: true });
        }
    };

    return (
        <Formik
            initialValues={{ account: '', password: '' }}
            onSubmit={(values, actions) => {
                actions.setSubmitting(true);
                fetchLogin(values.account, values.password).then(() => {
                    actions.setSubmitting(false);
                });
            }}
        >
            {(props) => (
                <Form>
                    <Flex
                        direction={'column'}
                        align="center"
                        justify="center"
                        gap="20px"
                    >
                        <Field
                            name="account"
                            validate={(value: string) =>
                                !value && '欄位不能為空'
                            }
                        >
                            {({ field, form }: any) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.account &&
                                        form.touched.account
                                    }
                                >
                                    <InputGroup>
                                        <InputLeftElement
                                            h={'36px'}
                                            pointerEvents={'none'}
                                            children={<AccountIcon />}
                                        />
                                        <Input
                                            {...field}
                                            type={'text'}
                                            variant={'grayOutline'}
                                            placeholder="Account"
                                        />
                                    </InputGroup>
                                </FormControl>
                            )}
                        </Field>
                        <Field
                            name="password"
                            validate={(value: string) =>
                                !value && '欄位不能為空'
                            }
                        >
                            {({ field, form }: any) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.password &&
                                        form.touched.password
                                    }
                                >
                                    <InputGroup>
                                        <InputLeftElement
                                            h={'36px'}
                                            pointerEvents={'none'}
                                            children={<LockIcon />}
                                        />
                                        <Input
                                            {...field}
                                            type={show ? 'text' : 'password'}
                                            variant={'grayOutline'}
                                            placeholder="Password"
                                        />
                                        <InputRightElement h={'36px'}>
                                            <Box
                                                cursor={'pointer'}
                                                onClick={() => setShow(!show)}
                                            >
                                                <ShowPasswordIcon />
                                            </Box>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            type={'submit'}
                            variant={'buttonBlueSolid'}
                            h={'36px'}
                            w="100%"
                            borderRadius="20px"
                            isLoading={props.isSubmitting}
                        >
                            登入
                        </Button>
                    </Flex>
                </Form>
            )}
        </Formik>
    );
}
