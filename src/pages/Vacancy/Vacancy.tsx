import React, { FC, useEffect, useState } from "react";
import '@/sass/pages.sass';

import { CollapseGroup } from '@consta/uikit/CollapseGroup';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import { IconTrash } from '@consta/icons/IconTrash';
import { IconEdit } from '@consta/icons/IconEdit';
import { IconAdd } from '@consta/icons/IconAdd';
import { deleteVacancy, getVacancy } from "@/api/requests";
import { NavLink } from "react-router-dom";

const vacancyAlias: Record<string, string> = {
    "id_vacancy": "Id",
    "Post": "Название вакансии",
    "Description": "Описание",
    "department_id": "Id Отдела"
}

const Vacancy: FC = () => {
    const [vacancy, setVacancy] = useState<vacancyType[]>([]);

    const userRole = localStorage.getItem('role_name');

    const getVacancyData = () => {
        getVacancy()
            .then((result) => {
                setVacancy(result);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getVacancyData();
    }, [])

    const handleDeleteAppilicant = async (id: number) => {
        await deleteVacancy(id);
        await getVacancyData()
    }

    const getItemContent = (item: vacancyType) => {
        const contentItem = Object.entries(item);

        return (
            <>
                <div className="collapse-container">
                    {
                        contentItem.map(([title, value]) => {
                            return (
                                <>
                                    <Text size="l" view="secondary">
                                        {vacancyAlias[title]}: <Text as="span" size="xl" view="primary">{value}</Text>
                                    </Text>
                                </>
                            )
                        })
                    }
                    {
                        (userRole === 'Admin' || userRole === 'Employer') ?
                            <>
                                <NavLink to={`${item.id_vacancy}`} end>
                                    <Button
                                        label="Редактировать"
                                        onlyIcon
                                        view="ghost"
                                        size="s"
                                        style={{ marginTop: '20px' }}
                                        iconRight={IconEdit}
                                    />
                                </NavLink>
                                <Button
                                    label="Удалить"
                                    onlyIcon
                                    view="ghost"
                                    size="s"
                                    style={{ marginTop: '20px', marginLeft: '15px' }}
                                    iconRight={IconTrash}
                                    onClick={() => {
                                        handleDeleteAppilicant(item.id_vacancy!)
                                    }}
                                /></> : <></>
                    }
                </div>
            </>
        )
    }

    return (
        <>
            <div className="header wrap">
                <h1>Вакансии</h1>

                {
                    (userRole === 'Admin' || userRole === 'Employer') ? <div className="buttons">
                        <NavLink to='new' end>
                            <Button
                                label="Добавить"
                                iconRight={IconAdd}
                            />
                        </NavLink>
                    </div> : <></>
                }
            </div>

            <CollapseGroup
                items={vacancy}
                getItemLabel={(item) => item.Post}
                getItemContent={getItemContent}
            />
        </>
    )
}

export default Vacancy;