import React, { FC, useEffect, useState } from "react";
import '@/sass/pages.sass';

import { CollapseGroup } from '@consta/uikit/CollapseGroup';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import { IconTrash } from '@consta/icons/IconTrash';
import { IconEdit } from '@consta/icons/IconEdit';
import { IconAdd } from '@consta/icons/IconAdd';
import { deleteDepartment, getDepartment } from "@/api/requests";
import { NavLink } from "react-router-dom";

const departmentAlias: Record<string, string> = {
    "id_department": "Id",
    "Name": "Название отдела",
    "Description": "Описание",
    "id_director": "Id Начальника"
}

const Department: FC = () => {
    const [department, setDepartment] = useState<departmentType[]>([]);
    const userRole = localStorage.getItem('role_name');

    const getDepartmentData = () => {
        getDepartment()
            .then((result) => {
                setDepartment(result);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getDepartmentData();
    }, [])

    const handleDeleteAppilicant = async (id: number) => {
        await deleteDepartment(id);
        await getDepartmentData()
    }

    const getItemContent = (item: departmentType) => {
        const contentItem = Object.entries(item);

        return (
            <>
                <div className="collapse-container">
                    {
                        contentItem.map(([title, value]) => {
                            return (
                                <>
                                    <Text size="l" view="secondary">
                                        {departmentAlias[title]}: <Text as="span" size="xl" view="primary">{value}</Text>
                                    </Text>
                                </>
                            )
                        })
                    }
                    {
                        (userRole === 'Admin') ? <><NavLink to={`${item.id_department}`} end>
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
                                    handleDeleteAppilicant(item.id_department!)
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
                <h1>Отделы</h1>

                {
                    (userRole === 'Admin') ? <div className="buttons">
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
                items={department}
                getItemLabel={(item) => item.Name}
                getItemContent={getItemContent}
            />
        </>
    )
}

export default Department;