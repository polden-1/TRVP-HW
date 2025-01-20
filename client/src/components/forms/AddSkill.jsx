import React, { useState, useEffect } from 'react';
import { getSkills } from '../../requests';

export default function AddSkill({setShown, requestFunction, initialData={}}) {
    const { skill_id, skill_name } = initialData;
    const [newData, setNewData] = useState({
        skill_name: skill_name || '',
    })

    const [skillsList, setSkillsList] = useState([]);

    useEffect(() => {
        getSkills(setSkillsList);
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!skill_id){
            const isExists = skillsList.some(
                (skill) =>
                    skill.skill_name.toLowerCase() === newData.skill_name.toLowerCase()
            );
    
            if (isExists) {
                alert('Такой навык уже есть в списке.');
                return; 
            }
        }

        const res = await requestFunction(newData, skill_id);

        if (res === 200) {
            setShown(false);
            window.location.reload();
        }
    };

    return (
        <div className="form-block">
            <h2>{skill_id?`Редактирование навыка`:"Добавление навыка"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-input-block">
                    <label htmlFor="skill_name">Название:</label>
                    <input
                        name="skill_name"
                        type="text"
                        value={newData.skill_name}
                        placeholder="JS"
                        onChange={(e) => handleChange(e)}
                        required
                    />
                </div>

                <div className="buttons-block">
                    <button className="grey-button" type="chancel" onClick={() => setShown(false)}>Отменить</button>
                    <button className="filed-button" type="submit">{skill_id?"Сохранить":"Добавить"}</button>
                </div>
            </form>
        </div>
    );
}