import { FC, useEffect, useState } from "react";
import '@/sass/new.sass';
import { Button } from "@consta/uikit/Button";

import { useForm } from "react-hook-form";
import { getDepartment, postPosition } from "@/api/requests";

export const PositionNew: FC = () => {
    const [department, setDepartment] = useState<departmentType[]>([]);

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

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

    const onSubmit = (data: any) => {
        postPosition(data);
        reset();
    }

    return (
        <>
            <div className="new">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="text-field__label">Наименование должности</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Name', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Количество сотрудников</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Members', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Зарплата</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Salary', {
                            required: true
                        })}
                    />

                    <label className="text-field__label">Название отдела</label>
                    <select
                        style={{ padding: '0' }}
                        className="text-field__input"
                        {...register('department_id', {
                            required: true
                        })}
                    >
                        {
                            department.map(el => (
                                <option value={el.id_director}>{el.Name}</option>
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