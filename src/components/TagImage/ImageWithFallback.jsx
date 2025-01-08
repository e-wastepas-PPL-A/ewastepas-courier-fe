import { useState } from "react"

const ImageWithFallback = (props) => {
    // eslint-disable-next-line react/prop-types
  const { src, fallbackSrc, alt, ...rest } = props
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc)
      }}
    />
  )
}

export default ImageWithFallback
