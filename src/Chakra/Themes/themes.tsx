import { extendTheme } from '@chakra-ui/react';
import Table from '../Components/Table';
import Text from '../Components/Text';
import Select from '../Components/Select';

const myTheme = extendTheme({
    styles: {
        global: {
            p: {
                fontFamily: 'Inter',
            },
        },
    },
    components: {
        Table,
        Text,
        Select,
    },
});

export default myTheme;
