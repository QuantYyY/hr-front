import { FC, useEffect, useState } from "react";
import '@/sass/pages.sass';

import { CollapseGroup } from '@consta/uikit/CollapseGroup';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import { IconAdd } from '@consta/icons/IconAdd';
import { NavLink } from "react-router-dom";
import { getAllUsers } from "@/api/requests";

const EmployeeAlias: Record<string, string> = {
    "id": "Id",
    "FIO": "Фио",
    "Passport": "Passport",
    "Birthday": "Birthday",
    "Gender": "Gender"
}

const allowedField = ['id', 'FIO', 'Passport', 'Birthday', 'Gender'];

const Employee: FC = () => {

    const [Employee, setEmployee] = useState<any[]>([]);

    const getEmployeeData = () => {
        getAllUsers()
            .then((result) => {
                setEmployee(result);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getEmployeeData();
    }, [])

    const getItemContent = (item: any) => {
        const contentItem = Object.entries(item).filter(([title, value]) => allowedField.includes(title));

        return (
            <>
                <div className="collapse-container">
                    {
                        contentItem.map(([title, value]: [any, any]) => {
                            return (
                                <>
                                    {allowedField && <Text size="l" view="secondary">
                                        {EmployeeAlias[title]}: <Text as="span" size="xl" view="primary">{value}</Text>
                                    </Text>}
                                </>
                            )
                        })
                    }
                    {/* <NavLink to={`${item.id_Employee}`} end>
                        <Button
                            label="Редактировать"
                            onlyIcon
                            view="ghost"
                            size="s"
                            style={{ marginTop: '20px' }}
                            iconRight={IconEdit}
                        />
                    </NavLink> */}
                    {/* <Button
                        label="Удалить"
                        onlyIcon
                        view="ghost"
                        size="s"
                        style={{ marginTop: '20px', marginLeft: '15px' }}
                        iconRight={IconTrash}
                        onClick={() => {
                            handleDeleteAppilicant(item.id_Employee!)
                        }}
                    /> */}
                </div>
            </>
        )
    }

    return (
        <>
            <div className="header wrap">
                <h1>Сотрудники</h1>

                {/* <div className="buttons">
                    <NavLink to='new' end>
                        <Button
                            label="Добавить"
                            iconRight={IconAdd}
                        />
                    </NavLink>
                </div> */}
            </div>

            <CollapseGroup
                items={Employee}
                getItemLabel={(item: any) => item.FIO}
                getItemContent={getItemContent}
            />
        </>
    )
}

export default Employee;