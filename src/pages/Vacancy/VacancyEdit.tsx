import { FC, useEffect, useState } from "react";
import { getDepartment, getVacancy, putVacancy } from "@/api/requests";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@consta/uikit/Button";
import dayjs from "dayjs";

export const VacancyEdit: FC = () => {
    const { id } = useParams();

    const [vacancy, setVacancy] = useState<vacancyType>();
    const [department, setDepartment] = useState<departmentType[]>([]);

    const getVacancyData = () => {
        getVacancy()
            .then((result) => {
                setVacancy(result.find((el: vacancyType) => el.id_vacancy === Number(id)));
            })
            .catch((err) => {
                console.log(err)
            })
    }

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
        getVacancyData();
        getDepartmentData();
    }, [])

    const onSubmit = async (data: any) => {
        await putVacancy(Number(id), data);
        reset();
        getVacancyData();
    }

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        values: vacancy
    });

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

                    <label className="text-field__label">Отдел</label>
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