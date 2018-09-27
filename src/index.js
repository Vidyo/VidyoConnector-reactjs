import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VidyoConnector from './VidyoConnector';
import registerServiceWorker from './registerServiceWorker';

const host                  = getUrlParameterByName("host", "prod.vidyo.io");
const token                 = getUrlParameterByName("token");
const resourceId            = getUrlParameterByName("resourceId", "demoRoom");
const displayName           = getUrlParameterByName("displayName", "Guest");
const useTranscodingWebRTC  = getUrlParameterByName("useTranscodingWebRTC", false);
const plugin                = getUrlParameterByName("plugin", false);

loadRemoteVidyoClientLib(useTranscodingWebRTC, plugin);

const viewId                = "renderer";
const viewStyle             = "VIDYO_CONNECTORVIEWSTYLE_Default";
const remoteParticipants    = 8;
const logFileFilter         = "warning all@VidyoConnector info@VidyoClient";
const logFileName           = "";
const userData              = "";

ReactDOM.render(<VidyoConnector 
                    host        = { host }
                    token       = { token }
                    resourceId  = { resourceId }
                    displayName = { displayName }
                    viewId             = { viewId }
                    viewStyle          = { viewStyle }
                    remoteParticipants = { remoteParticipants }
                    logFileFilter      = { logFileFilter }
                    logFileName        = { logFileName }
                    userData           = { userData }
                />, 
                document.getElementById('root'));

registerServiceWorker();

function loadRemoteVidyoClientLib(useTranscodingWebRTC = false, plugin = false) {
    let script  = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = `https://static.vidyo.io/latest/javascript/VidyoClient/VidyoClient.js?onload=onVidyoClientLoaded&useTranscodingWebRTC=${useTranscodingWebRTC}&plugin=${plugin}&webrtcLogLevel=info`;
    document.getElementsByTagName('head')[0].appendChild(script);
}

function getUrlParameterByName(name, _default = '') {
    let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return (match && decodeURIComponent(match[1].replace(/\+/g, ' '))) || _default;
}
