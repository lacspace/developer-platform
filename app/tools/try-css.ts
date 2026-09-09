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
/* studio (logo + background) */
.st-controls{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
@media(max-width:640px){.st-controls{grid-template-columns:1fr}}
.st-field{display:flex;flex-direction:column;gap:6px}
.st-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.st-chip{border:1px solid var(--hairline-2);background:var(--panel);color:var(--muted);border-radius:999px;padding:6px 12px;font-size:12.5px;cursor:pointer;transition:all .15s}
.st-chip:hover{border-color:var(--accent);color:var(--text)}
.st-stage{display:grid;grid-template-columns:1fr 300px;gap:20px;align-items:center;margin-top:18px;border:1px solid var(--hairline-2);border-radius:16px;background:var(--panel);padding:22px}
@media(max-width:760px){.st-stage{grid-template-columns:1fr}}
.st-stage-art{display:flex;align-items:center;justify-content:center;min-height:220px;background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.03),transparent);border-radius:12px;padding:16px}
.st-stage-art svg{max-width:100%;max-height:230px;height:auto}
.st-badges{display:flex;flex-wrap:wrap;gap:8px}
.st-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px;margin-top:14px}
.st-cell{border:1px solid var(--hairline-2);background:var(--panel);border-radius:12px;padding:12px;cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center;min-height:96px}
.st-cell:hover{border-color:var(--accent)}
.st-cell.on{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent)}
.st-cell svg{max-width:100%;max-height:78px;height:auto}
.st-canvas-wrap{border:1px solid var(--hairline-2);border-radius:14px;background:var(--panel);padding:16px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.st-canvas{max-width:100%;height:auto;border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,.35)}
.st-kit{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,190px),1fr));gap:14px;margin-top:14px}
.st-kit-cell{margin:0;border:1px solid var(--hairline-2);border-radius:12px;overflow:hidden;background:var(--panel)}
.st-kit-art{display:flex;align-items:center;justify-content:center;gap:10px;min-height:120px;padding:16px;background:radial-gradient(circle at 50% 40%,rgba(255,255,255,.03),transparent)}
.st-kit-art svg{max-width:100%;max-height:96px;height:auto}
.st-fav{gap:14px}
.st-kit-cell figcaption{display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-top:1px solid var(--hairline);font-size:12.5px;color:var(--muted)}
.st-kit-dl{display:flex;gap:6px}
.st-kit-dl button{font-size:11px;font-family:ui-monospace,Menlo,monospace;color:var(--accent);background:none;border:1px solid var(--hairline-2);border-radius:6px;padding:2px 8px;cursor:pointer}
.st-kit-dl button:hover{border-color:var(--accent)}
.st-swatches{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,120px),1fr));gap:10px;margin-top:16px}
.st-swatch{display:flex;flex-direction:column;gap:4px;border:1px solid var(--hairline-2);border-radius:10px;padding:8px;background:var(--panel)}
.st-swatch>span{height:40px;border-radius:6px;border:1px solid var(--hairline)}
.st-swatch b{font-size:11px;color:var(--muted);text-transform:capitalize}
.st-swatch code{font-size:11px;color:var(--faint);font-family:ui-monospace,Menlo,monospace}
.st-copy{margin-top:16px;border:1px solid var(--hairline-2);border-radius:12px;overflow:hidden}
.st-copy pre{margin:0;padding:14px;font-size:12.5px;color:#a7f3d0;overflow-x:auto}

/* ---- Brand Center (@lacspace/brand) ---- */
.bc{border:1px solid var(--hairline-2);border-radius:16px;background:var(--panel);overflow:hidden}
.bc-tabs{display:flex;flex-wrap:wrap;gap:2px;padding:8px;border-bottom:1px solid var(--hairline);background:var(--panel-2)}
.bc-tab{flex:1;min-width:110px;background:none;border:0;border-radius:10px;color:var(--muted);padding:10px 14px;font-size:13.5px;font-family:inherit;cursor:pointer;transition:.15s;white-space:nowrap}
.bc-tab:hover{color:var(--fg);background:var(--panel-hover)}
.bc-tab.on{color:#0a0e17;background:var(--accent);font-weight:650}
.bc-grid{display:grid;grid-template-columns:minmax(min(100%,300px),1fr) 1.1fr;gap:20px;padding:20px}
@media(max-width:760px){.bc-grid{grid-template-columns:1fr;padding:14px;gap:16px}}
.bc-preview{display:flex;flex-direction:column;gap:14px;position:sticky;top:78px;align-self:start}
@media(max-width:760px){.bc-preview{position:static}}
.bc-stage{border:1px solid var(--hairline-2);border-radius:14px;min-height:300px;display:flex;align-items:center;justify-content:center;padding:26px;overflow:hidden}
.bc-stage svg{width:100%;max-width:300px;height:auto;display:block}
.bc-checker{background-image:linear-gradient(45deg,#1a2130 25%,transparent 25%),linear-gradient(-45deg,#1a2130 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#1a2130 75%),linear-gradient(-45deg,transparent 75%,#1a2130 75%);background-size:18px 18px;background-position:0 0,0 9px,9px -9px,-9px 0;background-color:#11151f}
.bc-actions{display:flex;flex-wrap:wrap;gap:8px}
.bc-btn{border-radius:10px;padding:9px 15px;font-size:13px;font-family:inherit;font-weight:600;cursor:pointer;border:1px solid var(--hairline-2);transition:.15s}
.bc-btn-primary{background:var(--accent);color:#0a0e17;border-color:transparent}
.bc-btn-primary:hover{filter:brightness(1.08)}
.bc-btn-ghost{background:var(--panel-2);color:var(--muted)}
.bc-btn-ghost:hover{color:var(--fg);border-color:var(--accent)}
.bc-panel{min-width:0}
.bc-chips{display:flex;flex-wrap:wrap;gap:7px}
.bc-chip{background:var(--panel-2);border:1px solid var(--hairline-2);border-radius:999px;color:var(--muted);padding:6px 13px;font-size:12.5px;font-family:inherit;cursor:pointer;text-transform:capitalize;transition:.15s}
.bc-chip:hover{color:var(--fg);border-color:var(--accent)}
.bc-chip.on{color:#0a0e17;background:var(--accent);border-color:transparent;font-weight:650}
.bc-check{display:flex;align-items:center;gap:9px;margin-top:14px;font-size:13.5px;color:var(--muted);cursor:pointer}
.bc-check input{accent-color:var(--accent);width:16px;height:16px}
.bc-hint{margin-top:16px;font-size:12.5px;color:var(--faint);line-height:1.6}
.bc-hint code{font-family:ui-monospace,Menlo,monospace;font-size:.92em;color:var(--muted)}
.bc-code{margin-top:14px;background:#0A0E18;border:1px solid var(--hairline);border-radius:10px;padding:11px 13px;overflow-x:auto}
.bc-code code{font-family:ui-monospace,Menlo,monospace;font-size:12.5px;color:#a7f3d0;white-space:nowrap}
.bc-block{margin-top:14px;border:1px solid var(--hairline-2);border-radius:11px;overflow:hidden}
.bc-block-bar{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 12px;background:var(--panel-2);border-bottom:1px solid var(--hairline);font-size:12px;color:var(--faint);font-family:ui-monospace,Menlo,monospace}
.bc-pre{margin:0;padding:13px;background:#0A0E18;font-family:ui-monospace,Menlo,monospace;font-size:12px;line-height:1.6;color:#cbd5e1;overflow-x:auto;max-height:240px;white-space:pre;word-break:normal}
.bc-swatches{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,150px),1fr));gap:12px;padding:20px}
.bc-swatch{display:flex;flex-direction:column;gap:5px;border:1px solid var(--hairline-2);border-radius:12px;padding:10px;background:var(--panel-2);cursor:pointer;text-align:left;transition:.15s}
.bc-swatch:hover{border-color:var(--accent)}
.bc-swatch-chip{height:48px;border-radius:8px;border:1px solid var(--hairline)}
.bc-swatch-name{font-size:12.5px;color:var(--fg);font-weight:600}
.bc-swatch-hex{font-size:11.5px;color:var(--muted);font-family:ui-monospace,Menlo,monospace}
.bc-swatch-role{font-size:11px;color:var(--faint)}
`;
