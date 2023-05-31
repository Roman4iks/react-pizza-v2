import React from "react"
import ContentLoader from "react-content-loader"

const PizzaBlockSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={483}
    viewBox="0 0 280 483"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="144" cy="120" r="120" /> 
    <rect x="0" y="250" rx="0" ry="10" width="280" height="48" /> 
    <rect x="0" y="320" rx="25" ry="25" width="280" height="86" /> 
    <rect x="0" y="442" rx="0" ry="20" width="100" height="27" /> 
    <rect x="120" y="430" rx="0" ry="25" width="160" height="44" />
  </ContentLoader>
)

export default PizzaBlockSkeleton



