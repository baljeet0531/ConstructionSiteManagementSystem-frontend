import { extendTheme } from '@chakra-ui/react';
import { styles } from '../styles';
import Table from '../Components/Table';
import Text from '../Components/Text';
import Select from '../Components/Select';
import Input from '../Components/Input';

const myTheme = extendTheme({
    styles,
    components: {
        Table,
        Text,
        Select,
        Input,
    },
});

export default myTheme;
