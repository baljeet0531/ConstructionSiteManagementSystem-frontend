import { extendTheme } from '@chakra-ui/react';
import { styles } from '../styles';
import Table from '../Components/Table';
import Text from '../Components/Text';

const myTheme = extendTheme({
    styles,
    components: {
        Table,
        Text,
    },
});

export default myTheme;
