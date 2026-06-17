import React, { useEffect, useRef, useState } from 'react'

const TRAINING_PLUGIN_URL = 'https://extraction-plugin-test.ameya.ai';

function DpodNewExtractionTraining({ setPreviewMode }) {

    const iframeRef = useRef(null);
    const [pluginReady, setPluginReady] = useState(false);

    // const pluginPayload = {
    //     plugin_type: "sfs_extraction_plugin",
    //     appflyte_backend_url: "https://appflyte-backend.smartfoodsafe.net",
    //     appflyte_agent_api_token: "e50ae690-ef1b-405e-9424-926b6621a81b",
    //     appflyte_project_id: "46a355ef-cbf3-4be8-9887-4ded1b1302c8",
    //     extraction_task_id: "aec9e5d9-e38f-4800-85b9-112d14264fbc"
    // };

    // const pluginPayload = {
    //     plugin_type: "sfs_extraction_plugin",
    //     appflyte_backend_url: "https://backend.sandbox.ameya.ai",
    //     appflyte_agent_api_token: "184451e7-bb82-4ce1-b833-4d4032768ee9",
    //     appflyte_project_id: "ae7e5874-edd1-4cbd-8ee6-b85119a29abf",
    //     extraction_task_id: "594f87cc-1098-449b-a165-99fa8ae4f6fb",
    // };


    // //    sfs-qat
    // const pluginPayload = {
    //     "plugin_type": "sfs_extraction_plugin",
    //     "appflyte_backend_url": "https://appflyte-backend.smartfoodsafe.net",
    //     "appflyte_agent_api_token": "d78687d8-c6e9-4903-8659-046dc77891aa",
    //     "appflyte_project_id": "ac6022f9-fb0f-4952-a72b-eb277f5da02c",
    //     "extraction_task_id": "57394fa5-4be4-4f4e-8111-beb9fa47a0da"
    // }

    // const pluginPayload =

    // {
    //     "plugin_type": "sfs_extraction_plugin",
    //     "appflyte_backend_url": "https://appflyte-backend.smartfoodsafe.net",
    //     "appflyte_agent_api_token": "510017cc-ef2d-4aa1-93c6-d63a074d17e8",
    //     "appflyte_project_id": "ac6022f9-fb0f-4952-a72b-eb277f5da02c",
    //     "extraction_task_id": "57394fa5-4be4-4f4e-8111-beb9fa47a0da"
    // }

    // {
    //     "plugin_type": "sfs_extraction_plugin",
    //     "appflyte_backend_url": "https://appflyte-backend.smartfoodsafe.net",
    //     "appflyte_agent_api_token": "510017cc-ef2d-4aa1-93c6-d63a074d17e8",
    //     "appflyte_project_id": "ac6022f9-fb0f-4952-a72b-eb277f5da02c",
    //     "extraction_task_id": "91796c95-6720-4157-9712-8f3ddbaf074e"
    // }

    // {
    //     "plugin_type": "sfs_extraction_plugin",
    //     "appflyte_backend_url": "https://appflyte-backend.ameya.smartfoodsafe.com",
    //     "appflyte_agent_api_token": "255c9715-e5a3-458a-afd0-2be51d21cbd7",
    //     "appflyte_project_id": "031b3a12-d04b-46b4-8418-f13ed3422834",
    //     "extraction_task_id": "0d09cd9b-5489-4231-9138-6b8fc4abe3cc"
    // }


    // const pluginPayload = {
    //     appflyte_backend_url: "https://backend.sandbox.ameya.ai",
    //     appflyte_agent_api_token: "810a6da9-e0df-46ff-a95a-3329c2b12ebe",
    //     appflyte_organization_id: "424e744f-94a5-4aae-b1ae-f24719f1a426",
    //     appflyte_project_id: "ae7e5874-edd1-4cbd-8ee6-b85119a29abf",
    //     extraction_document_type_id: "8cdf6769-2a71-4922-85c7-371c680c9d43",
    //     extraction_document_type: "certificate_of_analysis",
    // };

    const pluginPayload = {
        "plugin_type": "sfs_extraction_plugin",
        "appflyte_backend_url": "https://backend.sandbox.ameya.ai",
        "appflyte_agent_api_token": "810a6da9-e0df-46ff-a95a-3329c2b12ebe",
        "appflyte_project_id": "ae7e5874-edd1-4cbd-8ee6-b85119a29abf",
        "extraction_task_id": "0a41f4bb-ea0c-4b1f-bd96-b033d291f347"
    }

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
export default DpodNewExtractionTraining;
