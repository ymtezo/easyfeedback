/*!
 * EasyFeedback Widget — embeddable feedback collector
 * Usage:
 *   <script src="https://<host>/widget/easyfeedback.js"></script>
 *   <easyfeedback-widget api-url="https://<host>" api-key="ef_..." type="nps"></easyfeedback-widget>
 *
 * Attributes: api-url (required), api-key (required), type (nps|csat|ces|custom, default nps),
 *             title, respondent-id, anonymous, comment-label, lang (en|ja, default en)
 */
(() => {
  const SCALES = { nps: [0, 10], csat: [1, 5], ces: [1, 7] }
  const I18N = {
    en: { title: "How likely are you to recommend us?", comment: "Tell us more (optional)", send: "Send feedback", thanks: "Thanks for your feedback!", error: "Something went wrong. Please try again." },
    ja: { title: "このサービスを他の人に勧めますか？", comment: "よければ詳しく教えてください（任意）", send: "フィードバックを送る", thanks: "フィードバックありがとうございます！", error: "送信に失敗しました。もう一度お試しください。" },
  }
  const CSS = `
    :host { all: initial; font-family: system-ui, -apple-system, sans-serif; }
    .efw { box-sizing: border-box; max-width: 420px; padding: 16px; border: 1px solid #e2e2e2;
           border-radius: 12px; background: #fff; color: #222; font-size: 14px; }
    .efw h3 { margin: 0 0 10px; font-size: 15px; font-weight: 600; }
    .efw .row { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px; }
    .efw button.score { flex: 1; min-width: 30px; padding: 8px 0; border: 1px solid #d4d4d4;
           border-radius: 6px; background: #fafafa; cursor: pointer; font-size: 13px; }
    .efw button.score:hover { background: #eee; }
    .efw button.score.on { background: #111; color: #fff; border-color: #111; }
    .efw textarea { width: 100%; box-sizing: border-box; min-height: 60px; padding: 8px;
           border: 1px solid #d4d4d4; border-radius: 6px; font: inherit; resize: vertical; margin-bottom: 10px; }
    .efw button.send { width: 100%; padding: 10px; border: 0; border-radius: 8px;
           background: #111; color: #fff; font-weight: 600; cursor: pointer; }
    .efw button.send:disabled { opacity: .5; cursor: default; }
    .efw .msg { padding: 12px; text-align: center; }
  `

  class EasyFeedbackWidget extends HTMLElement {
    connectedCallback() {
      const lang = I18N[this.getAttribute("lang")] || I18N.en
      const type = this.getAttribute("type") || "nps"
      const title = this.getAttribute("title") || lang.title
      this._state = { score: null, type }

      const root = this.attachShadow({ mode: "open" })
      root.innerHTML = `<style>${CSS}</style>
        <div class="efw">
          <h3>${title}</h3>
          <div class="row"></div>
          <textarea placeholder="${lang.comment}"></textarea>
          <button class="send">${lang.send}</button>
        </div>`

      const row = root.querySelector(".row")
      const range = SCALES[type]
      if (range) {
        for (let i = range[0]; i <= range[1]; i++) {
          const b = document.createElement("button")
          b.className = "score"; b.textContent = i
          b.onclick = () => {
            this._state.score = i
            row.querySelectorAll("button").forEach((x) => x.classList.remove("on"))
            b.classList.add("on")
          }
          row.appendChild(b)
        }
      } else {
        row.style.display = "none"
      }

      root.querySelector(".send").onclick = async () => {
        const body = {
          type,
          score: this._state.score,
          comment: root.querySelector("textarea").value || undefined,
          respondent_id: this.getAttribute("respondent-id") || undefined,
          is_anonymous: this.hasAttribute("anonymous"),
          metadata: { feedback: { widget: true, url: location.href } },
        }
        try {
          const res = await fetch(`${this.getAttribute("api-url")}/api/v1/feedback`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.getAttribute("api-key")}`,
            },
            body: JSON.stringify(body),
          })
          if (!res.ok) throw new Error(await res.text())
          root.querySelector(".efw").innerHTML = `<div class="msg">${lang.thanks}</div>`
          this.dispatchEvent(new CustomEvent("ef:submitted", { detail: body }))
        } catch (e) {
          root.querySelector(".send").textContent = lang.error
          this.dispatchEvent(new CustomEvent("ef:error", { detail: e }))
        }
      }
    }
  }

  if (!customElements.get("easyfeedback-widget")) {
    customElements.define("easyfeedback-widget", EasyFeedbackWidget)
  }
})()
