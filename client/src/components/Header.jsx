export default function Header() {
    return (
        <header className="header-block">
            <div className="header-block-left-part">
                <img src="/images/logo.png" alt="Logo" />
                <h1>Polden.recruiting</h1>
            </div>
            <div className="header-block-right-part">
                <img
                    src="/images/avatar.png"
                    className="header-block-right-part-avatar"
                    alt="header-block-right-part-avatar"
                />
                <span className="header-block-right-part-name">
                    Крылов Никита РК6-74Б
                </span>
            </div>
        </header>
    );
}
