import { FC, useEffect, useState } from "react";
import '@/sass/pages.sass';

import { CollapseGroup } from '@consta/uikit/CollapseGroup';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import { IconTrash } from '@consta/icons/IconTrash';
import { IconEdit } from '@consta/icons/IconEdit';
import { IconAdd } from '@consta/icons/IconAdd';
import { deleteOrder, getOrder } from "@/api/requests";
import { NavLink } from "react-router-dom";

const OrderAlias: Record<string, string> = {
    "id_order": "Id",
    "Type": "Тип",
    "Date": "Дата",
    "staff_id": "Id Сотрудника",
    "post_id": "Id Вакансии"
}

const Order: FC = () => {
    const [order, setOrder] = useState<orderType[]>([]);
    const userRole = localStorage.getItem('role_name');

    const getOrderData = () => {
        getOrder()
            .then((result) => {
                setOrder(result);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getOrderData();
    }, [])

    const handleDeleteAppilicant = async (id: number) => {
        await deleteOrder(id);
        await getOrderData()
    }

    const getItemContent = (item: orderType) => {
        const contentItem = Object.entries(item);

        return (
            <>
                <div className="collapse-container">
                    {
                        contentItem.map(([title, value]) => {
                            return (
                                <>
                                    <Text size="l" view="secondary">
                                        {OrderAlias[title]}: <Text as="span" size="xl" view="primary">{value}</Text>
                                    </Text>
                                </>
                            )
                        })
                    }
                    {
                        (userRole === 'Admin' || userRole === 'Employer') ? <><NavLink to={`${item.id_order}`} end>
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
                                    handleDeleteAppilicant(item.id_order!)
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
                <h1>Приказ</h1>

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
                items={order}
                getItemLabel={(item) => item.Type}
                getItemContent={getItemContent}
            />
        </>
    )
}

export default Order;