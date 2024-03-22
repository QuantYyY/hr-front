import { FC, useEffect, useState } from "react";
import { getAllUsers, getDepartment, getOrder, getPosition, putOrder } from "@/api/requests";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@consta/uikit/Button";
import dayjs from "dayjs";

export const OrderEdit: FC = () => {
    const { id } = useParams();

    const [order, setOrder] = useState<orderType>();
    const [position, setPosition] = useState<positionType[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    const getOrderData = () => {
        getOrder()
            .then((result) => {
                setOrder(result.find((el: orderType) => el.id_order === Number(id)));
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getPositionData = () => {
        getPosition()
            .then((result) => {
                setPosition(result);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const getUsersData = () => {
        getAllUsers()
            .then((result) => {
                setUsers(result);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getOrderData();
        getPositionData();
        getUsersData();
    }, [])

    const onSubmit = async (data: any) => {
        const newData = {
            ...data,
            Date: dayjs(`${data.Date} GMT`, 'YYYY-MM-DD').toISOString()
        }
        await putOrder(Number(id), newData);
        reset();
        getOrderData();
    }

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        values: order
    });

    return (
        <>
            <div className="new">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="text-field__label">Тип</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Type', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Дата</label>
                    <input
                        className="text-field__input"
                        placeholder="1990-01-20"
                        type="text"
                        {...register('Date', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Сотрудник</label>
                    <select
                        style={{ padding: '0' }}
                        className="text-field__input"
                        {...register('staff_id', {
                            required: true
                        })}
                    >
                        {
                            users.map(el => (
                                <option value={Number(el.id)}>{el.FIO}</option>
                            ))
                        }
                    </select>

                    <label className="text-field__label">Должность</label>
                    <select
                        style={{ padding: '0' }}
                        className="text-field__input"
                        {...register('post_id', {
                            required: true
                        })}
                    >
                        {
                            position.map(el => (
                                <option value={Number(el.id_post)}>{el.Name}</option>
                            ))
                        }
                    </select>

                    <Button
                        label='Сохранить'
                        type="submit"
                        size="m"
                        className="submit-button"
                    />
                </form>
            </div>
        </>
    )
}