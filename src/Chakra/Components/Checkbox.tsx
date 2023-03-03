import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const hint = definePartsStyle({
  control: defineStyle({
    background: "rgba(102, 112, 128, 0.3)"
  })
})

const Checkbox = defineMultiStyleConfig({
  variants: { hint },
})

export default Checkbox;