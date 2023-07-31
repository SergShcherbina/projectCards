import { SVGProps, Ref, forwardRef, memo } from 'react'

const Search = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="m20.71 19.29-3.4-3.39a7.92 7.92 0 0 0 .34-9.34A8 8 0 1 0 15.9 17.3l3.39 3.4a1 1 0 1 0 1.42-1.42ZM5 11a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(Search)
const Memo = memo(ForwardRef)

export { Memo as Search }
