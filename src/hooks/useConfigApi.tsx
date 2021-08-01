import React from 'react';
import { getConfig, saveConfig } from '../api/keySettings';
import { remapConfig } from '../helpers/remapConfig';
import { IConfig } from '../models/config';

export const useConfigApi = () => {
    const [config, setConfig] = React.useState<IConfig>();

    const fetchConfig = async () => {
        const { data } = await getConfig();
        console.log('Settings:', data);

        const fetchedConfig = {
            ...data,
            areas: ['main', 'top', 'bottom', 'common'],
        };

        setConfig(fetchedConfig);
        return fetchedConfig;
    };

    const updateConfig = async (updatedConfig: IConfig) => {
        try {
            await saveConfig(updatedConfig);

            setConfig(updatedConfig);
        } catch (error) {
            console.error('Failed to save config.');
        }
    };

    const fetchThenUpdate = async () => {
        const config = await fetchConfig();
        await updateConfig(remapConfig(config));
    };

    React.useEffect(() => {
        // TODO: TEMP CONFIG REMAP
        //fetchThenUpdate();
        fetchConfig();
    }, []);

    return { config, fetchConfig, updateConfig };
};
