import React, { useState, useEffect } from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function CustomSeparator(props) {
    const breadcrumbs = [
        <Link underline="none" key="1" color="inherit" >
            {props.database}
        </Link>,
        <Link underline="none" key="1" color="text.primary" >
            {props.collection}
        </Link>
    ];

    return (
        <>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </>
    );
}