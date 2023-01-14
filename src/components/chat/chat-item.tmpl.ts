export default `<div class="chat-item">
                    <div class="chat-item-text">
                        <span class="fw-bold">{{this.name}}</span>
                        {{{ remove }}}
                        <div class="text-overflow text-muted">{{this.message}}</div>
                    </div>
                </div>`
