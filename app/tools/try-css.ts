/** Shared styling for the in-browser tool playgrounds (/tools/<slug>/try). */
export const TRY_CSS = `
.pt{max-width:940px;margin:0 auto}
.pt-modes{display:inline-flex;border:1px solid var(--hairline-2);border-radius:10px;overflow:hidden;margin-bottom:16px}
.pt-mode{background:none;border:0;border-right:1px solid var(--hairline);color:var(--muted);padding:9px 18px;font-size:13.5px;font-family:inherit;cursor:pointer;transition:.15s}
.pt-mode:last-child{border-right:0}
.pt-mode.on{background:var(--accent);color:#0a0e17;font-weight:600}
.pt-mode:not(.on):hover{color:var(--fg);background:var(--panel-hover)}
.pt-controls{display:flex;align-items:flex-end;gap:14px;margin-bottom:14px;flex-wrap:wrap}
.pt-arrow{color:var(--faint);padding-bottom:9px}
.pt-lbl{display:block;font-size:12px;color:var(--faint);margin-bottom:5px}
.pt-select{background:var(--panel-2);border:1px solid var(--hairline-2);border-radius:9px;padding:9px 12px;color:var(--fg);font-family:inherit;font-size:13.5px;outline:none;cursor:pointer}
.pt-select:focus{border-color:var(--accent)}
.pt-grid{display:grid;grid-template-columns:1fr;gap:12px}
.pt-grid.two{grid-template-columns:1fr 1fr}
@media(max-width:640px){.pt-grid.two{grid-template-columns:1fr}}
.pt-pane-lbl{font-size:12px;color:var(--faint);margin-bottom:6px}
.pt-area{width:100%;background:#0A0E18;border:1px solid var(--hairline-2);border-radius:11px;padding:13px 14px;color:#e8e8f0;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:13px;line-height:1.55;outline:none;resize:vertical;min-height:150px}
.pt-area:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.pt-field{margin-top:14px}
.pt-input{width:100%;background:var(--panel-2);border:1px solid var(--hairline-2);border-radius:10px;padding:11px 13px;color:var(--fg);font-family:ui-monospace,Menlo,monospace;font-size:13.5px;outline:none}
.pt-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-soft)}
.pt-row{display:flex;gap:10px}
@media(max-width:560px){.pt-row{flex-direction:column}}
.pt-url{flex:1;min-width:0}
.pt-kv{display:flex;flex-direction:column;gap:8px;margin-top:8px}
.pt-kv-row{display:grid;grid-template-columns:1fr 1.4fr 34px;gap:8px;align-items:center}
.pt-del{background:none;border:0;color:var(--faint);cursor:pointer;font-size:15px}
.pt-del:hover{color:#fb7185}
.pt-add{align-self:flex-start;background:var(--panel-2);border:1px solid var(--hairline-2);border-radius:9px;color:var(--muted);padding:7px 14px;font-size:13px;font-family:inherit;cursor:pointer;margin-top:8px}
.pt-add:hover{color:var(--fg);border-color:var(--accent)}
.pt-cli{display:flex;align-items:center;gap:10px;background:#0A0E18;border:1px solid var(--hairline);border-radius:11px;padding:11px 13px;margin-top:16px;overflow:hidden}
.pt-cli code{flex:1;font-family:ui-monospace,Menlo,monospace;font-size:12.5px;color:#e8e8f0;overflow-x:auto;white-space:nowrap}
.pt-run-row{margin-top:16px}
.pt-run:disabled{opacity:.6;cursor:default}
.pt-err{margin-top:16px;border:1px solid rgba(251,113,133,.4);background:rgba(251,113,133,.08);color:#fda4af;border-radius:11px;padding:13px 15px;font-size:13.5px;font-family:ui-monospace,Menlo,monospace;white-space:pre-wrap;line-height:1.55;overflow:auto}
.pt-out{margin-top:16px;border:1px solid var(--hairline-2);border-radius:13px;overflow:hidden;background:#0A0E18}
.pt-out-bar{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--hairline);background:var(--panel-2)}
.pt-ok{color:#34D399;font-size:13px;font-weight:600}
.pt-dim{color:var(--faint);font-size:12px}
.pt-json{margin:0;padding:16px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12.5px;line-height:1.6;color:#a7f3d0;overflow:auto;max-height:520px;white-space:pre-wrap;word-break:break-word}
.pt-meta{display:flex;gap:16px;flex-wrap:wrap;padding:10px 14px;border-bottom:1px solid var(--hairline);background:var(--panel-2);font-size:12.5px;color:var(--muted)}
.pt-meta b{color:var(--fg)}
.pt-note{margin-top:18px;font-size:12.5px;color:var(--faint);line-height:1.6;text-align:center;max-width:680px;margin-left:auto;margin-right:auto}
.pt-color{width:44px;height:38px;padding:2px;background:var(--panel-2);border:1px solid var(--hairline-2);border-radius:9px;cursor:pointer}
.pt-qr-wrap{display:grid;grid-template-columns:1fr 340px;gap:24px;align-items:start}
@media(max-width:760px){.pt-qr-wrap{grid-template-columns:1fr}}
.pt-qr-preview{border:1px solid var(--hairline-2);border-radius:14px;background:var(--panel);padding:20px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;position:sticky;top:80px}
.pt-qr-img{width:260px;height:260px}
.pt-qr-img svg{width:100%;height:100%;display:block;border-radius:8px}
.pt-qr-meta{margin-top:12px;font-size:12.5px;color:var(--muted);font-family:ui-monospace,Menlo,monospace}
.pt-qr-placeholder{color:var(--faint);font-size:13px}
`;
