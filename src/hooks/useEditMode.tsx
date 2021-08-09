import React, { useState } from 'react';
import { IButtonInfo } from '../models/buttonInfo';
import { IGroupInfo } from '../models/groupInfo';
import { IConfig } from '../models/config';
import '../styles/editPanel.css';
import { EditButtonPanel } from '../components/EditButtonPanel';
import { EditGroupPanel } from '../components/EditGroupPanel';
import { Area } from '../models/enums';
import { ISelectedInfo } from '../models/selectedInfo';

export const useEditMode = (
    config: IConfig,
    selectedInfo: ISelectedInfo,
    saveConfig: (saveConfig: IConfig) => void,
    previewConfig: (saveConfig: IConfig) => void, // TODO: should this pass something up or should this be a variable being passed down?
    setSelectedInfo: (selectedInfo: ISelectedInfo) => void,
    exitEdit: () => void
) => {
    //const [editMode, setEditMode] = useState<"button" | "group">("button");
    const [focusedGroupId, setFocusedGroupId] = useState<number | undefined>();

    // TODO: keep history of config and add an UNDO button. So save on Blur?
    const [configHistory, setConfigHistory] = useState([{ ...config }]);
    //const [configHistoryPosition, setConfigHistoryPosition] = useState(0);

    // TODO: track a new button
    // TODO: plus icon needs to open the EditButtonPanel
    const [newButton, setNewButton] = useState<IButtonInfo>({
        id: -1,
        label: '',
        command: {},
    });

    // TODO: need to provide a list of the areas that can have groups added
    const [newGroup] = useState<IGroupInfo>({
        id: -1,
        name: '',
        appId: -1,
        tag: '',
        area: 'main',
    });

    const addToHistory = () => {
        setConfigHistory((x) => {
            return [...x, config];
        });
    };

    const handleCreateButton = () => setSelectedInfo({ ...selectedInfo, button: newButton });
    const handleCreateGroup = () => setSelectedInfo({ ...selectedInfo, group: newGroup });

    const handleButtonChange = (button: IButtonInfo) => {
        if (button.id === -1) {
            const updatedConfig = {
                ...config,
                buttons: [
                    ...config.buttons,
                    {
                        ...button,
                    },
                ],
            };

            previewConfig(updatedConfig);

            return;
        }

        previewConfig(updateConfig(config, button));
    };

    const handleSaveButton = (button: IButtonInfo) => {
        if (button.id === -1) {
            // this is a new button
            const newId = config.appSettings.lastId; // TODO: replace this with a function that finds prior highest ID

            // TODO: how to know what group to add the buttons to? There was a dropdown
            const updatedConfig: IConfig = {
                ...config,
                appSettings: {
                    ...config.appSettings,
                    lastId: newId + 1,
                },
                buttons: [
                    ...config.buttons,
                    {
                        ...button,
                        id: newId,
                    },
                ],
                layouts: config.layouts.map((l) => {
                    if (l.name === selectedInfo.layout.name) {
                        // TODO: update layout.Relationships
                        return selectedInfo.layout;
                    }

                    return l;
                }),
            };

            // TODO: update selectedInfo.layout for Relationships if a button moved. How to know button moved (via change group or area dropdowns)? Assume selectedLayout has been updated?

            saveConfig(updatedConfig);
            exitEdit();

            return;
        }

        saveConfig(updateConfig(config, button));
        exitEdit();
    };

    const handleSaveGroup = (group: IGroupInfo) => {};

    const handleDiscard = () => {
        previewConfig(config); // reset to the loaded config
        exitEdit();
    };

    const editButtonPanelComponent = (
        <EditButtonPanel
            panelTitle="EDIT BUTTON"
            layout={selectedInfo.layout}
            config={config}
            selectedButton={selectedInfo.button}
            onSave={handleSaveButton}
            onDiscard={handleDiscard}
            onGroupFocus={setFocusedGroupId}
            onCreate={handleCreateButton}
            onChange={handleButtonChange}
        />
    );

    const editGroupPanelComponent = (
        <EditGroupPanel
            panelTitle="EDIT GROUP"
            config={config}
            selectedInfo={selectedInfo}
            onSave={handleSaveGroup}
            onDiscard={handleDiscard}
            onGroupFocus={setFocusedGroupId}
            onCreateGroup={handleCreateGroup}
        />
    );

    const showPanel = selectedInfo?.group ? editGroupPanelComponent : editButtonPanelComponent;

    return [showPanel, focusedGroupId] as const;
};

// look up button and replace it
const updateConfig = (config: IConfig, button: IButtonInfo) => {
    return {
        ...config,
        buttons: config.buttons.reduce((prev, cur) => {
            if (cur.id === button.id) {
                return [...prev, button];
            }
            return [...prev, cur];
        }, [] as IButtonInfo[]),
    };
};
