import { ComponentPropsWithoutRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'

import s from './slider.module.scss'

export type SliderProps = {} & ComponentPropsWithoutRef<typeof SliderRadix.Root>

export const Slider = ({ ...props }: SliderProps) => {
  return (
    <div className={s.container}>
      <span className={s.value}>{props?.value?.[0]}</span>
      <SliderRadix.Root className={s.sliderRoot} defaultValue={[25, 75]} step={1} {...props}>
        <SliderRadix.Track className={s.sliderTrack}>
          <SliderRadix.Range className={s.sliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb className={s.sliderThumb} />
        <SliderRadix.Thumb className={s.sliderThumb} />
      </SliderRadix.Root>
      <span className={s.value}>{props?.value?.[1]}</span>
    </div>
  )
}
