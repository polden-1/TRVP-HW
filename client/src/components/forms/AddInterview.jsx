import { useEffect, useState } from "react";
import { getSkills } from "../../requests";

export default function AddInterview({ setShown, requestFunction, parentData, checkSkills, checkTime}) {
    const {manager_id} = parentData;
    const [newData, setNewData] = useState({
        manager_id: manager_id,
        candidate_name: '',
        start_time: '',
        skills: [],
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

    const handleSubmit = async (e) => {
        e.preventDefault();


        if(checkSkills(manager_id, newData.skills) && checkTime(manager_id, newData.start_time)){
            const res = await requestFunction(newData, manager_id);
            if (res === 200) {
                setShown(false);
                window.location.reload();
            }
        }
    };

    return (
        <div className="form-block">
            <h2>Добавление интервью</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-input-block">
                    <label htmlFor="candidate_name">ФИО кандидата</label>
                    <input
                        name="candidate_name"
                        type="text"
                        placeholder="Иванов Иван Иванович"
                        value={newData.candidate_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-input-block">
                    <label htmlFor="start_time">Начало интервью:</label>
                    <input
                        name="start_time"
                        type="time"
                        value={newData.start_time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-select-block">
                    <label htmlFor="skills">Навыки</label>
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