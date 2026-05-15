import React, { useEffect, useRef } from 'react'

function ExtractionLauncher() {

    const iframeRef = useRef(null);

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

        // local-qat
        const iframeconfig = {
            appflyte_backend_url: "https://backend.sandbox.ameya.ai",
            appflyte_agent_api_token: "184451e7-bb82-4ce1-b833-4d4032768ee9",
            appflyte_project_id: "ae7e5874-edd1-4cbd-8ee6-b85119a29abf",
            extraction_task_id: "0e90710f-2732-4df6-8236-3e10ae1d0402",
            onCancel: () => console.log("hi"),
            onSave: () => console.log("hi")
        };

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
export default ExtractionLauncher;