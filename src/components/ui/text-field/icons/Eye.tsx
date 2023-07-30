import { SVGProps, Ref, forwardRef, memo } from 'react'

const Eye = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g id="Layer 2">
      <g id="eye">
        <path
          id="Vector"
          d="M18.225 9.58334C17.6916 8.65834 14.7583 4.01667 9.77497 4.16667C5.16664 4.28334 2.49998 8.33334 1.77498 9.58334C1.70184 9.71002 1.66333 9.85372 1.66333 10C1.66333 10.1463 1.70184 10.29 1.77498 10.4167C2.29998 11.325 5.10831 15.8333 10.0166 15.8333H10.225C14.8333 15.7167 17.5083 11.6667 18.225 10.4167C18.2981 10.29 18.3366 10.1463 18.3366 10C18.3366 9.85372 18.2981 9.71002 18.225 9.58334ZM10.1833 14.1667C6.59164 14.25 4.24997 11.175 3.51664 10C4.34998 8.65834 6.52498 5.91667 9.85831 5.83334C13.4333 5.74167 15.7833 8.82501 16.525 10C15.6666 11.3417 13.5166 14.0833 10.1833 14.1667Z"
          fill="white"
        />
        <path
          id="Vector_2"
          d="M9.99998 7.08334C9.42312 7.08334 8.85921 7.2544 8.37957 7.57489C7.89992 7.89538 7.52609 8.3509 7.30533 8.88385C7.08458 9.4168 7.02682 10.0032 7.13936 10.569C7.2519 11.1348 7.52968 11.6545 7.93759 12.0624C8.34549 12.4703 8.86519 12.7481 9.43097 12.8606C9.99675 12.9732 10.5832 12.9154 11.1161 12.6947C11.6491 12.4739 12.1046 12.1001 12.4251 11.6204C12.7456 11.1408 12.9166 10.5769 12.9166 10C12.9166 9.22646 12.6094 8.4846 12.0624 7.93762C11.5154 7.39063 10.7735 7.08334 9.99998 7.08334ZM9.99998 11.25C9.75275 11.25 9.51108 11.1767 9.30552 11.0393C9.09996 10.902 8.93974 10.7068 8.84513 10.4784C8.75052 10.25 8.72577 9.99862 8.774 9.75615C8.82223 9.51367 8.94128 9.29094 9.1161 9.11613C9.29091 8.94131 9.51364 8.82226 9.75612 8.77403C9.99859 8.7258 10.2499 8.75055 10.4783 8.84516C10.7067 8.93977 10.902 9.09999 11.0393 9.30555C11.1767 9.51111 11.25 9.75278 11.25 10C11.25 10.3315 11.1183 10.6495 10.8839 10.8839C10.6494 11.1183 10.3315 11.25 9.99998 11.25Z"
          fill="white"
        />
      </g>
    </g>
  </svg>
)
const ForwardRef = forwardRef(Eye)
const Memo = memo(ForwardRef)

export { Memo as Eye }
