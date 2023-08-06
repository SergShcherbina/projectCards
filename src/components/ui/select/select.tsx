import { FC, ReactNode } from 'react'

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectRadix from '@radix-ui/react-select'

export const Select = () => {
  return (
    <div>
      <SelectRadix.Root>
        <SelectRadix.Trigger className="SelectTrigger" aria-label="Food">
          <SelectRadix.Value placeholder="Select a fruit…" />
          <SelectRadix.Icon className="SelectIcon">
            <ChevronDownIcon />
          </SelectRadix.Icon>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content className="SelectContent">
            <SelectRadix.ScrollUpButton className="SelectScrollButton">
              <ChevronUpIcon />
            </SelectRadix.ScrollUpButton>
            <SelectRadix.Viewport className="SelectViewport">
              <SelectRadix.Group>
                <SelectRadix.Label className="SelectLabel">Fruits</SelectRadix.Label>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectRadix.Group>

              <SelectRadix.Separator className="SelectSeparator" />

              <SelectRadix.Group>
                <SelectRadix.Label className="SelectLabel">Vegetables</SelectRadix.Label>
                <SelectItem value="aubergine">Aubergine</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="courgette">Courgette</SelectItem>
                <SelectItem value="leek">Leek</SelectItem>
              </SelectRadix.Group>

              <SelectRadix.Separator className="SelectSeparator" />

              <SelectRadix.Group>
                <SelectRadix.Label className="SelectLabel">Meat</SelectRadix.Label>
                <SelectItem value="beef">Beef</SelectItem>
                <SelectItem value="chicken">Chicken</SelectItem>
                <SelectItem value="lamb">Lamb</SelectItem>
                <SelectItem value="pork">Pork</SelectItem>
              </SelectRadix.Group>
            </SelectRadix.Viewport>
            <SelectRadix.ScrollDownButton className="SelectScrollButton">
              <ChevronDownIcon />
            </SelectRadix.ScrollDownButton>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </div>
  )
}

type selectItemPropsType = {
  value: string
  children: ReactNode
}

const SelectItem: FC<selectItemPropsType> = ({ children, ...props }) => {
  return (
    <SelectRadix.Item className={'SelectItem'} {...props}>
      <SelectRadix.ItemText>{children}</SelectRadix.ItemText>
      <SelectRadix.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </SelectRadix.ItemIndicator>
    </SelectRadix.Item>
  )
}
