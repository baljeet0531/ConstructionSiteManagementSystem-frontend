import { extendTheme } from '@chakra-ui/react'
import Table from '../Components/Table'

const myTheme = extendTheme({
    components: {
        Table,
    }
})

export default myTheme