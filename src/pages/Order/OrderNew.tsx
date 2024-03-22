import { FC, useEffect, useState } from 'react';
import '@/sass/new.sass';
import { Button } from "@consta/uikit/Button";

import { useForm } from "react-hook-form";
import { getAllUsers, getPosition, postOrder } from "@/api/requests";
import dayjs from 'dayjs';

export const OrderNew: FC = () => {
    const [position, setPosition] = useState<positionType[]>([]);
    const [users, setUsers] = useState<any[]>([]);

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
        getPositionData();
        getUsersData();
    }, [])

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data: any) => {
        const newData = {
            ...data,
            Date: dayjs(`${data.Date} GMT`, 'YYYY-MM-DD').toISOString()
        }
        postOrder(newData);
        reset();
    }

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
                                <option value={el.id}>{el.FIO}</option>
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
                                <option value={el.id_post}>{el.Name}</option>
                            ))
                        }
                    </select>

                    <Button
                        label='Отправить'
                        type="submit"
                        size="m"
                        className="submit-button"
                    />
                </form>
            </div>
        </>
    )
}