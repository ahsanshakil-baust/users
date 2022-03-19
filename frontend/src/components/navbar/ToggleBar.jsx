import React from "react";

export default function ToggleBar({ classes, ...rest }) {
    return (
        <div {...rest} className={classes}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}
