import React, { useEffect, useRef, useState } from 'react'

const TRAINING_PLUGIN_URL = '';

function ExtractionLauncher() {

    const iframeRef = useRef(null);
    const [pluginReady, setPluginReady] = useState(false);

    const pluginPayload = {
        plugin_type: "sfs_extraction_plugin",
        appflyte_backend_url: "",
        appflyte_agent_api_token: "",
        appflyte_project_id: "",
        extraction_task_id: ""
    };

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === "PLUGIN_READY") {
                console.log("Plugin ready");
                setPluginReady(true);
            }
            if (event.data?.type === "PLUGIN_BACK_CLICKED") {
                // hanlde your on back functionlity
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
export default ExtractionLauncher;
