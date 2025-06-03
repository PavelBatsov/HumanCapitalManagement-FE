import "./Home.css"

const Home = (props) => {
return <h2 className="home">
    Welcome
    <br />
    { 
        props.currentUserData ? 
        <span>
            Name: {props.currentUserData.user.firstName} {props.currentUserData.user.lastName} 
            <br />
            Email: {props.currentUserData.user.email}
        </span> : null
    }
</h2>
}

export default Home