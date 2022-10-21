import { extendTheme } from '@chakra-ui/react'
import Table from '../Components/Table'
import Text from '../Components/Text'

const myTheme = extendTheme({
    styles: {
        global: {
            p: {
                fontFamily: "Inter"
            }
        }
    },
    components: {
        Table,
        Text,
    }
})

export default myTheme