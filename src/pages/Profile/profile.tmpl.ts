export default `<div id="profile">
        <div class="controls">
             {{{ chatsButton }}}
        </div>
        <div class="profile-content">
            <div class="profile-image m-auto"></div>
            <h2 class="fw-bold m-auto text-center">{{ name }}</h2>
            <div class="profile-info">
                {{#each info}}
                    <div class="info-item">
                        <span class="fw-bold">{{this.key}}</span>
                        <span class="text-muted">{{this.value}}</span>
                    </div>
                {{/each}}
            </div>
            <div class="actions">
                <button>Edit profile</button>
                <button>Change password</button>
                {{{ logOutButton }}}
            </div>
        </div>
    </div>`