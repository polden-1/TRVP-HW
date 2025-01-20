import { useEffect, useState } from "react"
import { fetchAllData, addManager, addSkill } from "../requests";

import Card from "./ui/Card";
import AddManager from "./forms/AddManager";
import AddSkill from "./forms/AddSkill";

export default function Main() {
    const [data, setData] = useState([]);
    const [shown, setShown] = useState(false);
    const [shown2, setShown2] = useState(false);

    useEffect(() => {
        fetchAllData(setData);
    }, [])

    return (
        <>
            <div className="main-block-menu">
                {!shown && (<button className="filed-button" onClick={() => {setShown(true); window.scrollTo(0,0);}}>Добавить менеджера</button>)}
                {!shown2 && (<button className="filed-button" onClick={() => {setShown2(true); window.scrollTo(0,0);}}>Добавить навык</button>)}
            </div>
            <main className="main-block">
                {(shown || shown2) && (
                    <div className="main-block-form">
                        {shown && (
                            <AddManager setShown={setShown} requestFunction={addManager}/>
                        )}
                        {shown2 && (
                            <AddSkill setShown={setShown2} requestFunction={addSkill}/>
                        )}
                    </div>
                )}

                <div className="main-block-list">
                    {data.map((element, index) => {
                        return (
                            <Card key={index} data={element} allData={data}/>
                        )
                    })}
                </div>
            </main>
        </>
    )
}