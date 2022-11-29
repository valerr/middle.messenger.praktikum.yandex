export default `<div class="chat-content">
            <div class="header fw-bold">
                {{user.name}}
            </div>
            <div class="messages">
                    {{#each messages}}
                        <div class="message">{{this}}</div>
                    {{/each}}
            </div>
             <div class="message-input mt-auto">
                <input name="message">
                <button></button>
            </div>
        </div>`