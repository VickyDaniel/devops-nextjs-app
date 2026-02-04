'use client';

import { useEffect } from 'react';

export default function ApiDocs() {
  useEffect(() => {
    // Load Swagger UI CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css';
    document.head.appendChild(link);

    // Load Swagger UI JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js';
    script.onload = () => {
      // @ts-expect-error Swagger UI loaded dynamically
      window.SwaggerUIBundle({
        url: '/openapi.json',
        dom_id: '#swagger-ui',
        presets: [
          // @ts-expect-error Swagger UI loaded dynamically
          window.SwaggerUIBundle.presets.apis,
          // @ts-expect-error Swagger UI loaded dynamically
          window.SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: 'BaseLayout'
      });
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      <div id="swagger-ui" />
    </div>
  );
}
