import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
// stylesheets
import "antd/dist/antd.css";
import "./styles/index.scss";

// views
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import WorkerDasboard from "./views/Worker/Worker";
import HirerDashboard from "./views/Hirer/Hirer";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { getToken } from "./utils/token";
import StripeOnboardingPage from "./views/StripeOnboardingPage/StripeOnboardingPage";

function App() {
    const location = useLocation();

    const transitions = useTransition(location, (location) => location.pathname, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    return transitions.map(({ item: location, props, key }) => (
        <animated.div className="main-wrapper" key={key} style={props}>
            <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route
                    exact
                    path="/worker"
                    render={(props) => (
                        <ProtectedRoute checkFunction={() => getToken()} redirectPath="/signup">
                            <WorkerDasboard {...props} />
                        </ProtectedRoute>
                    )}
                />
                <Route exact path="/onboard" component={StripeOnboardingPage}/>
                <Route exact path="/hirer" component={HirerDashboard} />
            </Switch>
        </animated.div>
    ));
}

export default App;
