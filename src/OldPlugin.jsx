import React, { useEffect, useRef, useState } from 'react'

function ExtractionLaunch() {

    const iframeRef = useRef(null);
    const [pluginReady, setPluginReady] = useState(false);

    const onCancel = () => { }

    useEffect(() => {

        // local-dev
        // const iframeconfig = {
        //     appflyte_backend_url: "https://api-dev.appflyte.net",
        //     appflyte_agent_api_token: "a5febdcf-d165-4cac-81de-b4983570caed",
        //     appflyte_project_id: "a167154f-df7d-43f1-88c7-f1657a826a68",
        //     extraction_task_id: "98ee16f1-22e4-4fd5-a8a3-bcec867dd20c",
        //     onCancel: () => console.log("hi"),
        //     onSave: () => console.log("hi")
        // };

        // const iframeconfig = {
        //     appflyte_backend_url: "https://api-dev.appflyte.net",
        //     appflyte_agent_api_token: "01572b07-ed0c-4a21-b8f2-5570d4f56fe1",
        //     appflyte_project_id: "ff88f3aa-9440-42af-bed3-9719ca8753d8",
        //     extraction_task_id: "7556634b-13d8-4af6-9015-63e015d743b9",
        //     onCancel: () => console.log("hi"),
        //     onSave: () => console.log("hi")
        // };

        // local-qat
        // const iframeconfig = {
        //     appflyte_backend_url: "https://backend.sandbox.ameya.ai",
        //     appflyte_agent_api_token: "184451e7-bb82-4ce1-b833-4d4032768ee9",
        //     appflyte_project_id: "ae7e5874-edd1-4cbd-8ee6-b85119a29abf",
        //     extraction_task_id: "0e90710f-2732-4df6-8236-3e10ae1d0402",
        //     onCancel: () => console.log("hi"),
        //     onSave: () => console.log("hi")
        // };

        // // sfs-qat
        const iframeconfig = {
            appflyte_backend_url: "https://appflyte-backend.smartfoodsafe.net",
            appflyte_agent_api_token: "e50ae690-ef1b-405e-9424-926b6621a81b",
            appflyte_project_id: "46a355ef-cbf3-4be8-9887-4ded1b1302c8",
            extraction_task_id: "aec9e5d9-e38f-4800-85b9-112d14264fbc",
            onCancel: () => console.log("hi"),
            onSave: () => console.log("hi")
        };

        //                 "project_id": "46a355ef-cbf3-4be8-9887-4ded1b1302c8",
        // token"  e50ae690-ef1b-405e-9424-926b6621a81b             
        //    "document_type": "8c9c8acb-ccc4-4fab-b3e1-35cffbfe97c1"

        //         "organization_id": "9a7f2790-46e1-41dc-8bfd-4e2e750676b5",

        //  "schema": "ed8d7dde-ba08-493c-9b58-f2da634d00ed",

        // tasked: aec9e5d9-e38f-4800-85b9-112d14264fbc



        // "tags": {
        //                     "clientId": "5f816b3d3250d83074a82c32",
        //                     "documentTypeId": "8c9c8acb-ccc4-4fab-b3e1-35cffbfe97c1",
        //                     "projectId": "46a355ef-cbf3-4be8-9887-4ded1b1302c8",
        //                 }

        const theme = {
            palette: {
                primary: { main: '#F3F5F7' },
                secondary: { main: '#ffffff' },
                background: { default: '#F3F5F7', paper: '#ffffff' },
                text: { primary: '#000000' },
            },
            customColors: {
                button: {
                    primary: '#0B51C5',
                    secondary: '#DEDEDE',
                    ternary: '#000000',
                },
                ternary: { main: '#DEDEDE', contrastText: '#000' },
            },
            typography: { fontFamily: 'Inter' },
        };

        const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;
        if (!iframeDoc) return;

        iframeDoc.open();
        iframeDoc.write("<html><head></head><body></body></html>");
        iframeDoc.close();

        const link = iframeDoc.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap";
        iframeDoc.head.appendChild(link);

        const script = iframeDoc.createElement("script");
        // script.src = 'https://dpod-aws-s3.s3.us-east-1.amazonaws.com/web-plugins/ameya-extraction/sfs/test/ameya-extraction.js';
        // script.src = 'https://ameya-extraction.ameya.ai';
        script.src = 'https://ameya-extraction-plugin.ameya.ai'

        script.onload = () => {
            iframeconfig.onCancel = () => {
                iframeDoc.body.innerHTML = "";
                onCancel(false);
            };
            iframeRef.current.contentWindow.AmeyaExtraction(theme, iframeconfig);
        };

        script.onerror = () => {
            alert("Failed to load AmeyaExtraction, please try again");
        };

        iframeDoc.head.appendChild(script);
    }, [])

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <iframe
                ref={iframeRef}
                title="Ameya Extraction"
                style={{ width: "100%", height: "100vh", border: "none" }}
                allow="fullscreen"
            />
        </div>
    )
}
export default ExtractionLaunch;