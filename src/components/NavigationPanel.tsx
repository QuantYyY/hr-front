import React, { FC } from "react";
import '@/sass/navigation-panel.sass';
import { NavLink } from 'react-router-dom';

const NavigationPanel: FC = () => {

    const navigationData: Record<string, string> = {
        'Сотрудники': 'employee',
        'Приказ': 'order',
        'Должности': 'position',
        'Отделы': 'department',
        'Вакансии': 'vacancy',
        'Заявки': 'application',
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavigationPanel;