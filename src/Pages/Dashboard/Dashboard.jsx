const Dashboard = (props) => {

return <div>
    <p> Dashboard Page {props.currentUserData.userName} {props.currentUserData.email}</p>
    {console.log(props.currentUserData.accessToken)}
</div>
}

export default Dashboard