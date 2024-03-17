import React, { FC } from "react";
import '@/sass/template.sass';

import NavigationPanel from "./NavigationPanel";
import MainContent from "./MainContent";

const Template: FC = () => {

    return (
        <>
            <div className="template-content">
                <NavigationPanel />
                <MainContent />
            </div>
        </>
    )
}

export default Template;