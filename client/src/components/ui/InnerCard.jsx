import { useState } from "react"
import { deleteInterview, moveInterview} from "../../requests";
import { addTime } from "../../functions";

export default function InnerCard({data, allData, parentData, checkSkills, checkTime}) {
    const { interview_id, candidate_name, interview_start_time, interview_skills=[]} = data;
    const [shown, setShown] = useState(false);
    const [newData, setNewData] = useState({
        new_manager_id: '',
    });
    

    const handleChange = (e) => {
        const { name, value } = e.target;

        setNewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedSkills = interview_skills.map(p => p.skill_id);

        if(checkSkills(parseInt(newData.new_manager_id), parsedSkills) && checkTime(parseInt(newData.new_manager_id), interview_start_time)){
            const res = await moveInterview(interview_id, newData);
            if (res === 200) {
                setShown(false);
                window.location.reload();
            }
        }
    };

    const handleChancel = (e) => {
        e.preventDefault();
        setShown(false);
    }

    const handleDelete = async () => {
        if (window.confirm(`Вы уверены, что хотите отменить интервью с ${candidate_name}?`)) {
            const res = await deleteInterview(interview_id);
            if(res){
                alert(res.message);
                window.location.reload();
            }
            
        }
    };

    

    return (
        <div className="inner-card-block">
            <div className="inner-card-block-title">
                <div className="inner-card-block-name">
                    {candidate_name}
                    <div className="inner-card-block-buttons">
                        {!shown && (<img src="/images/edit.svg" alt="Перенаправить" onClick={() => setShown(true)}/>)}
                        <img className="inner-card-block-buttons-delete" src="/images/delete-button.svg" alt="Удалить" onClick={handleDelete}/>
                    </div>
                </div>
                <div className="inner-card-block-subitems">
                    <div className="inner-card-block-subitems-list">
                        <div className="inner-card-block-subitems-list-item">
                            {interview_start_time} - {addTime(interview_start_time)}
                        </div>
                        {interview_skills.map((element, index) => {
                            return (
                                <div key={index} className="inner-card-block-subitems-list-item">
                                    {element.skill_name}
                                </div>
                            )
                        })}
                    </div>
                </div>
                {shown?(
                    <>
                        <form onSubmit={handleSubmit} className="form-block">
                            <div className="form-input-block">
                                <label htmlFor="new_manager_id">Новый менеджер:</label>
                                <select
                                    name="new_manager_id"
                                    value={newData.new_manager_id}
                                    onChange={(e) => handleChange(e)}
                                    required
                                >
                                    <option value="" disabled>
                                        Выберите менеджера
                                    </option>
                                    {allData.filter((element) => {return element.manager_id !== parentData.manager_id}).map((element) => (
                                        <option key={element.manager_id} value={element.manager_id}>
                                            {element.manager_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="buttons-block">
                                <button className="grey-button" type="chancel" onClick={(e) => handleChancel(e)}>Отменить</button>
                                <button className="filed-button" type="submit">Сохранить</button>
                            </div>
                        </form>
                    </>
                ):("")}
            </div>
        </div>
    )
}