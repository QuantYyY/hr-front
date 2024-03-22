import { FC, useEffect, useState } from "react";
import { getDepartment, getPosition, putPosition } from "@/api/requests";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@consta/uikit/Button";

export const PositionEdit: FC = () => {
    const { id } = useParams();

    const [position, setPosition] = useState<positionType>();
    const [department, setDepartment] = useState<departmentType[]>([]);

    const getPositionData = () => {
        getPosition()
            .then((result) => {
                setPosition(result.find((el: positionType) => el.id_post === Number(id)));
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
        getPositionData();
        getDepartmentData();
    }, [])

    const onSubmit = async (data: any) => {
        await putPosition(Number(id), data);
        reset();
        getPositionData();
    }

    const {
        register,
        handleSubmit,
        reset
    } = useForm({
        values: position
    });

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