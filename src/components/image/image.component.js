// Utils
import React from "react"

// Components
import { LazyLoadImage } from "react-lazy-load-image-component"

// Styles
import "react-lazy-load-image-component/src/effects/blur.css"

const Image = ({ ...props }) => {
	return <LazyLoadImage {...props} />
}

export default Image
