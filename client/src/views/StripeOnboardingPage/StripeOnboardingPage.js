import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Progress } from "antd";
import qs from "querystring";

// stylesheets
import "./stripe-onboarding-page.scss";
import { validateOnboardingToken } from "../../api/stripe";

const ProgressBar = ({ complete, error, progressRate }) => {
    const [percent, setPercent] = useState(45);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setPercent((percent) => {
                let progressStep = null;

                if (percent > 80) progressStep = 1;
                if (percent > 92) progressStep = 0.07;

                const updatedPercent = percent + (progressStep !== null ? progressStep : percent * (progressRate || 0.3));
                return updatedPercent;
            });
        }, 70);
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log(error, "error");
        if (error) clearInterval(intervalRef.current);
    }, [error]);

    useEffect(() => {
        if (complete) {
            console.log("lol");
            clearInterval(intervalRef.current);
            setPercent(100);
        }
    }, [complete]);

    return (
        <Progress
            strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
            }}
            status={error ? "exception" : complete ? "" : "active"}
            percent={percent}
        />
    );
};

const StripeOnboardingPage = () => {
    const location = useLocation();
    const history = useHistory();
    const [error, setError] = useState(false);
    const [complete, setComplete] = useState(false);

    const requestValidation = async () => {
        try {
            const { code, state } = qs.parse(location.search.slice(1));
            await validateOnboardingToken({ code, state });
            setTimeout(() => setComplete(true), 80);
            setTimeout(() => history.push("/worker"), 700);
        } catch (err) {
            setTimeout(() => setError(true), 80);
            console.error(err);
        }
    };

    useEffect(() => {
        requestValidation();
        //eslint-disable-next-line
    }, []);

    return (
        <div className="stripe-onboarding-page">
            <div className="main-title page-title">Wait while we onboard you ...</div>
            <div className="gap x2"></div>
            {error && (
                <>
                    <div className="text center sub-text"> Onboarding failed </div>
                    <div className="gap"></div>
                </>
            )}
            {complete && (
                <>
                    <div className="text center sub-text"> Onboarding success </div>
                    <div className="gap"></div>
                </>
            )}
            <div className="progress-bar-section">
                <ProgressBar complete={complete} error={error} progressRate={0.8} />
            </div>
        </div>
    );
};

export default StripeOnboardingPage;
