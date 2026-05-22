import React, { useEffect, useRef, useState } from 'react'

// const TRAINING_PLUGIN_URL = 'https://extraction-plugin-test.ameya.ai';
const TRAINING_PLUGIN_URL = 'https://ameya-extraction-plugin.ameya.ai' //sfs-qat

function ExtractionPluginSFSQat({ setPreviewMode }) {

    const iframeRef = useRef(null);
    const [pluginReady, setPluginReady] = useState(false);

    // const pluginPayload = {
    //     plugin_type: "sfs_extraction_plugin",
    //     appflyte_backend_url: "https://appflyte-backend.smartfoodsafe.net",
    //     appflyte_agent_api_token: "e50ae690-ef1b-405e-9424-926b6621a81b",
    //     appflyte_project_id: "46a355ef-cbf3-4be8-9887-4ded1b1302c8",
    //     extraction_task_id: "aec9e5d9-e38f-4800-85b9-112d14264fbc"
    // };

    const pluginPayload = {
        plugin_type: "sfs_extraction_plugin",
        appflyte_backend_url: "https://backend.sandbox.ameya.ai",
        appflyte_agent_api_token: "184451e7-bb82-4ce1-b833-4d4032768ee9",
        appflyte_project_id: "ae7e5874-edd1-4cbd-8ee6-b85119a29abf",
        extraction_task_id: "594f87cc-1098-449b-a165-99fa8ae4f6fb",
    };

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === "PLUGIN_READY") {
                console.log("Plugin ready");
                setPluginReady(true);
            }
            if (event.data?.type === "PLUGIN_BACK_CLICKED") {
                // hanlde your on back functionlity
                setPreviewMode();
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    useEffect(() => {
        if (!pluginReady) return;
        iframeRef.current?.contentWindow?.postMessage({ type: "PLUGIN_INIT", payload: pluginPayload }, TRAINING_PLUGIN_URL);
    }, [pluginReady]);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <iframe
                ref={iframeRef}
                src={TRAINING_PLUGIN_URL}
                title="Ameya Extraction"
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="fullscreen"
            />
        </div>
    )
}
export default ExtractionPluginSFSQat;
