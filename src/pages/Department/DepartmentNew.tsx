import { FC, useEffect, useState } from 'react';
import '@/sass/new.sass';
import { Button } from "@consta/uikit/Button";

import { useForm } from "react-hook-form";
import { getAllUsers, postDepartment } from "@/api/requests";

export const DepartmentNew: FC = () => {

    const [users, setUsers] = useState<any[]>([]);

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
        getUsersData();
    }, [])

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data: any) => {
        postDepartment(data);
        reset();
    }

    return (
        <>
            <div className="new">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="text-field__label">Название отдела</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Name', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Описание</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Description', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Id Начальника</label>
                    <select
                        style={{ padding: '0' }}
                        className="text-field__input"
                        {...register('id_director', {
                            required: true
                        })}
                    >
                        {
                            users.map(el => (
                                <option value={Number(el.id)}>{el.FIO}</option>
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