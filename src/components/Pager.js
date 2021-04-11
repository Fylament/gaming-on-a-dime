import React from "react"
import {Link} from 'gatsby'
import PropTypes from "prop-types"


const Pager = ({pageContext}) => {
    const { previousPagePath, nextPagePath } = pageContext;
    return (
        <div>
            {/* this part is conditional to check if theres a previous page */}
            {previousPagePath && (
                <span><Link to= {previousPagePath}>Previous</Link></span>
            )}
            {nextPagePath && (
                <span><Link to= {nextPagePath}>Next</Link></span>
            )}
        </div>
    )
}

Pager.propTypes = {
    pageContext: PropTypes.object.isRequired
}

export default Pager;