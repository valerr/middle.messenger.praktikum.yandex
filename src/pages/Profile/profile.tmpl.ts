export default `<div id="profile">
        <div class="controls">
             {{{ chatsButton }}}
        </div>
        <div class="profile-content">
<!--            <div class="profile-image m-auto"></div>-->
            {{{ avatar }}}
            <h2 class="fw-bold m-auto text-center">{{ name }}</h2>
            <div class="profile-editable">
                <div class="profile-info">
                    {{#each fields}}
                        {{{this}}}
                    {{/each}}
                </div>
                <div class="actions">
                    {{{ ChangeProfileButton }}}
                    {{{ changePassword }}}
                    {{{ logOutButton }}}
                </div>
            </div>
            
        </div>
    </div>`
