import { memberMessaging } from '../../../../../data'
import { AttachIcon, ComposeIcon } from '../../../../../icons'
import { MemberBlob } from '../Members'
import type { MemberView } from './view'

export default function Messages({ v }: { v: MemberView }) {
  const thread = v.detail?.messages ?? []

  return (
    <div className="c-thread">
      <header className="c-thread-head">
        <h2>{v.name}</h2>
        <p className="c-subtle">{v.role} at {v.company}</p>
      </header>

      <div className={`c-thread-body${thread.length ? ' filled' : ''}`}>
        {thread.length ? (
          thread.map((m) => (
            <article className="c-msg" key={m.at}>
              <p className="c-msg-at">{m.at}</p>

              <div className="c-msg-row">
                <MemberBlob colors={v.avatar} size={38} />
                <div className="c-msg-main">
                  <p className="c-msg-who">{v.name}</p>
                  <div className="c-bubble">
                    {/* Blocks are plain paragraphs — the reference renders section
                        headings at body weight, so nothing is emphasised here. A
                        block may hold several bullet lines, split on newline. */}
                    {m.body.map((block, i) => (
                      <p key={i}>
                        {block.split('\n').map((line, j) => (
                          <span key={j}>{line}</span>
                        ))}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="c-empty">
            <p className="c-empty-title">{memberMessaging.emptyTitle}</p>
            <p className="c-empty-body narrow">
              Kick off the conversation by sending {v.firstName} a message.
            </p>
          </div>
        )}
      </div>

      <footer className="c-composer">
        <textarea placeholder={`Message ${v.name}`} rows={3} />
        <p className="c-composer-hint">{memberMessaging.sendHint}</p>
        <div className="c-composer-row">
          <AttachIcon />
          <span className="c-subtle">{memberMessaging.fileHint}</span>
          <ComposeIcon />
          <span className="spacer" />
          <button className="c-btn">Send</button>
        </div>
      </footer>
    </div>
  )
}
