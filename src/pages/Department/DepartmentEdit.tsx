import { FC, useEffect, useState } from "react";
import { getDepartment, putDepartment } from "@/api/requests";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@consta/uikit/Button";
import dayjs from "dayjs";

export const DepartmentEdit: FC = () => {
    const { id } = useParams();

    const [department, setDepartment] = useState<departmentType>();

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
                    <input
                        className="text-field__input"
                        type="text"
                        {...register('id_director', {
                            required: true
                        })}
                    />

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