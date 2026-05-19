import React, { useEffect, useRef, useState, useMemo } from 'react';

function ExtractionTraining() {

    const [agentTokenId, setAgentTokenId] = useState(null);
    const [pluginReady, setPluginReady] = useState(false);

    const iframeRef = useRef(null);
    const pluginInitData = {
        plugin_type: "sfs_extraction_plugin",
        appflyte_backend_url: "https://backend.sandbox.ameya.ai",
        appflyte_agent_api_token: "184451e7-bb82-4ce1-b833-4d4032768ee9",
        appflyte_organization_id: "424e744f-94a5-4aae-b1ae-f24719f1a426",
        appflyte_project_id: "ae7e5874-edd1-4cbd-8ee6-b85119a29abf",
        extraction_document_type_id: "3319aa6a-6deb-4e75-8f91-81a8161e0d9e",
        extraction_document_type: "certificate_of_analysis",
        extraction_task_id: "594f87cc-1098-449b-a165-99fa8ae4f6fb",
    };

    // const training_plugin_url = "https://dev-test-extraction-training.ameya.ai"
    // const training_plugin_url = 'https://dpod-aws-s3.s3.us-east-1.amazonaws.com/web-plugins/ameya-extraction/test/extraction-training/training/index.html'
    const training_plugin_url = "http://dpod-aws-s3.s3-website-us-east-1.amazonaws.com/web-plugins/ameya-extraction/dev-test/extraction-training/training/index.html";
    // const training_plugin_url =
    // "https://dpod-aws-s3.s3.us-east-1.amazonaws.com/web-plugins/ameya-extraction/test/extraction-training/training/index.html";
    const S3_ORIGIN = "http://dpod-aws-s3.s3-website-us-east-1.amazonaws.com";

    useEffect(() => {
        const handleMessage = (event) => {
            if (
                event.origin === S3_ORIGIN &&
                event.data?.type === "PLUGIN_READY"
            ) {
                setPluginReady(true);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    useEffect(() => {
        if (!pluginReady) return;

        iframeRef.current?.contentWindow?.postMessage(
            {
                type: "PLUGIN_INIT",
                payload: pluginInitData,
            },
            S3_ORIGIN
        );
    }, [pluginReady]);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <iframe
                ref={iframeRef}
                src={training_plugin_url}
                title="Ameya Plugin"
                style={{ width: "100%", height: "100%", border: "none" }}
            />
        </div>
    );
}

export default ExtractionTraining;
