import { FC, useEffect, useState } from "react";
import { getAllUsers, getDepartment, putDepartment } from "@/api/requests";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@consta/uikit/Button";
import dayjs from "dayjs";

export const DepartmentEdit: FC = () => {
    const { id } = useParams();

    const [department, setDepartment] = useState<departmentType>();
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

    const getDepartmentData = () => {
        getDepartment()
            .then((result) => {
                setDepartment(result.find((el: departmentType) => el.id_department === Number(id)));
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getDepartmentData();
        getUsersData();
    }, [])

    const onSubmit = async (data: any) => {
        await putDepartment(Number(id), data);
        reset();
        getDepartmentData();
    }

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        values: department
    });

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