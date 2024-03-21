import { FC, useEffect, useState } from "react";
import '@/sass/new.sass';
import { Button } from "@consta/uikit/Button";

import { useForm } from "react-hook-form";
import { getDepartment, postVacancy } from "@/api/requests";

export const VacancyNew: FC = () => {
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
        postVacancy(data);
        reset();
    }

    return (
        <>
            <div className="new">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <label className="text-field__label">Название вакансии</label>
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('Post', {
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

                    <label className="text-field__label">Id Отдела</label>
                    <select
                        style={{ padding: '0' }}
                        className="text-field__input"
                        {...register('id_vacancy', {
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