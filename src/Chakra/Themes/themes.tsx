import { extendTheme } from '@chakra-ui/react';
import { styles } from '../styles';
import Table from '../Components/Table';
import Text from '../Components/Text';
import Select from '../Components/Select';

const myTheme = extendTheme({
    styles,
    components: {
        Table,
        Text,
        Select,
    },
});

export default myTheme;
