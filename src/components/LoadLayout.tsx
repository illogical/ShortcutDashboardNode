import * as React from 'react';
import { LayoutConfig } from './LayoutConfig';
import '../styles/layout2.css';
import { ReactComponent as Loader } from '../styles/three-dots.svg';
import { useConfigApi } from '../hooks/useConfigApi';

export const LoadLayout = () => {
    const { config, updateConfig } = useConfigApi();

    //show loader
    if (!config) {
        return (
            <div className={`loader`}>
                <Loader />
            </div>
        );
    }

    return (
        <React.Fragment>
            <LayoutConfig config={config} saveConfig={updateConfig}></LayoutConfig>
        </React.Fragment>
    );
};
