import { FC, useEffect, useState } from "react";
import '@/sass/pages.sass';

import { CollapseGroup } from '@consta/uikit/CollapseGroup';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import { IconTrash } from '@consta/icons/IconTrash';
import { IconEdit } from '@consta/icons/IconEdit';
import { IconAdd } from '@consta/icons/IconAdd';
import { deletePosition, getPosition } from "@/api/requests";
import { NavLink } from "react-router-dom";

const PositionAlias: Record<string, string> = {
    "id_post": "Id",
    "Members": "Количество участников",
    "Salary": "Зарплата",
    "Name": "Наименование",
    "department_id": "Id Отдела"
}

const Position: FC = () => {
    const [position, setPosition] = useState<positionType[]>([]);
    const userRole = localStorage.getItem('role_name');

    const getPositionData = () => {
        getPosition()
            .then((result) => {
                setPosition(result);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getPositionData();
    }, [])

    const handleDeleteAppilicant = async (id: number) => {
        await deletePosition(id);
        await getPositionData()
    }

    const getItemContent = (item: positionType) => {
        const contentItem = Object.entries(item);

        return (
            <>
                <div className="collapse-container">
                    {
                        contentItem.map(([title, value]) => {
                            return (
                                <>
                                    <Text size="l" view="secondary">
                                        {PositionAlias[title]}: <Text as="span" size="xl" view="primary">{value}</Text>
                                    </Text>
                                </>
                            )
                        })
                    }
                    {
                        (userRole === 'Admin' || userRole === 'Employer') ? <><NavLink to={`${item.id_post}`} end>
                            <Button
                                label="Редактировать"
                                onlyIcon
                                view="ghost"
                                size="s"
                                style={{ marginTop: '20px' }}
                                iconRight={IconEdit}
                            />
                        </NavLink></> : <></>

                    }

                    {
                        (userRole === 'Admin') ? <>
                            <Button
                                label="Удалить"
                                onlyIcon
                                view="ghost"
                                size="s"
                                style={{ marginTop: '20px', marginLeft: '15px' }}
                                iconRight={IconTrash}
                                onClick={() => {
                                    handleDeleteAppilicant(item.id_post!)
                                }}
                            /></> : <>
                        </>
                    }
                </div >
            </>
        )
    }

    return (
        <>
            <div className="header wrap">
                <h1>Должности</h1>

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
                items={position}
                getItemLabel={(item) => item.Name}
                getItemContent={getItemContent}
            />
        </>
    )
}

export default Position;