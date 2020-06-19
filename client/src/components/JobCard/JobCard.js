import React from "react";
import { Button, Tag } from "antd";

// stylesheet
import "./jobcard.scss";

export const JobCardWorker = ({ title, description, price, onOkay }) => {
    return (
        <div className="job-card">
            <div className="sub-title x2 job-title color-primary dark">{title}</div>
            <div className="gap" />
            <div className="sub-text job-secription color-secondary dark">{description}</div>
            <div className="gap"></div>
            <div className="price">
                <label> Price: </label>
                <div className="hgap"></div>
                <p>{price}</p>
            </div>
            <div className="gap"></div>
            <div>
                <Button type="primary" shape="round" className="elevation-2" onClick={onOkay}>
                    Do this job
                </Button>
            </div>
        </div>
    );
};

export const JobCardHirer = ({ title, description, price, status }) => {

    const statusColor = {
        "done": 'green',
        "hold": "blue",
        "expired": "red"
    }

    return (
        <div className="job-card">
            <div className="sub-title x2 job-title color-primary dark">{title}</div>
            <div className="gap" />
            <div className="sub-text job-secription color-secondary dark">{description}</div>
            <div className="gap"></div>
            <div className="price">
                <label> Price: </label>
                <div className="hgap"></div>
                <p>{price}</p>
            </div>
            <div className="gap"></div>
            <div>
                <Tag color={statusColor[status] || 'magenta'}>{ status }</Tag> 
            </div>
        </div>
    );
};

