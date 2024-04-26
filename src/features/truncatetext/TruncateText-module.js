import React  from 'react';
import Truncate from 'react-truncate';


function TruncateText(props) {
    const {truncFrom, lines, ellipsis, bodyData} = props;
       return (
            <Truncate truncFrom={truncFrom} lines={lines} ellipsis={ellipsis} bodyData={bodyData}>
                {bodyData.toString()}
            </Truncate>
       )
}
export default TruncateText