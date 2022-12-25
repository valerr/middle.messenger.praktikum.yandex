export default `<div id="chats">
        <div class="chats-list">
            {{{ ProfileButton }}}
            <div class="add-chat">
                {{{ addChatButton }}}
                {{{ addChatModal }}}
            </div>
            
<!--            <div class="search">Search</div>-->
            {{#each ChatItems}}
                {{{this}}}
            {{/each}}

        </div>
        {{{ chat }}}
    </div>`
