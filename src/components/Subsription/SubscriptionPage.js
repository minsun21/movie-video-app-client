import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function SubscriptionPage() {
    const userInfo = useSelector(state => state.user.loginInfo.id);

    useEffect(() => {

    }, [])
    return (
        <div>
            sdf
        </div>
    )
}

export default SubscriptionPage
