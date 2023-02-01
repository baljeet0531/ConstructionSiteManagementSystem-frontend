import { extendTheme } from '@chakra-ui/react';
import { styles } from '../styles';
import Table from '../Components/Table';
import Text from '../Components/Text';
import Select from '../Components/Select';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Tabs from '../Components/Tabs';

const myTheme = extendTheme({
    styles,
    components: {
        Table,
        Text,
        Select,
        Input,
        Button,
        Tabs,
    },
});

export default myTheme;
