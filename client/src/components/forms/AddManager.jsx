import React, { useState, useEffect } from 'react';
import { getSkills } from '../../requests';

export default function AddManager({ setShown, requestFunction, initialData={}, canChangeWorkHours }) {
    const { manager_id, manager_name, start_time, end_time, skills = [] } = initialData;
    
    const initialSkills = skills.map(p => p.skill_id);

    const [newData, setNewData] = useState({
        manager_name: manager_name || '',
        start_time: start_time || '',
        end_time: end_time || '',
        skills: initialSkills || [],
    });


    const [skillsList, setSkillsList] = useState([]);

    useEffect(() => {
        getSkills(setSkillsList);
    }, []);

    const handleChange = (e) => {
        const { name, value, type, selectedOptions } = e.target;
    
        if (type === 'select-multiple') {
            const values = Array.from(selectedOptions).map((option) => option.value);
            setNewData((prevData) => ({
                ...prevData,
                [name]: values,
            }));
        } else {
            setNewData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const validateWorkHours = (startTime, endTime) => {
        const [startHours, startMinutes] = startTime.split(":").map(Number);
        const startInSeconds = startHours * 3600 + startMinutes * 60;
    
        const [endHours, endMinutes] = endTime.split(":").map(Number);
        const endInSeconds = endHours * 3600 + endMinutes * 60;
    
        if (startInSeconds >= endInSeconds) {
            alert("Время начала работы должно быть меньше времени завершения работы.");
            return false;
        }
    
        if (endInSeconds - startInSeconds < 28800) {
            alert("Рабочий день должен быть не менее 8 часов.");
            return false;
        }
    
        return true;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (validateWorkHours(newData.start_time, newData.end_time)) {
            if (manager_id && !canChangeWorkHours(manager_id, newData.start_time, newData.end_time)) {
                return;
            }
            const res = await requestFunction(newData, manager_id);
            if (res === 200) {
                setShown(false);
                window.location.reload();
            }
        }
    };

    return (
        <div className="form-block">
            <h2>{manager_id ? "Редактирование менеджера" : "Добавление менеджера"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-input-block">
                    <label htmlFor="manager_name">ФИО менеджера:</label>
                    <input
                        name="manager_name"
                        type="text"
                        placeholder="Иванов Иван"
                        value={newData.manager_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-input-block">
                    <label htmlFor="start_time">Начало работы:</label>
                    <input
                        name="start_time"
                        type="time"
                        value={newData.start_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-input-block">
                    <label htmlFor="end_time">Конец работы:</label>
                    <input
                        name="end_time"
                        type="time"
                        value={newData.end_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-select-block">
                    <label htmlFor="skills">Навыки:</label>
                    <select
                        name="skills"
                        value={newData.skills}
                        onChange={handleChange}
                        multiple
                        size="10"
                        required
                    >
                        <option value="" disabled>
                            --Выберите навыки--
                        </option>
                        {skillsList.map((element) => (
                            <option key={element.skill_id} value={element.skill_id}>
                                {element.skill_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="buttons-block">
                    <button className="grey-button" type="button" onClick={() => setShown(false)}>Отменить</button>
                    <button className="filed-button" type="submit">{manager_id ? "Сохранить" : "Добавить"}</button>
                </div>
            </form>
        </div>
    );
}