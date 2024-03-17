import React, { FC } from "react";
import '@/sass/main-content.sass';
import { Outlet } from 'react-router-dom';

const MainContent: FC = () => {

    return (
        <div className="main-content">
            <Outlet />
        </div>
    )
}

export default MainContent;