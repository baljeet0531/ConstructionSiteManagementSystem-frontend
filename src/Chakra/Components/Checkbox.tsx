import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const hint = definePartsStyle({
    control: defineStyle({
        background: 'rgba(102, 112, 128, 0.3)',
    }),
});

const grey = definePartsStyle({
    control: defineStyle({
        _checked: {
            borderColor: '#667080',
            background: '#667080',
        },
    }),
});

const Checkbox = defineMultiStyleConfig({
    variants: { hint, grey },
});

export default Checkbox;
