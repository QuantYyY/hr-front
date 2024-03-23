import React, { FC } from "react";
import '@/sass/navigation-panel.sass';
import { NavLink } from 'react-router-dom';
import { Button } from "@consta/uikit/Button";

import { IconExit } from "@/icons/IconExit";
import { authLogout } from "@/api/requests";

const NavigationPanel: FC = () => {

    const navigationData: Record<string, string> = {
        'Сотрудники': 'employee',
        'Приказ': 'order',
        'Должности': 'position',
        'Отделы': 'department',
        'Вакансии': 'vacancy',
        'Соискатели': 'applicant',
    }

    return (
        <>
            <div className="navigation-panel-container">
                <div className="navigation-panel">
                    <div className="nav">
                        <NavLink to='' end>Главная</NavLink>
                        {
                            Object.entries(navigationData).map((entry: [string, string]) => {
                                const [title, link] = entry;

                                return (
                                    <NavLink
                                        to={link}
                                        end
                                    >{title}</NavLink>
                                )
                            })
                        }

                        <Button
                            label='logout'
                            onlyIcon
                            size="m"
                            view="clear"
                            iconLeft={IconExit}
                            onClick={() => {
                                authLogout();
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                localStorage.removeItem('role_name');
                                location.reload();
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavigationPanel;