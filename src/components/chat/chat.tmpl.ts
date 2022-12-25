export default `<div class="chat-content">
            <div class=" header fw-bold">
                <div class="chat-title">{{title}}</div>
                {{{ membersButton }}}
            </div>
            <div class="messages">
                    {{#each messages}}
                        <div class="message">{{this}}</div>
                    {{/each}}
            </div>
             <div class="message-input mt-auto">
                {{{ input }}}
                {{{ sendButton }}}
            </div>
        </div>
        {{{ members }}}`
