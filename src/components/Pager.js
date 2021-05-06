import React from "react"
import {Link} from 'gatsby'
import PropTypes from "prop-types"


const Pager = ({pageContext}) => {
    const { previousPagePath, nextPagePath } = pageContext;
    return (
        <div className="flex flex-wrap justify-between">
            {/* this part is conditional to check if theres a previous page */}
            {previousPagePath? (
                <span className="flex font-oswald text-content text-base"><Link to= {previousPagePath}>ᐊ Previous</Link></span>
            ):<span className="flex font-oswald text-content text-base invisible"><Link to= {previousPagePath}>ᐊ Previous</Link></span>}
            {nextPagePath && (
                <span className="flex font-oswald text-content text-base"><Link to= {nextPagePath}>Next ᐅ</Link></span>
            )}
        </div>
    )
}

Pager.propTypes = {
    pageContext: PropTypes.object.isRequired
}

export default Pager;