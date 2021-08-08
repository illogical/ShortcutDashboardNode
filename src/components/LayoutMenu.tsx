import React from 'react';
import { ILayout } from '../models/layout';

interface LayoutMenuProps {
    selectedLayout: ILayout;
    layouts: ILayout[];
    isOpen: boolean;
    close: () => void;
    selectLayout: (layout: ILayout) => void;
}

export const LayoutMenu = ({
    layouts,
    selectedLayout,
    isOpen,
    close,
    selectLayout,
}: LayoutMenuProps) => {
    const openClass = isOpen ? 'open' : '';

    const layoutDisplay = layouts.map((l) => {
        const selectedClass =
            l.name.toLowerCase() === selectedLayout.name.toLowerCase() ? 'selected' : '';
        const appClick = () => selectLayout(l);

        return (
            <div key={l.name} className={`app ${selectedClass}`} onClick={appClick}>
                {l.name.toUpperCase()}
            </div>
        );
    });

    return (
        <div className={`panel-wrap ${openClass}`}>
            <div className="panel">
                <div className="close-icon" onClick={close}>
                    <i className="fad fa-sign-out-alt fa-2x"></i>
                </div>
                <div className="title panel-title">APPLICATION PROFILES</div>
                <div>{layoutDisplay}</div>
            </div>
        </div>
    );
};
