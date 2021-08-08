import { IButtonInfo } from '../models/buttonInfo';
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { LayoutMenu } from '../components/LayoutMenu';
import '../styles/slidingPanel.css';
import { ILayout } from '../models/layout';

export const useSettingsButtons = (
    layouts: ILayout[],
    color: string,
    setEditEnabled: () => void
) => {
    const [, setIsSettingsOpen] = useState(false);
    const [forceLabels, setForceLabels] = useState(false);
    const [appMenuOpen, setAppMenuOpen] = useState(false);
    const [selectedLayout, setSelectedLayout] = useState(layouts[0]); // blender? TODO: support a default app

    /* TODO: create a useEditMode that tracks editEnabled? needs to supply an onclick event for selecting buttons (and somehow allow editing groups)
    -needs to supply components for editing groups and buttons
  */

    const toggleForceLabel = () => {
        setForceLabels((x) => !x);
    };

    const toggleSettings = () => {
        setIsSettingsOpen((x) => !x);
    };

    const toggleEdit = () => {
        setEditEnabled();
    };

    const showAppMenu = () => setAppMenuOpen(true);
    const hideAppMenu = () => setAppMenuOpen(false);
    const selectLayout = (layout: ILayout) => setSelectedLayout(layout);

    const systemButtonsComponent = (
        <SystemButtons
            color={color}
            forceLabels={forceLabels}
            showAppMenu={showAppMenu}
            toggleEdit={toggleEdit}
            toggleForceLabel={toggleForceLabel}
            toggleSettings={toggleSettings}
        />
    );

    const applicationMenuComponent = (
        <LayoutMenu
            isOpen={appMenuOpen}
            close={hideAppMenu}
            layouts={layouts}
            selectLayout={selectLayout}
            selectedLayout={selectedLayout}
        ></LayoutMenu>
    );

    return [
        systemButtonsComponent,
        applicationMenuComponent,
        forceLabels,
        selectedLayout,
        selectLayout,
    ] as const;
};

interface ISystemButtonsProps {
    color: string;
    forceLabels: boolean;
    toggleForceLabel: () => void;
    toggleSettings: () => void;
    toggleEdit: () => void;
    showAppMenu: () => void;
}

const SystemButtons = ({
    color,
    forceLabels,
    toggleForceLabel,
    toggleSettings,
    toggleEdit,
    showAppMenu,
}: ISystemButtonsProps) => {
    const editBtn: IButtonInfo = {
        id: -1,
        label: 'Edit Mode',
        area: 'settings',
        command: {
            // uses a custom onClick
        },
    };

    const labelToggleBtn: IButtonInfo = {
        id: -2,
        label: 'Toggle Icons',
        area: 'settings',
        command: {
            // uses a custom onClick
        },
    };

    const appBtn: IButtonInfo = {
        id: -3,
        label: 'Switch App',
        area: 'settings',
        command: {
            // uses a custom onClick
        },
    };

    const settingsBtn: IButtonInfo = {
        id: -4,
        label: 'Settings',
        area: 'settings',
        icon: 'fad fa-cog fa-3x',
        command: {
            // uses a custom onClick
        },
    };

    const defaultStyle = {
        borderColor: color,
        forceLabel: forceLabels,
        editEnabled: false,
        index: 0,
    };

    return (
        <React.Fragment>
            <Button
                {...defaultStyle}
                buttonInfo={editBtn}
                key={editBtn.label}
                onClick={toggleEdit}
            />
            <Button
                {...defaultStyle}
                buttonInfo={labelToggleBtn}
                key={labelToggleBtn.label}
                onClick={toggleForceLabel}
            />
            <Button {...defaultStyle} buttonInfo={appBtn} onClick={showAppMenu} />
            <Button
                {...defaultStyle}
                buttonInfo={settingsBtn}
                key={settingsBtn.label}
                onClick={toggleSettings}
            />
        </React.Fragment>
    );
};
