const NonEditAbleForm = ({ user }) => {
    return (
        <div>
            <div className="bioBox">
                <div className="title">Username : </div>
                <div className="desc">{user.username}</div>
            </div>
            <div className="bioBox">
                <div className="title">Email : </div>
                <div className="desc">{user.email}</div>
            </div>
            <div className="bioBox">
                <div className="title">Mobile : </div>
                <div className="desc">{user.mobile}</div>
            </div>
            <div className="bioBox">
                <div className="title">User Role : </div>
                <div className="desc">{user.role}</div>
            </div>
        </div>
    );
};

export default NonEditAbleForm;
