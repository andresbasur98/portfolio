"use client";

import { useEffect, useState } from "react";
import type { EmailTemplate } from "../data/resources";

type PreviewWidth = "desktop" | "mobile";

export function EmailTemplatePreview({
  templates,
}: {
  templates: readonly EmailTemplate[];
}) {
  const [selectedId, setSelectedId] = useState(templates[0].id);
  const [previewWidth, setPreviewWidth] = useState<PreviewWidth>("desktop");
  const selectedTemplate =
    templates.find((template) => template.id === selectedId) ?? templates[0];

  useEffect(() => {
    function selectFromHash() {
      const id = window.location.hash.replace("#tab-", "");
      const matchingTemplate = templates.find((template) => template.id === id);
      if (matchingTemplate) setSelectedId(matchingTemplate.id);
    }

    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, [templates]);

  function selectAdjacentTemplate(currentIndex: number, direction: 1 | -1) {
    const nextIndex =
      (currentIndex + direction + templates.length) % templates.length;
    const nextTemplate = templates[nextIndex];
    setSelectedId(nextTemplate.id);
    requestAnimationFrame(() => {
      document.getElementById(`tab-${nextTemplate.id}`)?.focus();
    });
  }

  return (
    <section className="resource-preview-section" aria-labelledby="preview-title">
      <div className="resource-section-heading">
        <div>
          <p className="eyebrow">Vista previa real</p>
          <h2 id="preview-title">Explora antes de descargar</h2>
        </div>
        <p>
          Cambia de plantilla y de ancho para revisar el mismo HTML que recibirás
          en la descarga.
        </p>
      </div>

      <div className="preview-toolbar">
        <div
          className="preview-tabs"
          role="tablist"
          aria-label="Seleccionar plantilla"
        >
          {templates.map((template, index) => {
            const isSelected = template.id === selectedTemplate.id;
            return (
              <button
                key={template.id}
                id={`tab-${template.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="email-preview-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedId(template.id)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight") {
                    event.preventDefault();
                    selectAdjacentTemplate(index, 1);
                  }
                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    selectAdjacentTemplate(index, -1);
                  }
                  if (event.key === "Home") {
                    event.preventDefault();
                    setSelectedId(templates[0].id);
                    requestAnimationFrame(() =>
                      document.getElementById(`tab-${templates[0].id}`)?.focus(),
                    );
                  }
                  if (event.key === "End") {
                    event.preventDefault();
                    const lastTemplate = templates[templates.length - 1];
                    setSelectedId(lastTemplate.id);
                    requestAnimationFrame(() =>
                      document.getElementById(`tab-${lastTemplate.id}`)?.focus(),
                    );
                  }
                }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {template.name}
              </button>
            );
          })}
        </div>

        <div className="preview-device-switch" aria-label="Ancho de la vista previa">
          <button
            type="button"
            aria-pressed={previewWidth === "desktop"}
            onClick={() => setPreviewWidth("desktop")}
          >
            Escritorio · 600 px
          </button>
          <button
            type="button"
            aria-pressed={previewWidth === "mobile"}
            onClick={() => setPreviewWidth("mobile")}
          >
            Móvil · 375 px
          </button>
        </div>
      </div>

      <div
        id="email-preview-panel"
        className="email-preview-panel"
        role="tabpanel"
        aria-labelledby={`tab-${selectedTemplate.id}`}
      >
        <div className="preview-browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <p>{selectedTemplate.name} · desplázate para ver el email completo</p>
        </div>
        <div className="preview-scroll-area">
          <div
            className={`preview-frame-shell is-${previewWidth}`}
            style={{ width: previewWidth === "desktop" ? 600 : 375 }}
          >
            <iframe
              key={`${selectedTemplate.id}-${previewWidth}`}
              src={selectedTemplate.fileUrl}
              title={selectedTemplate.previewTitle}
              sandbox=""
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
