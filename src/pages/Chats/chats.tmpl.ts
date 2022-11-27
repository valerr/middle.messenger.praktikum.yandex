export default `<div id="chats">
        <div class="chats-list">
            {{{ ProfileButton }}}
            <div class="search">Search</div>
            {{#each ChatItems}}
                {{{this}}}
            {{/each}}

        </div>
        {{{ chat }}}
    </div>`